window.CONTENT = [
{
  id: 'esqueletico', nome: 'Esquelético', titulo: 'Sistema esquelético', cor: '#d8cba8',
  curto: 'Ossos, articulações e ligamentos que sustentam e protegem o corpo.',
  resumo: 'O esqueleto adulto tem cerca de 206 ossos. Ele sustenta o corpo, protege órgãos vitais (crânio, caixa torácica, coluna), serve de alavanca para os músculos, armazena cálcio e fósforo e abriga a medula óssea vermelha, onde as células do sangue são produzidas.',
  funcoes: ['Sustentação e forma do corpo', 'Proteção de encéfalo, medula, coração e pulmões', 'Movimento, junto com músculos e articulações', 'Reserva de cálcio e fósforo', 'Hematopoese na medula óssea vermelha'],
  cenas: [{ nome: 'Esqueleto e ligamentos', grupos: ['m-skeletal', 'm-connective'], contexto: [{ nome: 'Pele', grupo: 'm-integumentary' }] }],
  chave: [
    { t: 'Crânio (osso frontal)', q: '^Osso frontal' }, { t: 'Clavícula', q: '^Clavícula' }, { t: 'Escápula', q: '^Escápula' },
    { t: 'Esterno', q: 'esterno|Processo xifoide' }, { t: 'Úmero', q: '^Úmero' }, { t: 'Rádio e ulna', q: '^(Rádio|Ulna)$' },
    { t: 'Coluna lombar', q: 'vértebra lombar' }, { t: 'Sacro', q: '^Sacro' }, { t: 'Osso do quadril', q: '^Osso do quadril' },
    { t: 'Fêmur', q: '^Fêmur' }, { t: 'Patela', q: '^Patela' }, { t: 'Tíbia', q: '^Tíbia' }, { t: 'Calcâneo', q: '^Calcâneo' },
    { t: 'Tendão do calcâneo', q: 'Tendão do calcâneo' }
  ],
  avaliacao: [
    'Inspecione alinhamento, simetria, deformidades, edema e hematomas.',
    'Avalie amplitude de movimento ativa e passiva, comparando os dois lados.',
    'Em suspeita de fratura, verifique os “5 Ps”: dor, palidez, pulso ausente, parestesia e paralisia.',
    'Avalie perfusão distal ao gesso ou tala: cor, temperatura, enchimento capilar e sensibilidade.'
  ],
  cuidados: [
    'Imobilize a fratura nas articulações acima e abaixo da lesão antes de mobilizar o paciente.',
    'Mantenha o membro gessado elevado nas primeiras 24–48 h e oriente sinais de alerta.',
    'Avalie risco de quedas em idosos e pacientes com osteoporose; mantenha grades e calçado adequado.',
    'Ventroglútea: localize o trocânter maior, a espinha ilíaca anterossuperior e a crista ilíaca para delimitar o ponto de injeção.'
  ],
  valores: [
    { k: 'Ossos no adulto', v: '≈ 206' },
    { k: 'Cálcio sérico total', v: '8,5–10,5 mg/dL' },
    { k: 'Acesso intraósseo', v: 'tíbia proximal ou úmero proximal' },
    { k: 'Punção de medula óssea', v: 'crista ilíaca posterior' }
  ],
  alertas: [
    'Síndrome compartimental: dor desproporcional que piora ao estirar passivamente o membro. Comunique imediatamente.',
    'Embolia gordurosa após fratura de ossos longos (24–72 h): dispneia, confusão e petéquias.',
    'Fratura de colo de fêmur em idosos: membro encurtado e em rotação externa.'
  ],
  quiz: [
    { p: 'Qual é o maior e mais resistente osso do corpo?', o: ['Tíbia', 'Fêmur', 'Úmero', 'Osso do quadril'], r: 1, e: 'O fêmur é o osso mais longo e resistente; suas fraturas podem causar grande perda sanguínea.' },
    { p: 'Na avaliação neurovascular de um membro fraturado, qual achado sugere síndrome compartimental?', o: ['Dor que melhora com elevação', 'Dor desproporcional que piora com estiramento passivo', 'Pulso cheio e pele quente', 'Prurido sob o gesso'], r: 1, e: 'A dor desproporcional, piorando ao estiramento passivo, é o sinal mais precoce.' },
    { p: 'Quais referências ósseas delimitam a região ventroglútea?', o: ['Acrômio e úmero', 'Trocânter maior, espinha ilíaca anterossuperior e crista ilíaca', 'Sacro e cóccix', 'Patela e tíbia'], r: 1, e: 'A técnica de Hochstetter usa trocânter maior, EIAS e crista ilíaca, longe do nervo isquiático.' }
  ]
},
{
  id: 'muscular', nome: 'Muscular', titulo: 'Sistema muscular', cor: '#c4685c',
  curto: 'Músculos esqueléticos que movem o corpo e são locais de injeção.',
  resumo: 'Os músculos esqueléticos produzem movimento, mantêm a postura e geram calor. Para a enfermagem, conhecer sua localização é essencial para injeções intramusculares, avaliação de força, mobilização e prevenção de complicações do imobilismo.',
  funcoes: ['Movimento voluntário', 'Postura e estabilidade articular', 'Produção de calor', 'Ventilação (diafragma e intercostais)', 'Retorno venoso (bomba da panturrilha)'],
  cenas: [{ nome: 'Músculos do corpo', grupos: ['m-muscular'], contexto: [{ nome: 'Esqueleto', grupo: 'm-skeletal' }, { nome: 'Pele', grupo: 'm-integumentary' }] }],
  chave: [
    { t: 'Deltoide', q: '^Deltoide' }, { t: 'Glúteo médio', q: '^Glúteo médio' }, { t: 'Glúteo máximo', q: '^Glúteo máximo' },
    { t: 'Vasto lateral', q: '^Vasto lateral' }, { t: 'Reto femoral', q: '^Reto femoral' }, { t: 'Diafragma', q: '^Diafragma' },
    { t: 'Esternocleidomastóideo', q: '^Esternocleidomastóideo' }, { t: 'Bíceps braquial', q: '^Bíceps braquial' },
    { t: 'Gastrocnêmio', q: '^Gastrocnêmio' }, { t: 'Trapézio', q: '^Trapézio,' }, { t: 'Intercostais', q: '^Intercostal' }
  ],
  avaliacao: [
    'Gradue a força muscular de 0 (sem contração) a 5 (normal) e compare os lados.',
    'Observe tônus, atrofia, fasciculações e dor à palpação.',
    'No imobilizado, avalie panturrilhas: dor, edema e calor podem indicar trombose venosa profunda.',
    'Use o diafragma e os acessórios (esternocleidomastóideo, escalenos) para avaliar esforço respiratório.'
  ],
  cuidados: [
    'Escolha o músculo IM conforme volume, idade e condição do paciente; faça rodízio de locais.',
    'Ventroglútea é o local de preferência no adulto, por estar longe de grandes vasos e nervos.',
    'Promova mobilização precoce e exercícios ativos/passivos para prevenir atrofia e contraturas.',
    'Posicione articulações em alinhamento funcional com coxins.'
  ],
  valores: [
    { k: 'Deltoide (adulto)', v: 'até 2 mL' },
    { k: 'Ventroglúteo', v: 'até 4–5 mL' },
    { k: 'Vasto lateral', v: 'até 4 mL; preferido em lactentes' },
    { k: 'Escala de força', v: '0 a 5' }
  ],
  alertas: [
    'Evite a região dorsoglútea: risco de lesão do nervo isquiático.',
    'Rabdomiólise: dor muscular, urina escura e CK elevada. Monitore função renal e diurese.',
    'Volumes máximos variam com massa muscular e protocolo institucional; confirme sempre.'
  ],
  quiz: [
    { p: 'Qual local IM é preferencial em lactentes?', o: ['Deltoide', 'Dorsoglúteo', 'Vasto lateral da coxa', 'Ventroglúteo'], r: 2, e: 'O vasto lateral é bem desenvolvido no lactente e distante de estruturas nobres.' },
    { p: 'Qual é o principal músculo da inspiração?', o: ['Peitoral maior', 'Diafragma', 'Reto do abdome', 'Trapézio'], r: 1, e: 'O diafragma se contrai e desce, aumentando o volume torácico.' },
    { p: 'Força grau 3 na escala de 0 a 5 significa:', o: ['Ausência de contração', 'Movimento contra a gravidade, sem resistência', 'Força normal', 'Contração visível sem movimento'], r: 1, e: 'Grau 3: vence a gravidade, mas não resiste a carga do examinador.' }
  ]
},
{
  id: 'nervoso', nome: 'Nervoso', titulo: 'Sistema nervoso', cor: '#e2b04a',
  curto: 'Encéfalo, tronco encefálico e nervos que controlam o corpo.',
  resumo: 'O sistema nervoso central (encéfalo e medula espinal) integra informações e comanda respostas. O tronco encefálico controla respiração, frequência cardíaca e nível de consciência. A avaliação neurológica seriada é uma das principais responsabilidades da enfermagem.',
  funcoes: ['Consciência, cognição e memória', 'Controle motor e sensibilidade', 'Controle autonômico de respiração e circulação', 'Integração dos sentidos', 'Regulação hormonal via hipotálamo'],
  cenas: [{ nome: 'Encéfalo e nervos', grupos: ['m-nervous'], contexto: [{ nome: 'Crânio', grupo: 'm-skeletal' }] }],
  chave: [
    { t: 'Giro pré-central (motor)', q: '^Giro pré-central' }, { t: 'Giro pós-central (sensitivo)', q: '^Giro pós-central' },
    { t: 'Corpo caloso', q: '^Corpo caloso' }, { t: 'Tálamo', q: '^Tálamo' }, { t: 'Hipotálamo', q: '^Hipotálamo' },
    { t: 'Hipocampo', q: '^Hipocampo' }, { t: 'Cerebelo', q: '^Cerebelo' }, { t: 'Mesencéfalo', q: '^Mesencéfalo' },
    { t: 'Ponte', q: '^Ponte' }, { t: 'Bulbo', q: '^Bulbo' }, { t: 'Nervo óptico', q: '^Nervo óptico|Quiasma' },
    { t: 'Ventrículos cerebrais', q: 'ventrículo' }
  ],
  avaliacao: [
    'Aplique a Escala de Coma de Glasgow: abertura ocular, resposta verbal e resposta motora.',
    'Avalie pupilas: tamanho, simetria e reação à luz. Anisocoria nova é sinal de alerta.',
    'Teste força e sensibilidade nos quatro membros e procure assimetrias.',
    'Em suspeita de AVC, avalie face, braço e fala e registre o horário do último momento bem.'
  ],
  cuidados: [
    'Mantenha cabeceira a 30° e cabeça alinhada em pacientes com risco de hipertensão intracraniana.',
    'Verifique glicemia capilar em todo rebaixamento de consciência.',
    'Proteja vias aéreas em pacientes com Glasgow ≤ 8.',
    'Previna lesões em crises convulsivas: lateralize, afaste objetos, não introduza nada na boca.'
  ],
  valores: [
    { k: 'Escala de Glasgow', v: '3 a 15' },
    { k: 'Glasgow-P (com pupilas)', v: '1 a 15' },
    { k: 'Pressão intracraniana', v: '5–15 mmHg' },
    { k: 'Trombólise no AVC isquêmico', v: 'até 4,5 h do início' }
  ],
  alertas: [
    'Tríade de Cushing: hipertensão, bradicardia e respiração irregular indicam herniação iminente.',
    'Queda de 2 pontos ou mais no Glasgow exige comunicação imediata.',
    'Pupila fixa e dilatada unilateral sugere compressão do nervo oculomotor.'
  ],
  quiz: [
    { p: 'Qual estrutura do tronco encefálico contém centros vitais de respiração e circulação?', o: ['Cerebelo', 'Bulbo', 'Hipocampo', 'Corpo caloso'], r: 1, e: 'O bulbo (medula oblonga) abriga centros respiratórios e cardiovasculares.' },
    { p: 'Glasgow 8 ou menos indica:', o: ['Trauma leve', 'Necessidade de avaliar proteção de via aérea', 'Alta hospitalar', 'Apenas sonolência'], r: 1, e: 'Glasgow ≤ 8 define coma e indica avaliar intubação.' },
    { p: 'O giro pré-central corresponde à área:', o: ['Sensitiva primária', 'Motora primária', 'Visual', 'Auditiva'], r: 1, e: 'O giro pré-central, no lobo frontal, é o córtex motor primário.' }
  ]
},
{
  id: 'sentidos', nome: 'Sentidos', titulo: 'Olho e órgãos dos sentidos', cor: '#7fb0c9',
  curto: 'Bulbo do olho, aparelho lacrimal e orelha externa.',
  resumo: 'O olho capta a luz e forma imagens na retina; o aparelho lacrimal mantém a superfície ocular úmida e protegida. A enfermagem atua na instilação de colírios, na proteção ocular de pacientes sedados e na irrigação em queimaduras químicas.',
  funcoes: ['Visão: córnea e lente focam a luz na retina', 'Proteção: pálpebras e filme lacrimal', 'Drenagem lacrimal para a cavidade nasal', 'Captação do som pela orelha externa'],
  cenas: [{ nome: 'Olho e anexos', grupos: ['m-sensory'], contexto: [{ nome: 'Crânio', grupo: 'm-skeletal' }, { nome: 'Músculos', grupo: 'm-muscular' }] }],
  chave: [
    { t: 'Córnea', q: '^Córnea' }, { t: 'Íris', q: '^Íris' }, { t: 'Lente (cristalino)', q: '^Lente' },
    { t: 'Retina', q: '^Retina' }, { t: 'Esclera', q: '^Esclera' }, { t: 'Corpo vítreo', q: '^Corpo vítreo' },
    { t: 'Glândula lacrimal', q: '^Glândula lacrimal' }, { t: 'Saco e ducto lacrimal', q: 'Saco lacrimal|Ducto lacrimonasal' },
    { t: 'Orelha externa', q: '^Orelha externa' }
  ],
  avaliacao: [
    'Avalie acuidade visual com tabela de Snellen, um olho de cada vez.',
    'Observe hiperemia, secreção, edema palpebral e lesões de córnea.',
    'No paciente sedado, verifique fechamento palpebral completo e reflexo corneano.',
    'Na otoscopia do adulto, tracione o pavilhão para cima e para trás.'
  ],
  cuidados: [
    'Instile o colírio no saco conjuntival inferior, sem tocar o frasco no olho.',
    'Comprima o canto interno (ponto lacrimal) por 1–2 min para reduzir absorção sistêmica.',
    'Aguarde cerca de 5 min entre colírios diferentes.',
    'Lubrifique e proteja os olhos de pacientes sedados para prevenir ceratite de exposição.'
  ],
  valores: [
    { k: 'Intervalo entre colírios', v: '≈ 5 min' },
    { k: 'Compressão do ponto lacrimal', v: '1–2 min' },
    { k: 'Irrigação em queimadura química', v: 'mínimo 15–20 min' },
    { k: 'Otoscopia em criança < 3 anos', v: 'pavilhão para baixo e para trás' }
  ],
  alertas: [
    'Queimadura química ocular é emergência: irrigue imediatamente com água corrente ou SF 0,9%.',
    'Dor ocular intensa com visão turva e náuseas pode ser glaucoma agudo.',
    'Não retire objetos encravados no olho; estabilize e encaminhe.'
  ],
  quiz: [
    { p: 'Onde se instila o colírio?', o: ['Sobre a córnea', 'No saco conjuntival inferior', 'No canto externo', 'Na pálpebra superior'], r: 1, e: 'O saco conjuntival inferior retém a gota sem estimular o reflexo de piscar sobre a córnea.' },
    { p: 'Por que comprimir o ponto lacrimal após o colírio?', o: ['Aliviar dor', 'Reduzir absorção sistêmica pela mucosa nasal', 'Dilatar a pupila', 'Aumentar a produção de lágrimas'], r: 1, e: 'A lágrima drena pelo ducto lacrimonasal; a compressão reduz a passagem do fármaco para a circulação.' },
    { p: 'Qual estrutura transparente é a principal responsável pela refração da luz?', o: ['Esclera', 'Córnea', 'Íris', 'Corioide'], r: 1, e: 'A córnea responde pela maior parte do poder refrativo do olho.' }
  ]
},
{
  id: 'cardiovascular', nome: 'Cardiovascular', titulo: 'Sistema cardiovascular', cor: '#c23b3b',
  curto: 'Coração, artérias e veias: pulsos, acessos e ausculta.',
  resumo: 'O coração bombeia sangue por dois circuitos: o pulmonar (ventrículo direito → pulmões) e o sistêmico (ventrículo esquerdo → corpo). Artérias levam sangue do coração; veias retornam. A enfermagem usa esse mapa todos os dias para aferir pulsos, puncionar veias, coletar gasometria e auscultar o coração.',
  funcoes: ['Transporte de oxigênio, nutrientes e hormônios', 'Remoção de CO₂ e metabólitos', 'Regulação da temperatura', 'Manutenção da pressão arterial e perfusão'],
  cenas: [
    { nome: 'Coração', grupos: ['f-cardiac'], contexto: [{ nome: 'Pulmões', grupo: 'f-respiratory' }] },
    { nome: 'Vasos do corpo', grupos: ['m-arterial', 'm-venous', 'm-cardiac'], contexto: [{ nome: 'Esqueleto', grupo: 'm-skeletal' }, { nome: 'Pele', grupo: 'm-integumentary' }] }
  ],
  chave: [
    { t: 'Ventrículo esquerdo', q: '^Ventrículo esquerdo', c: 0 }, { t: 'Ventrículo direito', q: '^Ventrículo direito', c: 0 },
    { t: 'Átrios', q: '^Átrio cardíaco', c: 0 }, { t: 'Valva mitral', q: '^Valva mitral', c: 0 },
    { t: 'Valva tricúspide', q: '^Valva tricúspide', c: 0 }, { t: 'Valva aórtica', q: '^Valva aórtica', c: 0 },
    { t: 'Artérias coronárias', q: 'coronária|circunflexo|diagonal', c: 0 }, { t: 'Aorta', q: '^(Aorta|Arco da aorta)', c: 0 },
    { t: 'Veias cavas', q: '^Veia cava', c: 0 },
    { t: 'Artéria carótida comum', q: '^Artéria carótida comum', c: 1 }, { t: 'Artéria radial', q: '^Artéria radial$', c: 1 },
    { t: 'Artéria braquial', q: '^Artéria braquial$', c: 1 }, { t: 'Artéria femoral', q: '^Artéria femoral$', c: 1 },
    { t: 'Artéria dorsal do pé', q: '^Artéria dorsal do pé', c: 1 }, { t: 'Veia intermédia do cotovelo', q: 'intermédia do cotovelo', c: 1 },
    { t: 'Veias cefálica e basílica', q: '^Veia (cefálica|basílica)', c: 1 }, { t: 'Veia jugular interna', q: '^Veia jugular interna', c: 1 },
    { t: 'Veia subclávia', q: '^Veia subclávia', c: 1 }, { t: 'Veia safena magna', q: '^Veia safena magna', c: 1 }
  ],
  avaliacao: [
    'Palpe pulsos radial, braquial, carotídeo, femoral, poplíteo, tibial posterior e pedioso; compare amplitude e simetria.',
    'Ausculte os focos: aórtico (2º EIC direito), pulmonar (2º EIC esquerdo), tricúspide (4º–5º EIC esquerdo, borda esternal) e mitral (5º EIC esquerdo, linha hemiclavicular).',
    'Avalie enchimento capilar, cor e temperatura das extremidades.',
    'Observe edema, turgência jugular e sinais de trombose em membros inferiores.'
  ],
  cuidados: [
    'Punção venosa periférica: comece pelas veias mais distais do membro superior (dorso da mão, cefálica, basílica).',
    'Coleta de sangue: a veia intermédia do cotovelo é a mais usada pela calibre e estabilidade.',
    'Gasometria arterial: prefira a artéria radial e faça o teste de Allen modificado antes.',
    'Cateter venoso central: jugular interna, subclávia ou femoral; mantenha técnica asséptica rigorosa.'
  ],
  valores: [
    { k: 'Frequência cardíaca (adulto)', v: '60–100 bpm' },
    { k: 'PA ótima', v: '< 120/80 mmHg' },
    { k: 'Hipertensão', v: '≥ 140/90 mmHg' },
    { k: 'Enchimento capilar', v: '≤ 2–3 s' }
  ],
  alertas: [
    'Dor torácica: faça ECG em até 10 min da chegada e comunique a equipe.',
    'Membro frio, pálido e sem pulso indica oclusão arterial aguda.',
    'Panturrilha edemaciada, dolorosa e quente sugere trombose venosa profunda.'
  ],
  quiz: [
    { p: 'Qual câmara bombeia sangue para a circulação sistêmica?', o: ['Átrio direito', 'Ventrículo direito', 'Ventrículo esquerdo', 'Átrio esquerdo'], r: 2, e: 'O ventrículo esquerdo ejeta sangue na aorta; por isso tem a parede mais espessa.' },
    { p: 'Qual artéria é a primeira escolha para gasometria arterial?', o: ['Femoral', 'Radial', 'Carótida', 'Braquial'], r: 1, e: 'A radial é superficial, fácil de comprimir e tem circulação colateral pela ulnar (teste de Allen).' },
    { p: 'O foco mitral é auscultado em:', o: ['2º EIC direito', '2º EIC esquerdo', '5º EIC esquerdo, linha hemiclavicular', 'Borda esternal direita'], r: 2, e: 'O foco mitral coincide com o ictus cordis, no 5º espaço intercostal esquerdo.' }
  ]
},
{
  id: 'respiratorio', nome: 'Respiratório', titulo: 'Sistema respiratório', cor: '#d98a9a',
  curto: 'Vias aéreas, brônquios e segmentos pulmonares.',
  resumo: 'O ar passa por nariz, faringe, laringe e traqueia até os brônquios, que se ramificam em segmentos pulmonares. A troca gasosa ocorre nos alvéolos. Entender a anatomia brônquica explica por que a aspiração e a intubação seletiva acontecem mais à direita.',
  funcoes: ['Troca gasosa (O₂ e CO₂)', 'Equilíbrio ácido-base', 'Filtração, aquecimento e umidificação do ar', 'Fonação pela laringe', 'Proteção contra aspiração (epiglote, tosse)'],
  cenas: [
    { nome: 'Pulmões e brônquios', grupos: ['f-respiratory'], contexto: [{ nome: 'Coração', grupo: 'f-cardiac' }] },
    { nome: 'Vias aéreas', grupos: ['m-respiratory'], contexto: [{ nome: 'Esqueleto', grupo: 'm-skeletal' }, { nome: 'Pele', grupo: 'm-integumentary' }] }
  ],
  chave: [
    { t: 'Segmentos pulmonares', q: '^Pulmão: segmento', c: 0 }, { t: 'Brônquio principal', q: '^Brônquio principal', c: 0 },
    { t: 'Carina', q: '^Carina', c: 0 }, { t: 'Hilo pulmonar', q: '^Hilo pulmonar', c: 0 }, { t: 'Lobo médio (brônquio)', q: 'lobar médio', c: 0 },
    { t: 'Cartilagem tireóidea', q: '^Cartilagem tireóidea', c: 0 }, { t: 'Cartilagem cricóidea', q: '^Cartilagem cricóidea', c: 0 },
    { t: 'Traqueia', q: '^Traqueia', c: 1 }, { t: 'Epiglote', q: '^Epiglote', c: 1 }, { t: 'Faringe', q: 'Constritor', c: 1 },
    { t: 'Concha nasal inferior', q: '^Concha nasal', c: 1 }, { t: 'Árvore brônquica', q: '^Árvore brônquica', c: 1 }
  ],
  avaliacao: [
    'Conte a frequência respiratória por 1 minuto completo, sem avisar o paciente.',
    'Observe padrão, uso de musculatura acessória, tiragem e cianose.',
    'Ausculte comparando os dois lados, de cima para baixo, anterior e posterior.',
    'Associe a oximetria ao quadro clínico; saturação isolada não descarta hipercapnia.'
  ],
  cuidados: [
    'Mantenha cabeceira entre 30° e 45° em ventilação mecânica para prevenir pneumonia.',
    'Aspiração traqueal: técnica asséptica, até 15 s por passagem, pressão até –150 mmHg no adulto.',
    'Mantenha pressão do cuff entre 20 e 30 cmH₂O.',
    'Estimule tosse, respiração profunda e deambulação no pós-operatório.'
  ],
  valores: [
    { k: 'Frequência respiratória (adulto)', v: '12–20 irpm' },
    { k: 'SpO₂ alvo geral', v: '≥ 94–95%' },
    { k: 'SpO₂ alvo na DPOC', v: '88–92%' },
    { k: 'Pressão do cuff', v: '20–30 cmH₂O' }
  ],
  alertas: [
    'O brônquio principal direito é mais curto, largo e vertical: corpos estranhos e tubos tendem a ir para a direita.',
    'Ausculta assimétrica após intubação pode indicar intubação seletiva.',
    'Estridor indica obstrução de via aérea alta e é emergência.'
  ],
  quiz: [
    { p: 'Por que a aspiração de corpo estranho é mais comum no pulmão direito?', o: ['O pulmão direito é menor', 'O brônquio principal direito é mais curto, largo e vertical', 'Há mais cartilagem à esquerda', 'A carina fica à direita'], r: 1, e: 'A anatomia do brônquio direito facilita a entrada de material aspirado.' },
    { p: 'Quantos lobos tem o pulmão direito?', o: ['Dois', 'Três', 'Quatro', 'Um'], r: 1, e: 'Superior, médio e inferior. O esquerdo tem dois lobos e a língula.' },
    { p: 'Qual faixa de pressão do cuff é recomendada?', o: ['5–10 cmH₂O', '20–30 cmH₂O', '40–50 cmH₂O', '60 cmH₂O'], r: 1, e: 'Abaixo de 20 há risco de microaspiração; acima de 30, de isquemia da mucosa traqueal.' }
  ]
},
{
  id: 'digestorio', nome: 'Digestório', titulo: 'Sistema digestório', cor: '#d9a066',
  curto: 'Do esôfago ao reto, com fígado, vesícula e pâncreas.',
  resumo: 'O trato digestório processa os alimentos, absorve nutrientes e elimina resíduos. Fígado, vesícula biliar e pâncreas secretam bile e enzimas no duodeno. Para a enfermagem, essa anatomia orienta sondagens, exame do abdome e cuidados com estomias.',
  funcoes: ['Ingestão e deglutição', 'Digestão mecânica e química', 'Absorção de nutrientes no intestino delgado', 'Absorção de água no intestino grosso', 'Metabolismo e detoxificação hepática'],
  cenas: [
    { nome: 'Órgãos abdominais', grupos: ['f-digestive'], contexto: [{ nome: 'Pele', grupo: 'f-skin' }] },
    { nome: 'Trato digestório', grupos: ['m-digestive'], contexto: [{ nome: 'Esqueleto', grupo: 'm-skeletal' }, { nome: 'Pele', grupo: 'm-integumentary' }] }
  ],
  chave: [
    { t: 'Fígado (segmentos)', q: '^Fígado:', c: 0 }, { t: 'Vesícula biliar e colédoco', q: 'Ducto colédoco|Ducto cístico|Vesícula', c: 0 },
    { t: 'Pâncreas', q: 'pâncreas', c: 0 }, { t: 'Duodeno', q: '^Duodeno|Ampola \\(bulbo\\)', c: 0 }, { t: 'Ceco e apêndice', q: '^Ceco|Apêndice', c: 0 },
    { t: 'Colo sigmoide', q: '^Colo sigmoide', c: 0 }, { t: 'Reto', q: '^Reto$', c: 0 },
    { t: 'Esôfago', q: '^Esôfago', c: 1 }, { t: 'Estômago', q: '^Estômago', c: 1 }, { t: 'Jejuno e íleo', q: '^(Jejuno|Íleo)', c: 1 },
    { t: 'Colo transverso', q: '^Colo transverso', c: 1 }, { t: 'Língua', q: '^Língua', c: 1 }
  ],
  avaliacao: [
    'Examine na ordem: inspeção, ausculta, percussão e palpação, para não alterar os ruídos.',
    'Ausculte os ruídos hidroaéreos nos quatro quadrantes.',
    'Pesquise dor no ponto de McBurney e descompressão brusca (sinal de Blumberg).',
    'Observe distensão, náuseas, vômitos, eliminações e aspecto das fezes.'
  ],
  cuidados: [
    'Sonda nasogástrica: meça da ponta do nariz ao lóbulo da orelha e daí ao apêndice xifoide.',
    'Confirme a posição da sonda por radiografia antes da primeira dieta; o pH do aspirado é teste complementar.',
    'Administre dieta enteral com cabeceira elevada a 30°–45°.',
    'Proteja a pele periestomal e ajuste a bolsa ao diâmetro do estoma.'
  ],
  valores: [
    { k: 'Ruídos hidroaéreos', v: '≈ 5–35 por minuto' },
    { k: 'pH do aspirado gástrico', v: '≤ 5,5' },
    { k: 'Comprimento do intestino delgado', v: '≈ 6–7 m' },
    { k: 'Cabeceira na dieta enteral', v: '30°–45°' }
  ],
  alertas: [
    'Abdome em tábua com dor intensa sugere peritonite.',
    'Hematêmese ou melena: avalie sinais de choque e comunique imediatamente.',
    'Tosse, cianose ou desconforto ao passar a sonda indicam via aérea: retire.'
  ],
  quiz: [
    { p: 'Qual a sequência correta do exame físico do abdome?', o: ['Palpação, percussão, ausculta, inspeção', 'Inspeção, ausculta, percussão, palpação', 'Inspeção, palpação, ausculta, percussão', 'Ausculta, inspeção, palpação, percussão'], r: 1, e: 'A ausculta vem antes da palpação para não alterar o peristaltismo.' },
    { p: 'Qual exame confirma com segurança a posição da sonda nasoenteral?', o: ['Ausculta de ar injetado', 'Radiografia', 'Observar bolhas em água', 'Pedir ao paciente que fale'], r: 1, e: 'A radiografia é o padrão de referência; a ausculta isolada não é confiável.' },
    { p: 'Onde a bile e o suco pancreático são lançados?', o: ['Estômago', 'Duodeno', 'Íleo', 'Colo transverso'], r: 1, e: 'Ambos chegam ao duodeno pela ampola hepatopancreática (de Vater).' }
  ]
},
{
  id: 'urinario', nome: 'Urinário', titulo: 'Sistema urinário', cor: '#c8b23a',
  curto: 'Rins, ureteres, bexiga e uretra.',
  resumo: 'Os rins filtram o sangue, formam a urina e regulam água, eletrólitos, pressão arterial e equilíbrio ácido-base. A urina segue pelos cálices e pelve renal até o ureter, a bexiga e a uretra. Controle de diurese e cateterismo vesical são cuidados centrais da enfermagem.',
  funcoes: ['Filtração do sangue e eliminação de resíduos', 'Equilíbrio hídrico e eletrolítico', 'Controle da pressão arterial (renina)', 'Produção de eritropoetina', 'Ativação da vitamina D'],
  cenas: [
    { nome: 'Rins e bexiga', grupos: ['f-urinary'], contexto: [{ nome: 'Pele', grupo: 'f-skin' }] },
    { nome: 'Trato urinário', grupos: ['m-urinary'], contexto: [{ nome: 'Esqueleto', grupo: 'm-skeletal' }, { nome: 'Vasos', grupo: 'm-arterial' }] }
  ],
  chave: [
    { t: 'Córtex renal', q: '^Córtex renal', c: 0 }, { t: 'Pirâmides renais', q: '^Pirâmide renal', c: 0 },
    { t: 'Cálices', q: '^Cálice', c: 0 }, { t: 'Pelve renal', q: '^Pelve renal', c: 0 }, { t: 'Ureter', q: '^Ureter', c: 0 },
    { t: 'Trígono da bexiga', q: '^Trígono', c: 0 },
    { t: 'Rim', q: '^Rim', c: 1 }, { t: 'Bexiga urinária', q: '^Bexiga', c: 1 }, { t: 'Uretra masculina', q: '^Uretra', c: 1 }
  ],
  avaliacao: [
    'Registre volume, cor, odor e aspecto da urina; calcule o balanço hídrico.',
    'Palpe e percuta o hipogástrio em busca de globo vesical.',
    'Pesquise dor lombar à punho-percussão (sinal de Giordano).',
    'Observe edema, ganho de peso e sinais de sobrecarga hídrica.'
  ],
  cuidados: [
    'Cateterismo vesical com técnica asséptica e material estéril.',
    'Mantenha o sistema fechado e a bolsa sempre abaixo do nível da bexiga, sem tocar o chão.',
    'Fixe a sonda (coxa na mulher; hipogástrio no homem) para evitar tração.',
    'Avalie diariamente a necessidade da sonda e retire o quanto antes.'
  ],
  valores: [
    { k: 'Diurese mínima (adulto)', v: '≥ 0,5 mL/kg/h' },
    { k: 'Oligúria', v: '< 400 mL/24 h' },
    { k: 'Anúria', v: '< 100 mL/24 h' },
    { k: 'Uretra feminina / masculina', v: '≈ 4 cm / 18–20 cm' }
  ],
  alertas: [
    'Diurese abaixo de 0,5 mL/kg/h por mais de 6 h pode indicar lesão renal aguda.',
    'Febre, urina turva e dor suprapúbica em paciente sondado sugerem infecção urinária associada a cateter.',
    'Nunca force a passagem da sonda contra resistência.'
  ],
  quiz: [
    { p: 'Qual a diurese mínima esperada para um adulto de 70 kg?', o: ['10 mL/h', '35 mL/h', '100 mL/h', '200 mL/h'], r: 1, e: '0,5 mL/kg/h × 70 kg = 35 mL/h.' },
    { p: 'Por que a bolsa coletora deve ficar abaixo da bexiga?', o: ['Para medir melhor', 'Para evitar refluxo de urina e infecção', 'Para acelerar a diurese', 'Por conforto estético'], r: 1, e: 'O refluxo leva bactérias da bolsa para a bexiga.' },
    { p: 'Onde a urina é coletada logo após sair das papilas renais?', o: ['Ureter', 'Cálices menores', 'Uretra', 'Trígono'], r: 1, e: 'Papila → cálice menor → cálice maior → pelve renal → ureter.' }
  ]
},
{
  id: 'reprodutor', nome: 'Reprodutor', titulo: 'Sistemas reprodutores', cor: '#b0739e',
  curto: 'Útero, ovários, mamas, placenta e órgãos masculinos.',
  resumo: 'O sistema reprodutor feminino inclui útero, tubas uterinas, ovários e vagina; a mama é estudada junto pela sua relação com amamentação e rastreamento. O masculino inclui testículos, epidídimos, ductos deferentes, próstata e pênis. A enfermagem atua do pré-natal à prevenção de câncer.',
  funcoes: ['Produção de gametas e hormônios sexuais', 'Fecundação (ampola da tuba uterina)', 'Gestação e nutrição do feto (placenta)', 'Lactação', 'Transporte de espermatozoides'],
  cenas: [
    { nome: 'Feminino', grupos: ['f-reproductive'], contexto: [{ nome: 'Bexiga e rins', grupo: 'f-urinary' }] },
    { nome: 'Placenta', grupos: ['f-pregnancy'] },
    { nome: 'Mamas', grupos: ['f-breast'], contexto: [{ nome: 'Pele', grupo: 'f-skin' }] },
    { nome: 'Masculino', grupos: ['m-reproductive', 'm-urinary'], contexto: [{ nome: 'Esqueleto', grupo: 'm-skeletal' }] }
  ],
  chave: [
    { t: 'Fundo do útero', q: '^Fundo do útero', c: 0 }, { t: 'Corpo do útero', q: '^Corpo do útero|Parede (anterior|posterior) do útero', c: 0 },
    { t: 'Colo do útero', q: '^Colo do útero|Óstio', c: 0 }, { t: 'Tubas uterinas', q: 'tuba uterina', c: 0 }, { t: 'Ovários', q: '^Ovário', c: 0 },
    { t: 'Vagina', q: '^Vagina', c: 0 }, { t: 'Placenta', q: '^Placenta|Âmnio', c: 1 }, { t: 'Cordão umbilical', q: 'umbilical', c: 1 },
    { t: 'Mamilo e aréola', q: '^Papila mamária|^Aréola', c: 2 }, { t: 'Ductos e seios lactíferos', q: 'lactífero', c: 2 },
    { t: 'Ligamentos de Cooper', q: 'suspensores da mama', c: 2 },
    { t: 'Próstata', q: '^Próstata', c: 3 }, { t: 'Testículo e epidídimo', q: '^Testículo|^Epidídimo', c: 3 }, { t: 'Ducto deferente', q: '^Ducto deferente', c: 3 }
  ],
  avaliacao: [
    'Meça a altura uterina da sínfise púbica ao fundo do útero com fita métrica.',
    'Entre 18 e 30 semanas, a altura uterina em cm costuma corresponder à idade gestacional em semanas.',
    'No exame clínico das mamas, observe simetria, retrações, secreções e linfonodos axilares.',
    'Avalie a pega na amamentação: boca bem aberta, lábios evertidos e boa parte da aréola abocanhada.'
  ],
  cuidados: [
    'Oriente sobre rastreamento do câncer de colo do útero e de mama conforme a diretriz vigente do Ministério da Saúde.',
    'No pós-parto, palpe o fundo uterino e avalie a involução e o sangramento (lóquios).',
    'Confira os vasos do cordão umbilical: duas artérias e uma veia.',
    'Na sondagem vesical masculina, eleve o pênis a cerca de 90° para retificar a uretra.'
  ],
  valores: [
    { k: 'Vasos do cordão umbilical', v: '2 artérias + 1 veia' },
    { k: 'Altura uterina na 20ª semana', v: '≈ altura da cicatriz umbilical' },
    { k: 'Local da fecundação', v: 'ampola da tuba uterina' },
    { k: 'Útero não gravídico', v: '≈ 7–8 cm de comprimento' }
  ],
  alertas: [
    'Útero amolecido após o parto com sangramento intenso sugere atonia uterina: massageie e comunique.',
    'Dor abdominal com atraso menstrual e sangramento pode indicar gravidez ectópica (tuba uterina).',
    'Dor testicular súbita e intensa pode ser torção testicular: emergência.'
  ],
  quiz: [
    { p: 'Onde normalmente ocorre a fecundação?', o: ['Útero', 'Ovário', 'Ampola da tuba uterina', 'Colo do útero'], r: 2, e: 'A ampola é a porção mais larga da tuba e o local habitual da fecundação.' },
    { p: 'Quantos vasos tem o cordão umbilical normal?', o: ['Uma artéria e uma veia', 'Duas artérias e uma veia', 'Duas veias e uma artéria', 'Três artérias'], r: 1, e: 'A artéria umbilical única pode associar-se a malformações.' },
    { p: 'Qual glândula masculina envolve a uretra logo abaixo da bexiga?', o: ['Testículo', 'Próstata', 'Epidídimo', 'Glândula seminal'], r: 1, e: 'Seu aumento (hiperplasia) pode obstruir a uretra e dificultar a sondagem.' }
  ]
},
{
  id: 'endocrino', nome: 'Endócrino', titulo: 'Sistema endócrino', cor: '#8c7bd1',
  curto: 'Hipófise, pineal, suprarrenais e pâncreas endócrino.',
  resumo: 'As glândulas endócrinas liberam hormônios no sangue para regular metabolismo, crescimento, estresse e reprodução. O hipotálamo controla a hipófise, que comanda outras glândulas. O pâncreas, além de digestivo, produz insulina e glucagon. A tireoide não aparece neste modelo 3D, mas é tratada no texto.',
  funcoes: ['Controle da glicemia (insulina e glucagon)', 'Resposta ao estresse (cortisol e adrenalina)', 'Equilíbrio de água e sódio (ADH e aldosterona)', 'Metabolismo (hormônios tireoidianos)', 'Ritmo sono-vigília (melatonina)'],
  cenas: [{ nome: 'Glândulas', grupos: ['m-endocrine', 'm-urinary', 'm-digestive'], contexto: [{ nome: 'Encéfalo', grupo: 'm-nervous' }, { nome: 'Pele', grupo: 'm-integumentary' }] }],
  chave: [
    { t: 'Hipófise', q: '^Hipófise' }, { t: 'Glândula pineal', q: '^Glândula pineal' },
    { t: 'Suprarrenais', q: '^Glândula suprarrenal' }, { t: 'Pâncreas', q: '^Pâncreas|Parênquima pancreático' }, { t: 'Rins', q: '^Rim' }
  ],
  avaliacao: [
    'Verifique glicemia capilar conforme prescrição e sempre diante de sudorese, tremor ou confusão.',
    'Observe sinais de hipoglicemia: sudorese, tremor, taquicardia, confusão.',
    'Na hiperglicemia, observe poliúria, polidipsia, desidratação e hálito cetônico.',
    'Após cirurgia de hipófise, controle diurese e sódio (risco de diabetes insípido).'
  ],
  cuidados: [
    'Hipoglicemia consciente: ofereça 15 g de carboidrato de absorção rápida e reavalie em 15 min.',
    'Insulina subcutânea: faça rodízio entre abdome, coxas, braços e glúteos.',
    'Em uso prolongado de corticoide, não suspenda abruptamente (risco de insuficiência adrenal).',
    'Registre peso diário e balanço hídrico em distúrbios de ADH.'
  ],
  valores: [
    { k: 'Glicemia de jejum normal', v: '70–99 mg/dL' },
    { k: 'Hipoglicemia', v: '< 70 mg/dL' },
    { k: 'Sódio sérico', v: '135–145 mEq/L' },
    { k: 'Regra para hipoglicemia', v: '15 g / 15 min' }
  ],
  alertas: [
    'Paciente inconsciente com hipoglicemia: não ofereça nada por boca; siga o protocolo (glicose IV ou glucagon).',
    'Hipotensão refratária, náuseas e fraqueza em quem usa corticoide sugerem crise adrenal.',
    'Glicemia acima de 250 mg/dL com cetonas exige avaliação para cetoacidose.'
  ],
  quiz: [
    { p: 'Qual glândula é chamada de “glândula mestra”, controlada pelo hipotálamo?', o: ['Pineal', 'Hipófise', 'Suprarrenal', 'Tireoide'], r: 1, e: 'A hipófise regula tireoide, suprarrenais, gônadas e outras funções.' },
    { p: 'Paciente consciente com glicemia de 58 mg/dL. Conduta inicial?', o: ['Insulina regular', '15 g de carboidrato rápido e reavaliar em 15 min', 'Aguardar a próxima refeição', 'Soro fisiológico'], r: 1, e: 'É a regra dos 15: corrige e reavalia.' },
    { p: 'Onde ficam as glândulas suprarrenais?', o: ['Sobre os rins', 'Na base do crânio', 'No pescoço', 'No mediastino'], r: 0, e: 'Ficam no polo superior de cada rim e produzem cortisol, aldosterona e catecolaminas.' }
  ]
},
{
  id: 'linfatico', nome: 'Linfático', titulo: 'Sistema linfático e imune', cor: '#6fae8a',
  curto: 'Linfonodos, vasos linfáticos, baço e timo.',
  resumo: 'O sistema linfático devolve o líquido intersticial à circulação e filtra a linfa nos linfonodos, onde linfócitos reconhecem agentes estranhos. O baço filtra o sangue e o timo amadurece linfócitos T. Linfedema e risco infeccioso pós-esplenectomia são temas frequentes na enfermagem.',
  funcoes: ['Drenagem do líquido intersticial', 'Defesa imunológica', 'Filtração da linfa (linfonodos) e do sangue (baço)', 'Absorção de gorduras no intestino', 'Maturação de linfócitos T (timo)'],
  cenas: [
    { nome: 'Linfonodo e baço', grupos: ['f-lymphatic'] },
    { nome: 'Baço e timo no corpo', grupos: ['m-lymphatic'], contexto: [{ nome: 'Esqueleto', grupo: 'm-skeletal' }, { nome: 'Pele', grupo: 'm-integumentary' }] }
  ],
  chave: [
    { t: 'Cápsula do linfonodo', q: '^Cápsula do linfonodo', c: 0 }, { t: 'Vasos aferentes e eferentes', q: 'Vaso linfático', c: 0 },
    { t: 'Folículos linfoides', q: 'Folículo', c: 0 }, { t: 'Baço', q: 'baço|esplênico', c: 0 }, { t: 'Timo', q: 'timo', c: 0 },
    { t: 'Baço (posição)', q: '^Baço', c: 1 }, { t: 'Timo (posição)', q: 'timo', c: 1 }
  ],
  avaliacao: [
    'Palpe cadeias cervicais, supraclaviculares, axilares e inguinais.',
    'Descreva tamanho, consistência, mobilidade, dor e sinais inflamatórios.',
    'O baço normal não é palpável; baço palpável sugere esplenomegalia.',
    'Meça a circunferência dos membros para acompanhar linfedema.'
  ],
  cuidados: [
    'Após esvaziamento axilar, siga o protocolo institucional sobre punções e aferição de PA no membro.',
    'Oriente cuidados com a pele do membro com linfedema: hidratação e prevenção de feridas.',
    'Pacientes esplenectomizados precisam de vacinação contra germes encapsulados.',
    'Valorize febre em imunossuprimidos como possível emergência.'
  ],
  valores: [
    { k: 'Linfonodo normal', v: 'em geral < 1 cm' },
    { k: 'Linfonodo suspeito', v: 'endurecido, fixo, indolor' },
    { k: 'Baço normal', v: 'não palpável' },
    { k: 'Leucócitos (adulto)', v: '≈ 4.000–11.000/mm³' }
  ],
  alertas: [
    'Febre em neutropênico: inicie protocolo de neutropenia febril sem atraso.',
    'Linfonodo supraclavicular esquerdo aumentado (Virchow) pode indicar neoplasia abdominal.',
    'Esplenectomizado com febre tem risco de sepse fulminante.'
  ],
  quiz: [
    { p: 'Por onde a linfa entra no linfonodo?', o: ['Vasos eferentes', 'Vasos aferentes', 'Hilo arterial', 'Cápsula'], r: 1, e: 'Vasos aferentes chegam pela convexidade; os eferentes saem pelo hilo.' },
    { p: 'Qual vacinação é prioritária após esplenectomia?', o: ['Apenas influenza', 'Contra germes encapsulados (pneumococo, meningococo, Hib)', 'Febre amarela', 'Nenhuma'], r: 1, e: 'Sem baço, a defesa contra bactérias encapsuladas fica comprometida.' },
    { p: 'Qual órgão amadurece os linfócitos T?', o: ['Baço', 'Timo', 'Fígado', 'Medula espinal'], r: 1, e: 'O timo é maior na infância e involui na vida adulta.' }
  ]
},
{
  id: 'tegumentar', nome: 'Tegumentar', titulo: 'Sistema tegumentar', cor: '#d6a88a',
  curto: 'Pele e anexos: proteção, lesões por pressão e queimaduras.',
  resumo: 'A pele é o maior órgão do corpo. Protege contra agentes externos, regula a temperatura e participa da sensibilidade. Inspecionar a pele é parte de todo cuidado de enfermagem, especialmente sobre proeminências ósseas, onde surgem as lesões por pressão.',
  funcoes: ['Barreira contra microrganismos e perda de água', 'Termorregulação', 'Sensibilidade tátil, térmica e dolorosa', 'Síntese de vitamina D', 'Proteção contra radiação UV'],
  cenas: [
    { nome: 'Pele e anexos', grupos: ['m-integumentary'], contexto: [{ nome: 'Esqueleto', grupo: 'm-skeletal' }, { nome: 'Músculos', grupo: 'm-muscular' }] },
    { nome: 'Pele (corpo feminino)', grupos: ['f-skin'], contexto: [{ nome: 'Órgãos abdominais', grupo: 'f-digestive' }] }
  ],
  chave: [
    { t: 'Pele', q: '^Pele', c: 0 }, { t: 'Cabelo', q: '^Cabelo', c: 0 }, { t: 'Lábios', q: '^Lábio', c: 0 },
    { t: 'Supercílios', q: '^Supercílio', c: 0 }, { t: 'Pele (feminino)', q: '^Pele', c: 1 }
  ],
  avaliacao: [
    'Inspecione cor, integridade, umidade, temperatura e turgor.',
    'Examine diariamente sacro, calcâneos, trocânteres, occipital, cotovelos e orelhas.',
    'Classifique o risco de lesão por pressão com a Escala de Braden.',
    'Em queimaduras, estime a superfície corporal pela regra dos nove.'
  ],
  cuidados: [
    'Reposicione o paciente acamado em intervalos regulares (frequentemente a cada 2 h, individualizado).',
    'Use superfícies de redistribuição de pressão e eleve os calcâneos.',
    'Mantenha a pele limpa e hidratada; proteja de umidade por incontinência.',
    'Injeção intradérmica a 10°–15°; subcutânea a 45° ou 90°, conforme prega e agulha.'
  ],
  valores: [
    { k: 'Escala de Braden', v: '6 a 23 (menor = maior risco)' },
    { k: 'Risco presente (adulto)', v: 'Braden ≤ 18' },
    { k: 'Regra dos nove: cabeça / cada braço', v: '9% / 9%' },
    { k: 'Tronco anterior / cada perna', v: '18% / 18%' }
  ],
  alertas: [
    'Pele íntegra com hiperemia que não embranquece à pressão é lesão por pressão estágio 1.',
    'Queimaduras de face, mãos, pés, genitais e circunferenciais exigem atenção especial.',
    'Celulite com febre e expansão rápida pode evoluir para infecção grave.'
  ],
  quiz: [
    { p: 'Na Escala de Braden, uma pontuação menor indica:', o: ['Menor risco', 'Maior risco de lesão por pressão', 'Pele normal', 'Necessidade de banho'], r: 1, e: 'A escala vai de 6 a 23; quanto menor, maior o risco.' },
    { p: 'Pela regra dos nove, quanto vale um membro inferior inteiro no adulto?', o: ['9%', '18%', '27%', '1%'], r: 1, e: 'Cada membro inferior corresponde a 18% da superfície corporal.' },
    { p: 'Qual proeminência óssea é mais acometida por lesão por pressão em pacientes em decúbito dorsal?', o: ['Joelho', 'Sacro', 'Esterno', 'Clavícula'], r: 1, e: 'Sacro e calcâneos são os locais mais frequentes em decúbito dorsal.' }
  ]
}
];
