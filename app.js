import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const SYSTEMS = window.CONTENT;
const COUNTS = { esqueletico: 199, muscular: 200, nervoso: 79, sentidos: 20, cardiovascular: 452, respiratorio: 63, digestorio: 93, urinario: 17, reprodutor: 53, endocrino: 52, linfatico: 14, tegumentar: 5 };
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------- cores das estruturas ---------- */
const CAT_COLOR = {
  bone: '#e6dabd', cartilage: '#b7d0d4', ligament: '#cdd5d2', muscle: '#b4473d', artery: '#d43a35', vein: '#3f6fd3',
  nerve: '#f0c443', lymph: '#7cc59a', valve: '#f1e4c4',
  cardiac: '#b23a3a', digestive: '#d69a72', respiratory: '#e6a2ad', urinary: '#b65c48', reproductive: '#d48fb6',
  pregnancy: '#c46d7c', endocrine: '#9a86e0', lymphatic: '#7cc59a', integumentary: '#dfb193', sensory: '#e8e3da',
  nervous: '#e6bba7', skeletal: '#e6dabd', muscular: '#b4473d', connective: '#cdd5d2'
};
const NAME_COLOR = [
  [/^(Ventrículo lateral|Terceiro ventrículo|Quarto ventrículo|Aqueduto|Forame interventricular|Canal central)/, '#7fb7d9'], [/^Segmento hepático/, '#8f3c2f'],
  [/^Íris/, '#5b84a6'], [/^Córnea|Câmara anterior/, '#cfe9f2'], [/^Lente/, '#f4eed4'], [/^Retina/, '#d0694d'], [/^Corpo vítreo/, '#d8ecf1'],
  [/^Corioide/, '#7c3b33'], [/^(Cabelo|Supercílio|Pelos)/, '#3d2c22'], [/^Lábio/, '#c8786e'], [/^Fígado|fígado|Lobo caudado|Lobo quadrado|Área nua|Porta do fígado/, '#8f3c2f'],
  [/baço|Baço|esplênico/, '#7c2f4b'], [/^Vesícula/, '#5f9c4e'], [/pâncreas|Pâncreas|pancreático$|Processo uncinado/, '#e2bf88'],
  [/^(Rim|Córtex renal|Coluna renal|Cápsula renal)/, '#9b4236'], [/^Pirâmide renal|^Papila renal/, '#c76e5a'], [/^Pulmão/, '#e8a1a6'], [/^Gengiva/, '#d98892'],
  [/^Língua/, '#cf6f6f'], [/dente permanente/, '#f3efe2'], [/^Estômago/, '#d8877a'], [/^Tecido adiposo da mama/, '#efd283'], [/^Placenta/, '#a8455a'],
  [/^Lobo mamário/, '#e8b3a4'], [/^Glândula (pineal)|^Hipófise/, '#9a86e0'], [/^Glândula suprarrenal/, '#c79a3a'], [/timo/, '#c9b0d8'], [/^Pele$/, '#dfb193'],
  [/^Ovário/, '#e9c7b8'], [/Bexiga|^Fundo da bexiga|Trígono|Colo da bexiga/, '#d7a35a'], [/^Ureter|^Uretra|Óstio do ureter|Pelve renal|Cálice/, '#e0c35b'],
  [/^Próstata/, '#c9876e'], [/^Testículo/, '#e3c2b4']
];
const CAT_LABEL = {
  bone: 'Osso', cartilage: 'Cartilagem', ligament: 'Ligamento / tendão', muscle: 'Músculo', artery: 'Artéria', vein: 'Veia', nerve: 'Nervo',
  lymph: 'Linfático', valve: 'Valva cardíaca', duct: 'Ducto', cardiac: 'Coração', digestive: 'Digestório', respiratory: 'Respiratório',
  urinary: 'Urinário', reproductive: 'Reprodutor', pregnancy: 'Gestação', endocrine: 'Endócrino', lymphatic: 'Linfático',
  integumentary: 'Tegumentar', sensory: 'Órgão dos sentidos', nervous: 'Sistema nervoso'
};
function partColor(p, group) {
  for (const [re, hex] of NAME_COLOR) if (re.test(p.pt)) return hex;
  if (p.c === 'duct') return group.includes('digestive') ? '#6fae5b' : group.includes('reproductive') ? '#d48fb6' : '#e0c35b';
  return CAT_COLOR[p.c] || '#c9cfcd';
}
function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0) / 4294967295; }

/* ---------- carregamento dos modelos ---------- */
let pakoReady = null;
function loadPako() {
  if (!pakoReady) pakoReady = new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pako/2.1.0/pako_inflate.min.js';
    s.onload = () => res(window.pako); s.onerror = () => rej(new Error('Não foi possível descompactar o modelo.'));
    document.head.appendChild(s);
  });
  return pakoReady;
}
async function fetchGroup(name, onBytes) {
  const meta = await (await fetch(`models/${name}.json`)).json();
  const res = await fetch(`models/${name}.wasm`);
  if (!res.ok) throw new Error('Arquivo do modelo indisponível.');
  let buf;
  if (typeof DecompressionStream !== 'undefined') {
    const reader = res.body.pipeThrough(new DecompressionStream('gzip')).getReader();
    const out = new Uint8Array(meta.bytes); let off = 0;
    for (;;) { const { done, value } = await reader.read(); if (done) break; out.set(value, off); off += value.length; onBytes(value.length); }
    buf = out.buffer;
  } else {
    const pako = await loadPako();
    const raw = new Uint8Array(await res.arrayBuffer());
    const out = pako.ungzip(raw); onBytes(out.length); buf = out.buffer.slice(out.byteOffset, out.byteOffset + out.byteLength);
  }
  return { meta, buf };
}
function buildGeometry(name, meta, buf) {
  const V = meta.vertices, I = meta.indices;
  const pos = new Int16Array(buf, 0, V * 3);
  const nor = new Int8Array(buf, V * 6, V * 3);
  const idx16 = new Uint16Array(buf, meta.indexOffset, I);
  const idx = new Uint32Array(I);
  const col = new Uint8Array(V * 3);
  const base = new Uint8Array(V * 3);
  const c = new THREE.Color();
  meta.parts.forEach((p, k) => {
    p.k = k;
    const [v0, vc] = p.v, [i0, ic] = p.i;
    for (let j = i0; j < i0 + ic; j++) idx[j] = idx16[j] + v0;
    c.set(partColor(p, name));
    const hsl = {}; c.getHSL(hsl); c.setHSL(hsl.h, hsl.s, Math.min(1, Math.max(0, hsl.l + (hash(p.id) - 0.5) * 0.08)));
    const r = Math.round(c.r * 255), g = Math.round(c.g * 255), b = Math.round(c.b * 255);
    p.rgb = [r, g, b]; p.css = '#' + c.getHexString();
    for (let v = v0; v < v0 + vc; v++) { base[v * 3] = r; base[v * 3 + 1] = g; base[v * 3 + 2] = b; }
  });
  col.set(base);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('normal', new THREE.BufferAttribute(nor, 3, true));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3, true));
  geo.setIndex(new THREE.BufferAttribute(idx, 1));
  geo.computeBoundingSphere(); geo.computeBoundingBox();
  const s = meta.scale, m = meta.min;
  const matrix = new THREE.Matrix4().compose(
    new THREE.Vector3(m[0] + 32768 * s[0], m[1] + 32768 * s[1], m[2] + 32768 * s[2]),
    new THREE.Quaternion(), new THREE.Vector3(s[0], s[1], s[2]));
  return { name, meta, geo, base, matrix, parts: meta.parts, istarts: meta.parts.map((p) => p.i[0]) };
}

/* ---------- visualizador ---------- */
class Viewer {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 700 ? 1.6 : 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.canvas = this.renderer.domElement;
    this.canvas.setAttribute('aria-label', 'Modelo anatômico 3D. Arraste para girar, use pinça ou roda para aproximar e toque em uma estrutura para identificá-la.');
    this.canvas.setAttribute('role', 'img');
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(32, 1, 0.01, 50);
    this.scene.add(this.camera);
    this.scene.add(new THREE.HemisphereLight(0xf4f8f6, 0x2a3431, 1.25));
    const key = new THREE.DirectionalLight(0xffffff, 1.9); key.position.set(0.6, 0.8, 1); this.camera.add(key);
    const rim = new THREE.DirectionalLight(0xbfe6ff, 0.6); rim.position.set(-1, 0.3, -1); this.camera.add(rim);
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = !reduceMotion; this.controls.dampingFactor = 0.09;
    this.controls.rotateSpeed = 0.75; this.controls.zoomSpeed = 0.9; this.controls.screenSpacePanning = true;
    this.controls.addEventListener('change', () => (this.dirty = true));
    this.controls.addEventListener('start', () => { this.autoRotate = false; });
    this.mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.62, metalness: 0.02 });
    this.ghostMats = {
      skin: new THREE.MeshStandardMaterial({ color: 0xbcd3cd, transparent: true, opacity: 0.13, depthWrite: false, roughness: 0.9 }),
      other: new THREE.MeshStandardMaterial({ color: 0xd9e3df, transparent: true, opacity: 0.2, depthWrite: false, roughness: 0.9 }),
      faded: new THREE.MeshStandardMaterial({ color: 0xa9bdb8, transparent: true, opacity: 0.07, depthWrite: false, roughness: 0.9 })
    };
    this.xrayMat = new THREE.MeshBasicMaterial({ color: 0xffb020, transparent: true, opacity: 0.28, depthTest: false, depthWrite: false });
    this.xray = [];
    this.cache = new Map(); this.loading = new Map();
    this.main = []; this.ghosts = []; this.iso = [];
    this.selected = new Map(); this.isolated = false;
    this.dirty = true; this.anim = null; this.autoRotate = false; this.token = 0;
    this.raycaster = new THREE.Raycaster();
    this.listeners = {};
    this._bindPointer();
    this.ro = new ResizeObserver(() => this.resize());
    const loop = (t) => {
      requestAnimationFrame(loop);
      if (!this.host || document.hidden) return;
      if (this.anim) this._step(t);
      if (this.autoRotate && !reduceMotion) { this._spin(0.0022); }
      if (this.controls.update()) this.dirty = true;
      if (this.dirty) { this.renderer.render(this.scene, this.camera); this.dirty = false; }
    };
    requestAnimationFrame(loop);
  }
  on(ev, fn) { this.listeners[ev] = fn; }
  emit(ev, data) { this.listeners[ev] && this.listeners[ev](data); }
  mount(host) {
    if (this.host) this.ro.unobserve(this.host);
    this.host = host; host.prepend(this.canvas); this.ro.observe(host); this.resize();
  }
  resize() {
    if (!this.host) return;
    const w = this.host.clientWidth, h = this.host.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false); this.camera.aspect = w / h; this.camera.updateProjectionMatrix(); this.dirty = true;
  }
  _spin(a) {
    const t = this.controls.target, p = this.camera.position;
    const x = p.x - t.x, z = p.z - t.z, c = Math.cos(a), s = Math.sin(a);
    p.x = t.x + x * c - z * s; p.z = t.z + x * s + z * c; this.camera.lookAt(t); this.dirty = true;
  }
  async group(name, onBytes) {
    if (this.cache.has(name)) return this.cache.get(name);
    if (!this.loading.has(name)) this.loading.set(name, fetchGroup(name, onBytes).then(({ meta, buf }) => {
      const g = buildGeometry(name, meta, buf); this.cache.set(name, g); return g;
    }).finally(() => this.loading.delete(name)));
    return this.loading.get(name);
  }
  async show(groups, context, onProgress) {
    const tok = ++this.token;
    const names = [...groups, ...context];
    let done = 0;
    const metaSizes = {};
    await Promise.all(names.map(async (n) => {
      if (this.cache.has(n)) return;
      const r = await fetch(`models/${n}.json`); metaSizes[n] = (await r.json()).bytes;
    }));
    const total = Object.values(metaSizes).reduce((a, b) => a + b, 0);
    if (total) onProgress && onProgress(0, total);
    const loaded = await Promise.all(names.map((n) => this.group(n, (b) => { done += b; onProgress && onProgress(done, total); })));
    if (tok !== this.token) return false;
    this._clear();
    loaded.forEach((g, i) => {
      if (i < groups.length) {
        const m = new THREE.Mesh(g.geo, this.mat); m.matrixAutoUpdate = false; m.matrix.copy(g.matrix); m.userData.g = g;
        this.scene.add(m); this.main.push(m);
      } else {
        const ctxMat = /integumentary|skin/.test(g.name) ? this.ghostMats.skin : this.ghostMats.other;
        const m = new THREE.Mesh(g.geo, ctxMat); m.matrixAutoUpdate = false; m.matrix.copy(g.matrix); m.renderOrder = 2; m.visible = false; m.userData.g = g;
        this.scene.add(m); this.ghosts.push(m);
      }
    });
    this.scene.updateMatrixWorld(true);
    this.home = this._boxOf(this.main);
    this.frame(this.home, 'front', false, 1.12);
    this.dirty = true;
    return true;
  }
  _clear() {
    for (const m of [...this.main, ...this.ghosts, ...this.iso, ...this.xray]) this.scene.remove(m);
    for (const m of [...this.iso, ...this.xray]) m.geometry.dispose();
    this.xray = [];
    for (const [g] of this.selected) this._resetColors(g);
    this.main = []; this.ghosts = []; this.iso = []; this.selected = new Map(); this.isolated = false;
  }
  setContext(i, on) { if (this.ghosts[i]) { this.ghosts[i].visible = on; this.dirty = true; } }
  _boxOf(meshes) {
    const box = new THREE.Box3();
    for (const m of meshes) { const b = m.geometry.boundingBox.clone().applyMatrix4(m.matrixWorld); box.union(b); }
    return box;
  }
  _partBox(g, p) {
    if (!p.box) {
      const pos = g.geo.attributes.position.array, [v0, vc] = p.v;
      const mn = [Infinity, Infinity, Infinity], mx = [-Infinity, -Infinity, -Infinity];
      for (let v = v0; v < v0 + vc; v++) for (let a = 0; a < 3; a++) { const x = pos[v * 3 + a]; if (x < mn[a]) mn[a] = x; if (x > mx[a]) mx[a] = x; }
      p.box = new THREE.Box3(new THREE.Vector3(...mn), new THREE.Vector3(...mx)).applyMatrix4(g.matrix);
    }
    return p.box;
  }
  frame(box, view = null, animate = true, margin = 1.7) {
    if (box.isEmpty()) return;
    const center = box.getCenter(new THREE.Vector3()), size = box.getSize(new THREE.Vector3());
    const fov = THREE.MathUtils.degToRad(this.camera.fov);
    const fitH = size.y / (2 * Math.tan(fov / 2)), fitW = Math.max(size.x, size.z) / (2 * Math.tan(fov / 2) * this.camera.aspect);
    const dist = Math.max(Math.max(fitH, fitW) * margin + Math.max(size.z, size.x) * 0.5, 0.28);
    let dir;
    if (view === 'front') dir = new THREE.Vector3(0, 0.04, 1);
    else if (view === 'back') dir = new THREE.Vector3(0, 0.04, -1);
    else if (view === 'side') dir = new THREE.Vector3(1, 0.04, 0);
    else dir = this.camera.position.clone().sub(this.controls.target).normalize();
    dir.normalize();
    const pos = center.clone().add(dir.multiplyScalar(dist));
    this.controls.minDistance = Math.max(0.02, dist * 0.04); this.controls.maxDistance = Math.max(dist * 4, 3);
    if (!animate || reduceMotion) { this.controls.target.copy(center); this.camera.position.copy(pos); this.camera.lookAt(center); this.dirty = true; this.anim = null; return; }
    this.anim = { t0: performance.now(), d: 650, fromT: this.controls.target.clone(), toT: center, fromP: this.camera.position.clone(), toP: pos };
  }
  _step(t) {
    const a = this.anim, k = Math.min(1, (t - a.t0) / a.d), e = 1 - Math.pow(1 - k, 3);
    this.controls.target.lerpVectors(a.fromT, a.toT, e); this.camera.position.lerpVectors(a.fromP, a.toP, e);
    this.dirty = true; if (k >= 1) this.anim = null;
  }
  view(v) { const s = this.selection().length; this.frame(s ? this._selBox() : this.home, v, true, s ? 1.7 : 1.12); }
  reset() { this.frame(this.home, 'front', true, 1.12); }
  _resetColors(g) { g.geo.attributes.color.array.set(g.base); g.geo.attributes.color.needsUpdate = true; }
  _paint() {
    const any = [...this.selected.values()].some((s) => s.size);
    for (const m of this.main) {
      const g = m.userData.g, col = g.geo.attributes.color.array, base = g.base, sel = this.selected.get(g);
      if (!any) { col.set(base); }
      else {
        for (let i = 0; i < base.length; i += 3) {
          const l = (base[i] * 0.3 + base[i + 1] * 0.59 + base[i + 2] * 0.11);
          col[i] = base[i] * 0.35 + l * 0.25; col[i + 1] = base[i + 1] * 0.35 + l * 0.25; col[i + 2] = base[i + 2] * 0.35 + l * 0.25;
        }
        if (sel) for (const k of sel) { const p = g.parts[k]; const [v0, vc] = p.v; for (let v = v0; v < v0 + vc; v++) { col[v * 3] = 255; col[v * 3 + 1] = 176; col[v * 3 + 2] = 32; } }
      }
      g.geo.attributes.color.needsUpdate = true;
    }
    this.dirty = true;
  }
  select(list, { focus = true, additive = false } = {}) {
    if (!additive) this.selected = new Map();
    for (const { g, k } of list) { if (!this.selected.has(g)) this.selected.set(g, new Set()); this.selected.get(g).add(k); }
    if (this.isolated) this._buildIso();
    this._buildXray();
    this._paint();
    if (focus && list.length) this.frame(this._selBox());
    this.emit('select', this.selection());
  }
  clear() { this.selected = new Map(); if (this.isolated) this.isolate(false); this._buildXray(); this._paint(); this.emit('select', []); }
  _subMeshes(mat) {
    const out = [];
    for (const [g, set] of this.selected) {
      if (!set.size) continue;
      const ks = [...set].sort((a, b) => a - b); let n = 0; for (const k of ks) n += g.parts[k].i[1];
      const src = g.geo.index.array, idx = new Uint32Array(n); let o = 0; const map = [];
      for (const k of ks) { const [i0, ic] = g.parts[k].i; map.push([o, k]); idx.set(src.subarray(i0, i0 + ic), o); o += ic; }
      const geo = new THREE.BufferGeometry();
      for (const a of ['position', 'normal', 'color']) geo.setAttribute(a, g.geo.attributes[a]);
      geo.setIndex(new THREE.BufferAttribute(idx, 1)); geo.boundingSphere = g.geo.boundingSphere; geo.boundingBox = g.geo.boundingBox;
      const m = new THREE.Mesh(geo, mat); m.matrixAutoUpdate = false; m.matrix.copy(g.matrix); m.matrixWorld.copy(g.matrix);
      m.userData = { g, map }; this.scene.add(m); out.push(m);
    }
    return out;
  }
  _buildXray() {
    for (const m of this.xray) { this.scene.remove(m); m.geometry.dispose(); }
    this.xray = this.isolated ? [] : this._subMeshes(this.xrayMat);
    for (const m of this.xray) m.renderOrder = 10;
    this.dirty = true;
  }
  selection() { const out = []; for (const [g, s] of this.selected) for (const k of s) out.push({ g, k, p: g.parts[k] }); return out; }
  _selBox() { const box = new THREE.Box3(); for (const { g, p } of this.selection()) box.union(this._partBox(g, p)); return box; }
  isolate(on) {
    this.isolated = on;
    for (const m of this.iso) { this.scene.remove(m); m.geometry.dispose(); }
    this.iso = [];
    for (const m of this.main) m.material = on ? this.ghostMats.faded : this.mat;
    if (on) { this._buildIso(); this.frame(this._selBox()); }
    this._buildXray();
    this.dirty = true;
  }
  _buildIso() {
    for (const m of this.iso) { this.scene.remove(m); m.geometry.dispose(); }
    this.iso = this._subMeshes(this.mat);
  }
  pick(x, y) {
    const r = this.canvas.getBoundingClientRect();
    const v = new THREE.Vector2(((x - r.left) / r.width) * 2 - 1, -((y - r.top) / r.height) * 2 + 1);
    this.raycaster.setFromCamera(v, this.camera);
    const targets = this.isolated ? this.iso : this.main;
    const hits = this.raycaster.intersectObjects(targets, false);
    if (!hits.length) return null;
    const h = hits[0], m = h.object, g = m.userData.g, i = h.faceIndex * 3;
    if (m.userData.map) { let k = m.userData.map[0][1]; for (const [o, kk] of m.userData.map) { if (o <= i) k = kk; else break; } return { g, k }; }
    let lo = 0, hi = g.istarts.length - 1;
    while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (g.istarts[mid] <= i) lo = mid; else hi = mid - 1; }
    return { g, k: lo };
  }
  _bindPointer() {
    let down = null;
    this.canvas.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY, t: performance.now(), id: e.pointerId }; });
    this.canvas.addEventListener('pointerup', (e) => {
      if (!down || down.id !== e.pointerId) return;
      const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y), dt = performance.now() - down.t; down = null;
      if (moved > 7 || dt > 600) return;
      const hit = this.pick(e.clientX, e.clientY);
      if (!hit) { if (this.selected.size && !this.isolated) this.clear(); return; }
      const g = hit.g, p = g.parts[hit.k];
      const twins = g.parts.filter((q) => q.pt === p.pt).map((q) => ({ g, k: q.k }));
      const already = this.selected.get(g)?.has(hit.k) && this.selection().length === 1;
      this.select(e.shiftKey || already ? twins : [hit], { focus: false, additive: e.shiftKey });
    });
  }
  find(re) {
    const out = [];
    for (const m of this.main) { const g = m.userData.g; for (const p of g.parts) if (re.test(p.pt)) out.push({ g, k: p.k }); }
    return out;
  }
  catalog() {
    const map = new Map();
    for (const m of this.main) {
      const g = m.userData.g;
      for (const p of g.parts) {
        const key = p.pt; if (!map.has(key)) map.set(key, { pt: p.pt, en: new Set(), sides: new Set(), items: [], css: p.css, c: p.c });
        const e = map.get(key); e.en.add(p.en.replace(/^(Left|Right) /i, '').replace(/ of (left|right) /i, ' of ')); if (p.s) e.sides.add(p.s); e.items.push({ g, k: p.k });
      }
    }
    return [...map.values()].sort((a, b) => a.pt.localeCompare(b.pt, 'pt-BR', { numeric: true }));
  }
}

/* ---------- barras roláveis (roda do mouse, arrastar, toque) ---------- */
function updateFade(el) {
  const max = el.scrollWidth - el.clientWidth;
  el.classList.toggle('fade-l', el.scrollLeft > 2);
  el.classList.toggle('fade-r', max > 2 && el.scrollLeft < max - 2);
}
const hsObserver = new ResizeObserver((entries) => entries.forEach((e) => updateFade(e.target)));
function initHScroll() {
  document.querySelectorAll('.sysrail, .scene-tabs, .tabs, .hs').forEach((el) => {
    if (el._hs) { updateFade(el); return; }
    el._hs = true;
    el.addEventListener('wheel', (e) => {
      const max = el.scrollWidth - el.clientWidth; if (max <= 0) return;
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if ((d < 0 && el.scrollLeft <= 0) || (d > 0 && el.scrollLeft >= max - 1)) return;
      el.scrollLeft += d; e.preventDefault();
    }, { passive: false });
    let drag = null;
    el.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse' || e.button !== 0) return; drag = { x: e.clientX, left: el.scrollLeft, moved: false }; });
    addEventListener('pointermove', (e) => {
      if (!drag) return; const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 5) { drag.moved = true; el.classList.add('dragging'); }
      if (drag.moved) el.scrollLeft = drag.left - dx;
    });
    addEventListener('pointerup', () => { if (!drag) return; const m = drag.moved; drag = null; el.classList.remove('dragging'); if (m) { const stop = (ev) => { ev.stopPropagation(); ev.preventDefault(); }; el.addEventListener('click', stop, { capture: true, once: true }); setTimeout(() => el.removeEventListener('click', stop, { capture: true }), 50); } });
    el.addEventListener('scroll', () => updateFade(el), { passive: true });
    hsObserver.observe(el);
    updateFade(el);
  });
}
function centerIn(container, item) {
  if (!container || !item) return;
  const left = item.offsetLeft - (container.clientWidth - item.offsetWidth) / 2;
  container.scrollTo({ left, behavior: reduceMotion ? 'auto' : 'smooth' });
}

/* ---------- interface ---------- */
function toStage() {
  if (innerWidth >= 1024) return;
  const st = document.getElementById('stage'); if (!st) return;
  const top = st.getBoundingClientRect().top + scrollY - document.querySelector('.chrome').offsetHeight - 8;
  scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
}
const viewer = new Viewer();
const app = $('#app');
const state = { sys: null, scene: 0, tab: 'geral', ctx: {}, quiz: {}, filter: '' };

function rail(active) {
  $('#sysrail').innerHTML = SYSTEMS.map((s) => `<a href="#${s.id}" style="--c:${s.cor}" ${s.id === active ? 'aria-current="page"' : ''}><i></i>${esc(s.nome)}</a>`).join('');
  initHScroll(); const cur = $('#sysrail [aria-current]'); if (cur) centerIn($('#sysrail'), cur);
  requestAnimationFrame(() => { const h = $('.chrome').offsetHeight; document.documentElement.style.setProperty('--chrome-h', h + 'px'); });
}

function stageHTML(extra = '') {
  return `<div class="ui loader" data-loader><div class="loader-box"><div data-ltext>Carregando modelo 3D…</div><div class="bar"><i data-lbar></i></div></div></div>
  <div class="ui view-btns">
    <button class="icon-btn" data-view="front" title="Vista anterior" aria-label="Vista anterior">ANT</button>
    <button class="icon-btn" data-view="side" title="Vista lateral" aria-label="Vista lateral">LAT</button>
    <button class="icon-btn" data-view="back" title="Vista posterior" aria-label="Vista posterior">POST</button>
    <button class="icon-btn" data-reset title="Recentralizar" aria-label="Recentralizar o modelo"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg></button>
  </div>
  <div class="ui sel-card" data-sel hidden></div>
  ${extra}`;
}

function bindStage(stage) {
  stage.querySelectorAll('[data-view]').forEach((b) => b.addEventListener('click', () => viewer.view(b.dataset.view)));
  stage.querySelector('[data-reset]').addEventListener('click', () => { viewer.clear(); viewer.reset(); });
}

function progress(stage) {
  const l = stage.querySelector('[data-loader]'), t = stage.querySelector('[data-ltext]'), b = stage.querySelector('[data-lbar]');
  l.hidden = false; b.style.width = '0%'; t.textContent = 'Carregando modelo 3D…';
  return {
    on: (done, total) => { if (!total) return; b.style.width = Math.min(100, (done / total) * 100).toFixed(0) + '%'; t.textContent = `Carregando modelo 3D · ${(total / 1048576).toFixed(1)} MB`; },
    end: () => { l.hidden = true; },
    fail: (msg) => { l.innerHTML = `<div class="loader-box">${esc(msg)}<br><button class="chip" style="margin-top:12px" onclick="location.reload()">Tentar de novo</button></div>`; }
  };
}

function selCard(stage, sel) {
  const card = stage.querySelector('[data-sel]');
  if (!sel.length) { card.hidden = true; return; }
  const names = [...new Set(sel.map((s) => s.p.pt))];
  const sides = new Set(sel.map((s) => s.p.s).filter(Boolean));
  const ens = [...new Set(sel.map((s) => s.p.en.replace(/^(Left|Right) /i, '').replace(/ of (left|right) /i, ' of ')))];
  const sideTxt = sides.size === 2 ? 'lados direito e esquerdo' : sides.has('E') ? 'lado esquerdo' : sides.has('D') ? 'lado direito' : '';
  const cat = CAT_LABEL[sel[0].p.c] || 'Estrutura';
  const title = names.length > 3 ? `${names.length} estruturas` : names.join(' · ');
  card.hidden = false;
  card.innerHTML = `<div class="cat">${esc(cat)}${sideTxt ? ' · ' + sideTxt : ''}</div><h3>${esc(title)}</h3>
    <div class="en">${esc(ens.slice(0, 3).join(' · '))}${ens.length > 3 ? ' …' : ''}</div>
    <div class="row"><button class="primary" data-iso>${viewer.isolated ? 'Mostrar tudo' : 'Isolar'}</button>
    ${sel.length === 1 && sel[0].p.s ? '<button data-both>Ambos os lados</button>' : ''}<button data-close>Limpar</button></div>`;
  card.querySelector('[data-iso]').onclick = () => { viewer.isolate(!viewer.isolated); selCard(stage, viewer.selection()); };
  card.querySelector('[data-close]').onclick = () => viewer.clear();
  const both = card.querySelector('[data-both]');
  if (both) both.onclick = () => viewer.select(viewer.find(new RegExp('^' + names[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$')), { focus: true });
}

/* ---- início ---- */
function renderHome() {
  rail(null);
  state.sys = null;
  app.innerHTML = `
  <div class="wrap">
    <section class="hero">
      <div>
        <div class="eyebrow">Anatomia aplicada à enfermagem</div>
        <h1>O corpo em 3D, do jeito que <em>a enfermagem</em> precisa.</h1>
        <p class="lead">Gire, aproxime e toque em cada estrutura. Cada sistema liga a anatomia ao que você faz no plantão: pulsos, punções, sondagens, avaliação neurológica, injeções e prevenção de lesões.</p>
        <div class="facts"><span><b>2.580</b> estruturas 3D</span><span><b>12</b> sistemas</span><span><b>${TOTAL_Q}</b> perguntas de revisão</span><span>Celular, tablet e computador</span></div>
        <div class="cta"><a class="btn primary" href="#cardiovascular">Começar pelo coração</a><a class="btn" href="#sistemas-lista">Ver todos os sistemas</a></div>
      </div>
      <div class="stage home-stage" id="stage">${stageHTML('<div class="ui toolbar"><span class="hint">Arraste para girar · roda ou pinça para zoom · toque para identificar</span></div>')}</div>
    </section>
  </div>
  <section class="block" id="sistemas-lista"><div class="wrap">
    <div class="block-head"><h2>Sistemas do corpo</h2><p>Escolha um sistema para abrir o modelo 3D, o resumo de anatomia, os cuidados de enfermagem e o quiz.</p></div>
    <div class="cards">${SYSTEMS.map((s) => `<a class="card" href="#${s.id}" style="--c:${s.cor}"><span class="sw"></span><h3>${esc(s.nome)}</h3><p>${esc(s.curto)}</p><span class="meta">${COUNTS[s.id]} estruturas · ${poolFor([s.id]).length} perguntas</span></a>`).join('')}</div>
  </div></section>
  <section class="block"><div class="wrap">
    <a class="sim-banner" href="#simulado"><div><div class="eyebrow">Simulado</div><h2>Teste o que você aprendeu</h2><p>${TOTAL_Q} perguntas comentadas sobre os 12 sistemas, com ${TOTAL_VEST} no formato de Enem e vestibulares. Rodadas de 10 a 50 questões.</p></div><span class="btn primary">Fazer simulado</span></a>
  </div></section>
  <section class="block"><div class="wrap">
    <div class="block-head"><h2>Atalhos para a prática</h2><p>Abra direto a estrutura ligada ao procedimento.</p></div>
    <div class="shortcuts">
      ${[
        ['cardiovascular', 1, 'Artéria radial', 'Gasometria e pulso radial', 'Cardiovascular'],
        ['cardiovascular', 1, 'Veia intermédia do cotovelo', 'Coleta de sangue venoso', 'Cardiovascular'],
        ['muscular', 0, 'Glúteo médio', 'Injeção IM ventroglútea', 'Muscular'],
        ['muscular', 0, 'Deltoide', 'Injeção IM no deltoide', 'Muscular'],
        ['respiratorio', 0, 'Brônquio principal', 'Por que a aspiração vai para a direita', 'Respiratório'],
        ['digestorio', 1, 'Estômago', 'Sondagem nasogástrica', 'Digestório'],
        ['urinario', 1, 'Bexiga urinária', 'Cateterismo vesical', 'Urinário'],
        ['nervoso', 0, 'Bulbo', 'Centros vitais e Glasgow', 'Nervoso']
      ].map(([id, sc, key, label, sys]) => `<button class="shortcut" data-go="${id}" data-scene="${sc}" data-key="${esc(key)}"><span><b>${esc(label)}</b><small>${esc(sys)} · ${esc(key)}</small></span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>`).join('')}
    </div>
  </div></section>
  <section class="block"><div class="wrap">
    <div class="block-head"><h2>Como usar</h2></div>
    <div class="how">
      <div><b>Girar e aproximar</b><p>Arraste com um dedo ou o mouse. Use pinça, roda do mouse ou dois dedos para zoom e arraste com dois dedos para deslocar.</p></div>
      <div><b>Tocar para identificar</b><p>Toque numa estrutura para ver o nome em português e o termo original. Toque de novo para marcar os dois lados.</p></div>
      <div><b>Isolar e estudar</b><p>Use “Isolar” para ver só a estrutura escolhida. Os botões ANT, LAT e POST mudam a vista.</p></div>
    </div>
  </div></section>`;
  const stage = $('#stage');
  viewer.mount(stage); bindStage(stage);
  viewer.on('select', (sel) => selCard(stage, sel));
  const pr = progress(stage);
  viewer.show(['m-skeletal'], ['m-integumentary'], pr.on).then((ok) => {
    if (!ok) return; pr.end(); viewer.setContext(0, true); viewer.autoRotate = true;
  }).catch((e) => pr.fail(e.message || 'Não foi possível carregar o modelo.'));
  app.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => {
    state.pending = { scene: +b.dataset.scene, key: b.dataset.key, tab: 'enf' };
    location.hash = b.dataset.go;
  }));
}

/* ---- sistema ---- */
function renderSystem(sys) {
  rail(sys.id);
  const pending = state.pending; state.pending = null;
  if (state.sys !== sys.id) { state.sys = sys.id; state.scene = 0; state.tab = 'geral'; state.ctx = {}; state.filter = ''; }
  if (pending) { state.scene = pending.scene; state.tab = pending.tab || state.tab; }
  app.innerHTML = `<div class="wrap"><div class="sys">
    <div class="stage sys-stage" id="stage">${stageHTML(`
      ${sys.cenas.length > 1 ? `<div class="ui scene-tabs" role="group" aria-label="Modelos">${sys.cenas.map((c, i) => `<button data-scene="${i}" aria-pressed="${i === state.scene}">${esc(c.nome)}</button>`).join('')}</div>` : ''}
      <div class="ui toolbar" data-toolbar></div>`)}
    </div>
    <div class="panel">
      <div class="panel-head" style="--c:${sys.cor}"><div class="eyebrow"><i></i>Sistema ${esc(sys.nome.toLowerCase())}</div><h1>${esc(sys.titulo)}</h1><p>${esc(sys.curto)}</p></div>
      <div class="tabs" role="tablist">
        ${[['geral', 'Visão geral'], ['enf', 'Enfermagem'], ['est', 'Estruturas'], ['quiz', 'Quiz']].map(([k, l]) => `<button role="tab" data-tab="${k}" aria-selected="${state.tab === k}">${l}</button>`).join('')}
      </div>
      <div class="tabpanel" id="tabpanel"></div>
    </div>
  </div></div>`;
  const stage = $('#stage');
  viewer.mount(stage); bindStage(stage); viewer.autoRotate = false;
  viewer.on('select', (sel) => { selCard(stage, sel); markKeys(sel); markList(sel); });
  stage.querySelectorAll('[data-scene]').forEach((b) => b.addEventListener('click', () => loadScene(sys, +b.dataset.scene)));
  app.querySelectorAll('[data-tab]').forEach((b) => b.addEventListener('click', () => { state.tab = b.dataset.tab; app.querySelectorAll('[data-tab]').forEach((x) => x.setAttribute('aria-selected', x === b)); centerIn($('.tabs'), b); renderTab(sys); }));
  initHScroll(); centerIn($('.tabs'), $('.tabs [aria-selected="true"]'));
  renderTab(sys);
  loadScene(sys, state.scene, pending && pending.key);
}

function loadScene(sys, i, keyLabel) {
  state.scene = i;
  const stage = $('#stage'); const cena = sys.cenas[i];
  stage.querySelectorAll('[data-scene]').forEach((b) => b.setAttribute('aria-pressed', +b.dataset.scene === i));
  initHScroll(); centerIn(stage.querySelector('.scene-tabs'), stage.querySelector(`[data-scene="${i}"]`));
  const ctx = cena.contexto || [];
  const tb = stage.querySelector('[data-toolbar]');
  tb.innerHTML = ctx.map((c, j) => `<button class="chip" data-ctx="${j}" aria-pressed="${!!state.ctx[sys.id + i + j]}"><span class="dot"></span>${esc(c.nome)}</button>`).join('') + '<span class="hint">Arraste para girar · toque para identificar</span>';
  selCard(stage, []);
  const pr = progress(stage);
  viewer.show(cena.grupos, ctx.map((c) => c.grupo), pr.on).then((ok) => {
    if (!ok) return;
    pr.end();
    ctx.forEach((c, j) => viewer.setContext(j, !!state.ctx[sys.id + i + j]));
    tb.querySelectorAll('[data-ctx]').forEach((b) => b.addEventListener('click', () => {
      const j = +b.dataset.ctx, k = sys.id + i + j, on = !state.ctx[k]; state.ctx[k] = on; b.setAttribute('aria-pressed', on); viewer.setContext(j, on);
    }));
    if (state.tab === 'est') renderTab(sys);
    if (keyLabel) { const key = sys.chave.find((k) => k.t === keyLabel) || sys.chave.find((k) => k.t.startsWith(keyLabel)); if (key) selectKey(sys, key); }
  }).catch((e) => pr.fail(e.message || 'Não foi possível carregar o modelo.'));
}

function selectKey(sys, key) {
  const sc = key.c || 0;
  if (sc !== state.scene) { loadScene(sys, sc, key.t); return; }
  const list = viewer.find(new RegExp(key.q, 'i'));
  if (list.length) viewer.select(list);
  toStage();
}

function markKeys(sel) {
  const names = new Set(sel.map((s) => s.p.pt));
  const sys = SYSTEMS.find((s) => s.id === state.sys); if (!sys) return;
  app.querySelectorAll('.key').forEach((b) => {
    const k = sys.chave[+b.dataset.key]; const re = new RegExp(k.q, 'i');
    b.setAttribute('aria-pressed', names.size > 0 && (k.c || 0) === state.scene && [...names].some((n) => re.test(n)));
  });
}
function markList(sel) {
  const names = new Set(sel.map((s) => s.p.pt));
  app.querySelectorAll('.slist button').forEach((b) => b.setAttribute('aria-pressed', names.has(b.dataset.name)));
}

function renderTab(sys) {
  const el = $('#tabpanel'); const t = state.tab;
  if (t === 'geral') {
    el.innerHTML = `<p class="prose">${esc(sys.resumo)}</p>
      <div><h2>Estruturas-chave</h2><div class="keys">${sys.chave.map((k, i) => `<button class="key" data-key="${i}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>${esc(k.t)}${sys.cenas.length > 1 ? `<small>${esc(sys.cenas[k.c || 0].nome)}</small>` : ''}</button>`).join('')}</div>
      <p class="note" style="margin-top:10px">Toque em uma estrutura para localizá-la no modelo.</p></div>
      <div><h2>Funções</h2><ul class="ticks">${sys.funcoes.map((f) => `<li>${esc(f)}</li>`).join('')}</ul></div>`;
    el.querySelectorAll('.key').forEach((b) => b.addEventListener('click', () => selectKey(sys, sys.chave[+b.dataset.key])));
    markKeys(viewer.selection());
  } else if (t === 'enf') {
    el.innerHTML = `<div><h2>Avaliação</h2><ul class="ticks">${sys.avaliacao.map((f) => `<li>${esc(f)}</li>`).join('')}</ul></div>
      <div><h2>Cuidados e procedimentos</h2><ul class="ticks">${sys.cuidados.map((f) => `<li>${esc(f)}</li>`).join('')}</ul></div>
      <div><h2>Valores e referências</h2><table class="values"><tbody>${sys.valores.map((v) => `<tr><td>${esc(v.k)}</td><td>${esc(v.v)}</td></tr>`).join('')}</tbody></table>
      <p class="note" style="margin-top:8px">Valores de referência e volumes variam entre instituições e laboratórios. Siga sempre o protocolo do seu serviço.</p></div>
      <div class="alerts"><h2>Sinais de alerta</h2><ul class="ticks">${sys.alertas.map((f) => `<li>${esc(f)}</li>`).join('')}</ul></div>`;
  } else if (t === 'est') {
    const cat = viewer.catalog();
    el.innerHTML = `<div class="search"><input id="q" type="search" placeholder="Buscar estrutura (ex.: artéria, fêmur)" value="${esc(state.filter)}" autocomplete="off" aria-label="Buscar estrutura"><span class="count" id="qc"></span></div>
      <ul class="slist" id="slist"></ul><p class="note">Nomes em português com o termo original do atlas (inglês). ${esc(sys.cenas[state.scene].nome)}.</p>`;
    const list = $('#slist'), qc = $('#qc');
    const draw = () => {
      const q = state.filter.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
      const items = cat.filter((e) => !q || (e.pt + ' ' + [...e.en].join(' ')).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().includes(q));
      qc.textContent = cat.length ? `${items.length} de ${cat.length}` : 'carregando…';
      list.innerHTML = items.map((e, i) => `<li><button data-i="${cat.indexOf(e)}" data-name="${esc(e.pt)}"><span class="sw" style="background:${e.css}"></span><span class="nm">${esc(e.pt)}<small>${esc([...e.en][0])}</small></span><span class="sd">${e.sides.size === 2 ? 'E · D' : e.sides.has('E') ? 'E' : e.sides.has('D') ? 'D' : ''}</span></button></li>`).join('');
      list.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => { viewer.select(cat[+b.dataset.i].items); toStage(); }));
      markList(viewer.selection());
    };
    $('#q').addEventListener('input', (e) => { state.filter = e.target.value; draw(); });
    draw();
  } else if (t === 'quiz') {
    state.qtipo = state.qtipo || {};
    const tipo = state.qtipo[sys.id] || 'todas';
    el.innerHTML = `<div class="qz-filter"><div class="seg hs" role="group" aria-label="Tipo de questão">${TIPOS.map(([k, l]) => `<button data-tipo="${k}" aria-pressed="${k === tipo}">${l} <small>${poolFor([sys.id], k).length}</small></button>`).join('')}</div></div><div id="qzbox"></div>`;
    el.querySelectorAll('[data-tipo]').forEach((b) => b.onclick = () => { state.qtipo[sys.id] = b.dataset.tipo; renderTab(sys); });
    runQuiz($('#qzbox'), poolFor([sys.id], tipo), 'sys-' + sys.id + '-' + tipo, { size: 10 });
    initHScroll();
  }
}

/* ---- quiz ---- */
function poolFor(ids, tipo = 'todas') {
  const out = [];
  for (const s of SYSTEMS) {
    if (!ids.includes(s.id)) continue;
    if (tipo !== 'vest') {
      s.quiz.forEach((q) => out.push({ p: q.p, o: q.o, r: q.r, e: q.e, sys: s.id }));
      (window.QUIZ_EXTRA[s.id] || []).forEach(([p, o, r, e]) => out.push({ p, o, r, e, sys: s.id }));
      ((window.QUIZ_MORE || {})[s.id] || []).forEach(([p, o, r, e]) => out.push({ p, o, r, e, sys: s.id }));
    }
    if (tipo !== 'enf') ((window.QUIZ_VEST || {})[s.id] || []).forEach(([estilo, texto, p, o, r, e]) => out.push({ estilo, texto, p, o, r, e, sys: s.id }));
  }
  return out;
}
const ALL_IDS = SYSTEMS.map((s) => s.id);
const TOTAL_Q = poolFor(ALL_IDS).length;
const TOTAL_VEST = poolFor(ALL_IDS, 'vest').length;
const TIPOS = [['todas', 'Todas'], ['enf', 'Enfermagem'], ['vest', 'Vestibular']];
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function newRound(pool, n) {
  return { items: shuffle(pool).slice(0, Math.min(n, pool.length)).map((q) => ({ q, order: shuffle(q.o.map((_, j) => j)), a: null })), i: 0, done: false };
}
const LETTERS = 'ABCDE';
function runQuiz(el, pool, key, { size = 10, showSys = false } = {}) {
  state.runs = state.runs || {};
  let run = state.runs[key];
  if (!run || run.poolSize !== pool.length) { run = state.runs[key] = { ...newRound(pool, size), poolSize: pool.length, size }; }
  const sysName = (id) => SYSTEMS.find((s) => s.id === id);
  const draw = () => {
    const n = run.items.length, right = run.items.filter((it) => it.a === it.q.r).length;
    if (run.done) {
      const pct = Math.round((right / n) * 100);
      const wrong = run.items.filter((it) => it.a !== it.q.r);
      const msg = pct >= 90 ? 'Excelente!' : pct >= 70 ? 'Muito bom.' : pct >= 50 ? 'Bom começo. Revise os erros.' : 'Vale revisar o conteúdo e tentar de novo.';
      el.innerHTML = `<div class="qz-end">
        <div class="qz-score" style="--p:${pct}"><div><b>${right}/${n}</b><span>${pct}%</span></div></div>
        <div class="qz-msg"><h2>${msg}</h2><p>Você respondeu ${n} perguntas de um banco de ${pool.length}.</p></div>
        <div class="qz-actions">
          <button class="btn primary" data-act="new">Nova rodada</button>
          ${wrong.length ? `<button class="btn" data-act="wrong">Refazer só os erros (${wrong.length})</button>` : ''}
          ${pool.length > n ? `<button class="btn" data-act="all">Todas as ${pool.length} perguntas</button>` : ''}
        </div>
        ${wrong.length ? `<div class="qz-review"><h2>Revisão dos erros</h2>${wrong.map((it) => `<div class="qz-rev">${it.q.texto ? `<p class="exp">${esc(it.q.texto)}</p>` : ''}<p class="qt">${esc(it.q.p)}</p><p><span class="tag bad">Sua resposta</span> ${esc(it.q.o[it.a])}</p><p><span class="tag ok">Correta</span> ${esc(it.q.o[it.q.r])}</p><p class="exp">${esc(it.q.e)}</p></div>`).join('')}</div>` : ''}
      </div>`;
      el.querySelector('[data-act="new"]').onclick = () => { Object.assign(run, newRound(pool, run.size)); draw(); el.scrollIntoView({ block: 'nearest' }); };
      const w = el.querySelector('[data-act="wrong"]'); if (w) w.onclick = () => { Object.assign(run, newRound(wrong.map((it) => it.q), wrong.length)); draw(); };
      const a = el.querySelector('[data-act="all"]'); if (a) a.onclick = () => { run.size = pool.length; Object.assign(run, newRound(pool, pool.length)); draw(); };
      return;
    }
    const it = run.items[run.i], q = it.q, answered = it.a !== null;
    const s = sysName(q.sys);
    el.innerHTML = `<div class="qz">
      <div class="qz-top"><span class="qz-count">Pergunta ${run.i + 1} de ${n}</span><span class="qz-right">${right} ${right === 1 ? 'acerto' : 'acertos'}</span></div>
      <div class="qz-bar" role="progressbar" aria-valuemin="0" aria-valuemax="${n}" aria-valuenow="${run.i + (answered ? 1 : 0)}">${run.items.map((x, k) => `<i class="${x.a === null ? (k === run.i ? 'cur' : '') : x.a === x.q.r ? 'ok' : 'bad'}"></i>`).join('')}</div>
      <div class="qz-card">
        ${(showSys && s) || q.estilo ? `<div class="qz-meta">${showSys && s ? `<span class="qz-sys" style="--c:${s.cor}"><i></i>${esc(s.nome)}</span>` : ''}${q.estilo ? `<span class="qz-badge">Estilo ${esc(q.estilo)}</span>` : ''}</div>` : ''}
        ${q.texto ? `<p class="qz-texto">${esc(q.texto)}</p>` : ''}
        <p class="qz-q">${esc(q.p)}</p>
        <div class="qz-opts">${it.order.map((j, k) => {
          const cls = !answered ? '' : j === q.r ? 'ok' : j === it.a ? 'bad' : 'dim';
          return `<button data-o="${j}" class="${cls}" ${answered ? 'disabled' : ''}><span class="lt">${LETTERS[k]}</span><span>${esc(q.o[j])}</span></button>`;
        }).join('')}</div>
        ${answered ? `<div class="qz-fb ${it.a === q.r ? 'ok' : 'bad'}"><b>${it.a === q.r ? 'Correto!' : 'Não foi dessa vez.'}</b> ${it.a !== q.r ? `Resposta certa: <b>${esc(q.o[q.r].replace(/\.$/, ''))}</b>. ` : ''}${esc(q.e)}</div>` : ''}
      </div>
      <div class="qz-nav">
        <button class="btn" data-act="restart">Recomeçar</button>
        ${answered ? `<button class="btn primary" data-act="next">${run.i + 1 < n ? 'Próxima pergunta' : 'Ver resultado'}</button>` : '<span class="note">Toque numa alternativa</span>'}
      </div>
    </div>`;
    el.querySelectorAll('[data-o]').forEach((b) => b.addEventListener('click', () => { it.a = +b.dataset.o; draw(); const nx = el.querySelector('[data-act="next"]'); nx && nx.focus({ preventScroll: true }); }));
    const nx = el.querySelector('[data-act="next"]');
    if (nx) nx.onclick = () => { if (run.i + 1 < n) run.i++; else run.done = true; draw(); const top = el.getBoundingClientRect().top; if (top < 120) scrollBy({ top: top - 140, behavior: reduceMotion ? 'auto' : 'smooth' }); };
    el.querySelector('[data-act="restart"]').onclick = () => { Object.assign(run, newRound(pool, run.size)); draw(); };
  };
  el.onkeydown = (e) => {
    const k = e.key.toUpperCase(), idx = LETTERS.indexOf(k);
    const b = idx >= 0 ? el.querySelectorAll('[data-o]')[idx] : (k >= '1' && k <= '5') ? el.querySelectorAll('[data-o]')[+k - 1] : null;
    if (b && !b.disabled) { b.click(); e.preventDefault(); }
  };
  el.tabIndex = -1;
  draw();
}

/* ---- simulado geral ---- */
function renderSimulado() {
  rail(null); state.sys = null;
  state.sim = state.sim || { ids: SYSTEMS.map((s) => s.id), size: 20, tipo: 'todas', started: false };
  state.sim.tipo = state.sim.tipo || 'todas';
  const sim = state.sim;
  app.innerHTML = `<div class="wrap"><div class="sim">
    <div class="eyebrow">Revisão com todos os sistemas</div><h1>Simulado</h1>
    <p class="lead">${TOTAL_Q} perguntas de anatomia e fisiologia, incluindo ${TOTAL_VEST} no formato de Enem e vestibulares. Escolha os sistemas e o tamanho da rodada. As perguntas e as alternativas mudam de ordem a cada rodada.</p>
    <div class="sim-cfg">
      <div><h2>Sistemas</h2><div class="sim-sys hs">${SYSTEMS.map((s) => `<button class="chip-l" data-id="${s.id}" aria-pressed="${sim.ids.includes(s.id)}" style="--c:${s.cor}"><i></i>${esc(s.nome)}</button>`).join('')}</div>
      <div class="sim-row"><button class="link" data-all>Marcar todos</button><button class="link" data-none>Limpar</button></div></div>
      <div><h2>Tipo de questão</h2><div class="seg hs">${TIPOS.map(([k, l]) => `<button data-t="${k}" aria-pressed="${sim.tipo === k}">${l}</button>`).join('')}</div>
      <p class="note" style="margin-top:8px">As de estilo vestibular têm texto-base e 5 alternativas, no formato de Enem e UERJ.</p></div>
      <div><h2>Tamanho</h2><div class="seg">${[10, 20, 30, 50].map((n) => `<button data-n="${n}" aria-pressed="${sim.size === n}">${n}</button>`).join('')}</div></div>
      <button class="btn primary" data-start>Começar simulado</button>
    </div>
    <div id="simquiz"></div>
    <div class="sim-links"><h2>Provas originais</h2><p class="note">As questões daqui são originais, no formato desses exames. Para treinar com as provas oficiais, use os acervos das bancas:</p>
      ${window.PROVAS_LINKS.map((l) => `<a class="shortcut" href="${l.url}" target="_blank" rel="noopener"><span><b>${esc(l.nome)}</b><small>${esc(l.nota)}</small></span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M8 7h9v9"/></svg></a>`).join('')}
    </div>
  </div></div>`;
  const pool = () => poolFor(sim.ids, sim.tipo);
  const start = () => {
    const p = pool(); if (!p.length) return;
    delete (state.runs || {}).sim;
    runQuiz($('#simquiz'), p, 'sim', { size: sim.size, showSys: true });
    sim.started = true;
  };
  const refresh = () => {
    app.querySelectorAll('[data-id]').forEach((b) => b.setAttribute('aria-pressed', sim.ids.includes(b.dataset.id)));
    app.querySelectorAll('[data-n]').forEach((b) => b.setAttribute('aria-pressed', +b.dataset.n === sim.size));
    app.querySelectorAll('[data-t]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.t === sim.tipo));
    const n = pool().length; const st = app.querySelector('[data-start]');
    st.disabled = !n; st.textContent = n ? `Começar simulado (${Math.min(sim.size, n)} de ${n})` : 'Escolha ao menos um sistema';
  };
  app.querySelectorAll('[data-id]').forEach((b) => b.onclick = () => { const id = b.dataset.id; sim.ids = sim.ids.includes(id) ? sim.ids.filter((x) => x !== id) : [...sim.ids, id]; refresh(); });
  app.querySelectorAll('[data-n]').forEach((b) => b.onclick = () => { sim.size = +b.dataset.n; refresh(); });
  app.querySelectorAll('[data-t]').forEach((b) => b.onclick = () => { sim.tipo = b.dataset.t; refresh(); });
  app.querySelector('[data-all]').onclick = () => { sim.ids = SYSTEMS.map((s) => s.id); refresh(); };
  app.querySelector('[data-none]').onclick = () => { sim.ids = []; refresh(); };
  app.querySelector('[data-start]').onclick = () => { start(); $('#simquiz').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }); };
  refresh();
  if (sim.started && state.runs && state.runs.sim) runQuiz($('#simquiz'), pool(), 'sim', { size: sim.size, showSys: true });
  initHScroll();
}

/* ---- créditos ---- */
function renderCredits() {
  rail(null); state.sys = null;
  app.innerHTML = `<div class="wrap"><div class="credits">
    <div class="eyebrow">Fontes e licenças</div><h1>Créditos</h1>
    <p>Os modelos 3D deste atlas vêm de bases científicas abertas, gratuitas e com licença que permite redistribuição com atribuição. As geometrias foram simplificadas, comprimidas e reorganizadas por sistema para carregar bem em celulares. Os nomes foram traduzidos para o português.</p>
    <div class="src"><h2>BodyParts3D 4.0</h2><p>© The Database Center for Life Science (DBCLS), licenciado sob <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a>. Modelo de referência de adulto do sexo masculino: esqueleto, músculos, vasos, encéfalo, olho e vísceras. Mitsuhashi et al. (2009), Nucleic Acids Research. <a href="https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html" target="_blank" rel="noopener">Base de dados</a> · <a href="https://doi.org/10.1093/nar/gkn613" target="_blank" rel="noopener">artigo</a>.</p></div>
    <div class="src"><h2>Human Reference Atlas, 3D Reference Organ Set for Female v1.5</h2><p>Kristen Browne e Heidi Schlehlein, HuBMAP (2023), licenciado sob <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a>. Usado para coração, pulmões, órgãos abdominais, rins, linfonodo, mamas, órgãos reprodutores femininos e placenta. <a href="https://doi.org/10.48539/HBM352.BTSQ.586" target="_blank" rel="noopener">DOI</a>.</p></div>
    <div class="src"><h2>Preparação das geometrias</h2><p>Simplificação e empacotamento iniciais pelo projeto <a href="https://github.com/ashemag/human-atlas" target="_blank" rel="noopener">Human Atlas</a> (código MIT). Neste site: quantização em 16 bits, agrupamento por sistema, compressão e tradução dos nomes.</p></div>
    <div class="src"><h2>Tecnologia</h2><p>Renderização com <a href="https://threejs.org" target="_blank" rel="noopener">three.js</a> (MIT). Tipografia: Bricolage Grotesque, Atkinson Hyperlegible e JetBrains Mono (Google Fonts, OFL).</p></div>
    <p>Limitações: os modelos representam corpos de referência e não mostram todas as variações anatômicas. A tireoide e os pulmões completos do corpo masculino não fazem parte da base. Este conteúdo é educativo e não substitui protocolos institucionais, diretrizes oficiais ou avaliação clínica.</p>
  </div></div>`;
}

/* ---- rotas ---- */
function route() {
  const id = (location.hash || '#inicio').slice(1);
  const sys = SYSTEMS.find((s) => s.id === id);
  if (sys) renderSystem(sys);
  else if (id === 'creditos') { renderCredits(); scrollTo(0, 0); }
  else if (id === 'simulado') { renderSimulado(); scrollTo(0, 0); }
  else if (id === 'sistemas-lista') { if (!$('#sistemas-lista')) renderHome(); $('#sistemas-lista').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); return; }
  else renderHome();
  if (sys) scrollTo(0, 0);
}
addEventListener('hashchange', route);
addEventListener('resize', () => { const c = $('.chrome'); if (c) document.documentElement.style.setProperty('--chrome-h', c.offsetHeight + 'px'); });
route();
