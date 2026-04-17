const makeBuildExercise = (id, instruction, prompt, sourceItems, solution, successMessage) => ({
  id,
  type: 'drag-drop-build',
  instruction,
  prompt,
  sourceItems,
  solution,
  successMessage,
});

const makeMatchExercise = (id, instruction, pairs, successMessage) => ({
  id,
  type: 'drag-drop-match',
  instruction,
  pairs,
  successMessage,
});

const makeFillExercise = (id, instruction, template, options, answers, successMessage) => ({
  id,
  type: 'fill-blank',
  instruction,
  template,
  options,
  answers,
  successMessage,
});

const makeVisualExercise = (id, instruction, promptTag, scene, areas, successMessage) => ({
  id,
  type: 'visual-identify',
  instruction,
  promptTag,
  scene,
  areas,
  successMessage,
});

const chapters = [
  {
    id: 1,
    slug: 'introducao-internet',
    title: 'Introducao a Internet',
    emoji: '🌐',
    color: '#4F46E5',
    forInterpreter:
      'Explique que a internet e uma grande rede. Muitos computadores, celulares e tablets ficam ligados entre si. Quando uma pessoa pede uma informacao, essa rede ajuda a entregar a resposta.',
    forElisa: {
      headline: 'Internet liga o mundo',
      description:
        'Celulares e computadores se conectam. Informacoes viajam por essa rede.',
      metaphorImage: 'network-web',
      metaphorAlt: 'Desenho de varios aparelhos ligados por linhas azuis.',
    },
    concepts: [
      {
        tag: null,
        name: 'Rede gigante',
        description:
          'A internet conecta aparelhos como uma teia que ajuda pessoas a trocar mensagens, videos e paginas.',
        visualExample: '📱──💻──🖥️──📲',
        renderPreview: false,
      },
      {
        tag: null,
        name: 'Informacao viajando',
        description:
          'Quando abrimos um site, um pedido sai do aparelho e volta com uma resposta.',
        visualExample: 'Pedido ➜ Internet ➜ Resposta',
        renderPreview: false,
      },
    ],
    exercises: [
      makeMatchExercise(
        'ex-1-1',
        'Ligue a ideia ao desenho certo.',
        [
          { id: 'rede', label: 'Internet', preview: '🌐 Rede que conecta aparelhos' },
          { id: 'pedido', label: 'Pedido', preview: '📨 Mensagem saindo do aparelho' },
          { id: 'resposta', label: 'Resposta', preview: '📦 Pagina chegando na tela' },
        ],
        'Muito bem! Voce reconheceu o caminho da informacao.',
      ),
      makeVisualExercise(
        'ex-1-2',
        'Toque onde esta a internet ligando tudo.',
        'Internet',
        {
          title: 'Mapa simples da rede',
          subtitle: 'Toque na parte certa.',
        },
        [
          { id: 'phone', label: 'Celular', isCorrect: false, x: 8, y: 34, w: 20, h: 26, emoji: '📱' },
          { id: 'network', label: 'Internet', isCorrect: true, x: 34, y: 20, w: 32, h: 46, emoji: '🌐' },
          { id: 'computer', label: 'Computador', isCorrect: false, x: 72, y: 34, w: 20, h: 26, emoji: '💻' },
        ],
        'Isso! A internet e a ligacao entre os aparelhos.',
      ),
    ],
  },
  {
    id: 2,
    slug: 'introducao-paginas-internet',
    title: 'Introducao as Paginas',
    emoji: '📄',
    color: '#2563EB',
    forInterpreter:
      'Explique que uma pagina de internet e como uma folha digital. Ela fica guardada em um computador especial chamado servidor. O navegador pede essa pagina e mostra para a pessoa.',
    forElisa: {
      headline: 'Pagina mora no servidor',
      description:
        'O navegador pede a pagina. O servidor manda a pagina de volta.',
      metaphorImage: 'book-vs-site',
      metaphorAlt: 'Uma pagina de livro ao lado de uma pagina de site na tela.',
    },
    concepts: [
      {
        tag: null,
        name: 'Navegador pede',
        description: 'O navegador e o app que busca a pagina, como Safari ou Chrome.',
        visualExample: 'Navegador ➜ pedido',
        renderPreview: false,
      },
      {
        tag: null,
        name: 'Servidor envia',
        description: 'O servidor guarda o site e devolve a pagina pronta para aparecer.',
        visualExample: 'Servidor ➜ pagina',
        renderPreview: false,
      },
    ],
    exercises: [
      makeBuildExercise(
        'ex-2-1',
        'Monte a ordem da viagem da pagina.',
        'O que acontece primeiro e depois?',
        ['Servidor', 'Pagina', 'Navegador', 'Pedido'],
        ['Navegador', 'Pedido', 'Servidor', 'Pagina'],
        'Boa! O navegador pediu e a pagina voltou.',
      ),
      makeMatchExercise(
        'ex-2-2',
        'Ligue o nome ao papel correto.',
        [
          { id: 'nav', label: 'Navegador', preview: '🧭 App que abre sites' },
          { id: 'serv', label: 'Servidor', preview: '🏠 Lugar onde a pagina fica guardada' },
          { id: 'page', label: 'Pagina', preview: '📄 Folha digital mostrada na tela' },
        ],
        'Muito bom! Cada parte encontrou seu lugar.',
      ),
    ],
  },
  {
    id: 3,
    slug: 'introducao-tags-html',
    title: 'Introducao as Tags HTML',
    emoji: '🏷️',
    color: '#0EA5E9',
    forInterpreter:
      'Tags sao etiquetas. Elas dizem ao navegador o que cada parte do conteudo e. Mostre a diferenca entre abrir, colocar conteudo no meio e fechar. Mostre tambem que algumas tags se fecham sozinhas.',
    forElisa: {
      headline: 'Tag abre e fecha',
      description:
        'A tag mostra o papel do conteudo. Algumas tags fecham sozinhas.',
      metaphorImage: 'tag-label',
      metaphorAlt: 'Etiqueta colada em uma caixa com texto colorido.',
    },
    concepts: [
      {
        tag: '<tag>',
        name: 'Abertura e fechamento',
        description: 'A abertura comeca. O fechamento termina. O conteudo fica no meio.',
        visualExample: '<tag>conteudo</tag>',
        renderPreview: false,
      },
      {
        tag: '<img />',
        name: 'Auto-fechante',
        description: 'Algumas tags fazem o trabalho em uma parte so, como imagem.',
        visualExample: '<img src="foto.jpg" alt="Foto" />',
        renderPreview: false,
      },
    ],
    exercises: [
      makeBuildExercise(
        'ex-3-1',
        'Monte uma tag completa.',
        'Arraste as pecas para formar uma etiqueta correta.',
        ['</p>', '<p>', 'Ola!', '<br />'],
        ['<p>', 'Ola!', '</p>'],
        'Perfeito! A tag abriu, mostrou o conteudo e fechou.',
      ),
      makeFillExercise(
        'ex-3-2',
        'Complete a anatomia da tag.',
        [
          { type: 'text', value: '<' },
          { type: 'blank', id: 'b1' },
          { type: 'text', value: '>' },
          { type: 'text', value: 'texto' },
          { type: 'text', value: '</' },
          { type: 'blank', id: 'b2' },
          { type: 'text', value: '>' },
        ],
        ['h1', 'h1', 'body'],
        { b1: 'h1', b2: 'h1' },
        'Isso! O nome da tag precisa combinar na abertura e no fechamento.',
      ),
    ],
  },
  {
    id: 4,
    slug: 'tags-principais-estrutura',
    title: 'Tags Principais',
    emoji: '🏠',
    color: '#6366F1',
    forInterpreter:
      'Use a metafora da casa. html e a casa toda. head e a parte invisivel que organiza. title e a plaquinha na porta. body e tudo que a pessoa ve por dentro.',
    forElisa: {
      headline: 'A casa da pagina',
      description:
        'Cada tag cuida de uma parte da casa. O body mostra o que aparece.',
      metaphorImage: 'html-house',
      metaphorAlt: 'Casa colorida com fundacao, plaquinha e comodos internos.',
    },
    concepts: [
      {
        tag: '<html>',
        name: 'A casa inteira',
        description: 'Guarda tudo que pertence ao documento.',
        visualExample: '<html><head></head><body></body></html>',
        renderPreview: false,
      },
      {
        tag: '<head>',
        name: 'Parte invisivel',
        description: 'Guarda informacoes para o navegador, nao para a pessoa ver.',
        visualExample: '<head><title>Meu Site</title></head>',
        renderPreview: false,
      },
      {
        tag: '<title>',
        name: 'Nome da aba',
        description: 'Mostra o nome da pagina na aba do navegador.',
        visualExample: '<title>Loja da Elisa</title>',
        renderPreview: false,
      },
      {
        tag: '<body>',
        name: 'Parte visivel',
        description: 'Tudo que aparece na tela fica aqui.',
        visualExample: '<body><h1>Ola</h1><p>Bem-vinda</p></body>',
        renderPreview: true,
      },
    ],
    exercises: [
      makeFillExercise(
        'ex-4-1',
        'Complete o esqueleto da pagina.',
        [
          { type: 'text', value: '<' },
          { type: 'blank', id: 'b1' },
          { type: 'text', value: '><head><title>Meu Site</title></head><' },
          { type: 'blank', id: 'b2' },
          { type: 'text', value: '><h1>Ola</h1></' },
          { type: 'blank', id: 'b3' },
          { type: 'text', value: '></' },
          { type: 'blank', id: 'b4' },
          { type: 'text', value: '>' },
        ],
        ['html', 'body', 'body', 'html', 'title'],
        { b1: 'html', b2: 'body', b3: 'body', b4: 'html' },
        'Muito bem! A estrutura da casa ficou completa.',
      ),
      makeVisualExercise(
        'ex-4-2',
        'Toque na parte que a pessoa ve na pagina.',
        '<body>',
        {
          title: 'Casa do HTML',
          subtitle: 'Qual area e o body?',
        },
        [
          { id: 'head', label: 'Head', isCorrect: false, x: 10, y: 10, w: 80, h: 16, emoji: '🧱' },
          { id: 'title', label: 'Title', isCorrect: false, x: 32, y: 29, w: 36, h: 12, emoji: '🏷️' },
          { id: 'body', label: 'Body', isCorrect: true, x: 12, y: 47, w: 76, h: 36, emoji: '🛋️' },
        ],
        'Certo! O body e a parte visivel da pagina.',
      ),
    ],
  },
  {
    id: 5,
    slug: 'tags-semanticas',
    title: 'Tags Semanticas',
    emoji: '🧩',
    color: '#7C3AED',
    forInterpreter:
      'Mostre que tags semanticas organizam a pagina como comodos e setores. Cada uma ajuda a entender o papel daquela area: topo, menu, conteudo principal, lateral e rodape.',
    forElisa: {
      headline: 'Cada area tem nome',
      description:
        'A pagina fica organizada. Cada parte tem um trabalho.',
      metaphorImage: 'house-layout',
      metaphorAlt: 'Mapa de uma casa vista de cima com setores coloridos.',
    },
    concepts: [
      {
        tag: '<header>',
        name: 'Topo da pagina',
        description: 'Cabecalho com nome, logo ou apresentacao.',
        visualExample: '<header><h1>Meu Blog</h1></header>',
        renderPreview: true,
      },
      {
        tag: '<nav>',
        name: 'Menu',
        description: 'Area com links para navegar.',
        visualExample: '<nav><a href="#">Inicio</a></nav>',
        renderPreview: true,
      },
      {
        tag: '<main>',
        name: 'Conteudo principal',
        description: 'Parte mais importante da pagina.',
        visualExample: '<main><article>Noticia</article></main>',
        renderPreview: true,
      },
      {
        tag: '<footer>',
        name: 'Rodape',
        description: 'Parte final com informacoes extras.',
        visualExample: '<footer>Contato</footer>',
        renderPreview: true,
      },
    ],
    exercises: [
      makeMatchExercise(
        'ex-5-1',
        'Ligue a tag a sua funcao.',
        [
          { id: 'header', label: '<header>', preview: '🏁 Topo da pagina' },
          { id: 'nav', label: '<nav>', preview: '🧭 Menu com caminhos' },
          { id: 'main', label: '<main>', preview: '⭐ Conteudo principal' },
          { id: 'footer', label: '<footer>', preview: '📌 Parte final da pagina' },
        ],
        'Boa! As areas da pagina ficaram bem organizadas.',
      ),
      makeVisualExercise(
        'ex-5-2',
        'Toque no menu da pagina.',
        '<nav>',
        {
          title: 'Maquete de site',
          subtitle: 'Onde fica o menu?',
        },
        [
          { id: 'header', label: 'Header', isCorrect: false, x: 8, y: 8, w: 84, h: 18, emoji: '🏁' },
          { id: 'nav', label: 'Nav', isCorrect: true, x: 8, y: 29, w: 84, h: 14, emoji: '🧭' },
          { id: 'main', label: 'Main', isCorrect: false, x: 8, y: 47, w: 56, h: 34, emoji: '📘' },
          { id: 'aside', label: 'Aside', isCorrect: false, x: 68, y: 47, w: 24, h: 34, emoji: '📝' },
          { id: 'footer', label: 'Footer', isCorrect: false, x: 8, y: 84, w: 84, h: 10, emoji: '📌' },
        ],
        'Isso! O nav guarda os caminhos do site.',
      ),
    ],
  },
  {
    id: 6,
    slug: 'titulos-cabecalhos',
    title: 'Titulos h1 a h6',
    emoji: '📰',
    color: '#0284C7',
    forInterpreter:
      'Compare com um jornal. h1 e o titulo principal, maior. h2, h3 e os demais vao diminuindo. Diga tambem que normalmente usamos um h1 principal por pagina.',
    forElisa: {
      headline: 'Titulos tem tamanhos',
      description:
        'O titulo principal e o maior. Os outros ajudam a organizar.',
      metaphorImage: 'newspaper-headings',
      metaphorAlt: 'Titulos de jornal com tamanhos diferentes.',
    },
    concepts: [
      {
        tag: '<h1>',
        name: 'Titulo principal',
        description: 'E o maior destaque da pagina.',
        visualExample: '<h1>Titulo grande</h1>',
        renderPreview: true,
      },
      {
        tag: '<h2> ate <h6>',
        name: 'Subtitulos',
        description: 'Ajudam a dividir o conteudo em partes.',
        visualExample: '<h2>Parte 1</h2><h3>Detalhe</h3>',
        renderPreview: true,
      },
    ],
    exercises: [
      makeMatchExercise(
        'ex-6-1',
        'Ligue cada tag ao tamanho certo.',
        [
          { id: 'h1', label: '<h1>', preview: 'TITULO MUITO GRANDE' },
          { id: 'h3', label: '<h3>', preview: 'Titulo medio' },
          { id: 'h6', label: '<h6>', preview: 'titulo pequeno' },
        ],
        'Muito bom! Os tamanhos dos titulos fazem sentido para voce.',
      ),
      makeBuildExercise(
        'ex-6-2',
        'Monte um titulo principal.',
        'Use a tag certa para o maior titulo da pagina.',
        ['</h1>', '<h1>', 'Receita de Suco', '<h4>'],
        ['<h1>', 'Receita de Suco', '</h1>'],
        'Perfeito! Esse e um bom titulo principal.',
      ),
    ],
  },
  {
    id: 7,
    slug: 'paragrafo-quebra-linha',
    title: 'Paragrafo e Quebra',
    emoji: '📚',
    color: '#0EA5E9',
    forInterpreter:
      'Explique que p cria um bloco de texto. Ja br quebra a linha sem criar um novo paragrafo. Compare com apertar Enter uma vez e comecar outro bloco de texto.',
    forElisa: {
      headline: 'Texto em bloco ou linha',
      description:
        'Paragrafo cria um bloco. br so muda de linha.',
      metaphorImage: 'book-paragraph',
      metaphorAlt: 'Pagina de livro com blocos de texto e uma quebra de linha.',
    },
    concepts: [
      {
        tag: '<p>',
        name: 'Paragrafo',
        description: 'Organiza frases em um bloco de texto.',
        visualExample: '<p>Hoje aprendi HTML.</p>',
        renderPreview: true,
      },
      {
        tag: '<br />',
        name: 'Quebra de linha',
        description: 'Move o texto para baixo sem criar novo paragrafo.',
        visualExample: 'Oi<br />Tudo bem?',
        renderPreview: true,
      },
    ],
    exercises: [
      makeMatchExercise(
        'ex-7-1',
        'Ligue a tag ao resultado.',
        [
          { id: 'p', label: '<p>', preview: '📘 Bloco de texto' },
          { id: 'br', label: '<br />', preview: '↩️ Texto vai para a linha de baixo' },
        ],
        'Boa! Agora voce sabe a diferenca entre bloco e quebra.',
      ),
      makeFillExercise(
        'ex-7-2',
        'Complete o codigo para quebrar a linha.',
        [
          { type: 'text', value: 'Bom dia<' },
          { type: 'blank', id: 'b1' },
          { type: 'text', value: ' />Elisa' },
        ],
        ['p', 'br', 'h1'],
        { b1: 'br' },
        'Isso! br leva o texto para a linha de baixo.',
      ),
    ],
  },
  {
    id: 8,
    slug: 'formatacao-texto',
    title: 'Formatacao de Texto',
    emoji: '✨',
    color: '#EC4899',
    forInterpreter:
      'Mostre que b destaca com negrito, i cria enfase em italico e u sublinha. Diga que sublinhado deve ser usado com cuidado porque pode parecer link.',
    forElisa: {
      headline: 'Texto pode ganhar destaque',
      description:
        'Negrito chama atencao. Italico muda o jeito visual. Sublinhado pede cuidado.',
      metaphorImage: 'text-style',
      metaphorAlt: 'Frase com trechos em negrito, italico e sublinhado.',
    },
    concepts: [
      {
        tag: '<b>',
        name: 'Negrito',
        description: 'Destaca uma palavra importante.',
        visualExample: '<b>Importante</b>',
        renderPreview: true,
      },
      {
        tag: '<i>',
        name: 'Italico',
        description: 'Deixa o texto inclinado, como enfase.',
        visualExample: '<i>Titulo de filme</i>',
        renderPreview: true,
      },
      {
        tag: '<u>',
        name: 'Sublinhado',
        description: 'Cria uma linha embaixo do texto.',
        visualExample: '<u>Aviso</u>',
        renderPreview: true,
      },
    ],
    exercises: [
      makeBuildExercise(
        'ex-8-1',
        'Monte um texto em negrito.',
        'Qual codigo deixa a frase em destaque?',
        ['</b>', '<b>', 'Ola mundo', '<i>'],
        ['<b>', 'Ola mundo', '</b>'],
        'Muito bem! O texto ficou em negrito.',
      ),
      makeMatchExercise(
        'ex-8-2',
        'Ligue a tag ao estilo visual.',
        [
          { id: 'b', label: '<b>', preview: '**Texto forte**' },
          { id: 'i', label: '<i>', preview: '/Texto inclinado/' },
          { id: 'u', label: '<u>', preview: 'Texto com linha embaixo' },
        ],
        'Perfeito! Cada estilo visual encontrou sua tag.',
      ),
    ],
  },
  {
    id: 9,
    slug: 'listas',
    title: 'Listas',
    emoji: '📝',
    color: '#F59E0B',
    forInterpreter:
      'Use exemplos do dia a dia. ul parece lista de compras, sem ordem. ol mostra passos, com numeros. li e cada item que entra dentro da lista.',
    forElisa: {
      headline: 'Lista com bolinha ou numero',
      description:
        'ul nao tem ordem. ol mostra uma sequencia.',
      metaphorImage: 'shopping-list',
      metaphorAlt: 'Lista de compras e lista de passos lado a lado.',
    },
    concepts: [
      {
        tag: '<ul>',
        name: 'Lista sem ordem',
        description: 'Boa para reunir itens sem sequencia.',
        visualExample: '<ul><li>Maca</li><li>Banana</li></ul>',
        renderPreview: true,
      },
      {
        tag: '<ol>',
        name: 'Lista com ordem',
        description: 'Boa para mostrar etapas em sequencia.',
        visualExample: '<ol><li>Lavar</li><li>Cortar</li></ol>',
        renderPreview: true,
      },
      {
        tag: '<li>',
        name: 'Item da lista',
        description: 'Cada linha da lista usa li.',
        visualExample: '<li>Leite</li>',
        renderPreview: true,
      },
    ],
    exercises: [
      makeMatchExercise(
        'ex-9-1',
        'Ligue a tag ao exemplo certo.',
        [
          { id: 'ul', label: '<ul>', preview: '• banana • maca • uva' },
          { id: 'ol', label: '<ol>', preview: '1. lavar 2. cortar 3. beber' },
          { id: 'li', label: '<li>', preview: 'Um item dentro da lista' },
        ],
        'Boa! As listas ficaram claras.',
      ),
      makeFillExercise(
        'ex-9-2',
        'Complete o item da lista.',
        [
          { type: 'text', value: '<ul><' },
          { type: 'blank', id: 'b1' },
          { type: 'text', value: '>Maca</' },
          { type: 'blank', id: 'b2' },
          { type: 'text', value: '></ul>' },
        ],
        ['li', 'li', 'ol'],
        { b1: 'li', b2: 'li' },
        'Isso! Cada item da lista usa li.',
      ),
    ],
  },
  {
    id: 10,
    slug: 'links',
    title: 'Links',
    emoji: '🔗',
    color: '#10B981',
    forInterpreter:
      'Explique que a tag a cria um caminho clicavel. href e o endereco para onde vamos. target="_blank" abre outra aba, como outra janela.',
    forElisa: {
      headline: 'Link leva para outro lugar',
      description:
        'O link e um caminho clicavel. href mostra o destino.',
      metaphorImage: 'door-link',
      metaphorAlt: 'Porta com seta apontando para outro lugar.',
    },
    concepts: [
      {
        tag: '<a>',
        name: 'Link clicavel',
        description: 'Leva a pessoa para outra pagina ou outro lugar.',
        visualExample:
          '<a href="https://exemplo.com" target="_blank">Abrir site</a>',
        renderPreview: true,
      },
      {
        tag: 'href',
        name: 'Endereco do link',
        description: 'Mostra para onde o caminho vai levar.',
        visualExample: 'href="https://exemplo.com"',
        renderPreview: false,
      },
    ],
    exercises: [
      makeBuildExercise(
        'ex-10-1',
        'Monte um link simples.',
        'Arraste as pecas para criar um caminho clicavel.',
        ['Clique aqui', '</a>', '<a href="https://site.com">', '<p>'],
        ['<a href="https://site.com">', 'Clique aqui', '</a>'],
        'Perfeito! Esse texto agora vira link.',
      ),
      makeMatchExercise(
        'ex-10-2',
        'Ligue o atributo ao significado.',
        [
          { id: 'href', label: 'href', preview: '🏠 Endereco do destino' },
          { id: 'target', label: 'target="_blank"', preview: '🪟 Abre em nova aba' },
          { id: 'a', label: '<a>', preview: '🔗 Cria o link clicavel' },
        ],
        'Muito bem! O link ficou completo.',
      ),
    ],
  },
  {
    id: 11,
    slug: 'imagens',
    title: 'Imagens',
    emoji: '🖼️',
    color: '#8B5CF6',
    forInterpreter:
      'Explique que img coloca uma foto na pagina e se fecha sozinha. src aponta onde a imagem esta guardada. alt descreve a imagem para acessibilidade ou quando ela nao carrega. figure ajuda a juntar imagem e legenda.',
    forElisa: {
      headline: 'Imagem tambem tem texto',
      description:
        'A foto usa src. O alt ajuda quando a foto nao aparece.',
      metaphorImage: 'photo-frame',
      metaphorAlt: 'Porta-retrato com legenda abaixo.',
    },
    concepts: [
      {
        tag: '<img />',
        name: 'Imagem na pagina',
        description: 'Mostra uma foto usando src e alt.',
        visualExample:
          '<img src="https://placehold.co/240x140" alt="Flor roxa" />',
        renderPreview: true,
      },
      {
        tag: '<figure>',
        name: 'Imagem com legenda',
        description: 'Agrupa a imagem com texto de apoio.',
        visualExample:
          '<figure><img src="https://placehold.co/180x100" alt="Gato sentado" /><figcaption>Gato calmo</figcaption></figure>',
        renderPreview: true,
      },
    ],
    exercises: [
      makeFillExercise(
        'ex-11-1',
        'Complete a tag da imagem.',
        [
          { type: 'text', value: '<img ' },
          { type: 'blank', id: 'b1' },
          { type: 'text', value: '="foto.png" ' },
          { type: 'blank', id: 'b2' },
          { type: 'text', value: '="Menina sorrindo" />' },
        ],
        ['src', 'alt', 'href'],
        { b1: 'src', b2: 'alt' },
        'Boa! A imagem tem caminho e texto alternativo.',
      ),
      makeMatchExercise(
        'ex-11-2',
        'Ligue o nome ao papel certo.',
        [
          { id: 'img', label: '<img />', preview: '🖼️ Coloca a imagem' },
          { id: 'src', label: 'src', preview: '📍 Endereco da foto' },
          { id: 'alt', label: 'alt', preview: '💬 Texto para acessibilidade' },
          { id: 'figure', label: '<figure>', preview: '🧾 Junta foto e legenda' },
        ],
        'Isso! Acessibilidade faz parte da imagem.',
      ),
    ],
  },
  {
    id: 12,
    slug: 'tabelas',
    title: 'Tabelas',
    emoji: '📊',
    color: '#EF4444',
    forInterpreter:
      'Comece pela ideia de grade com linhas e colunas. Depois mostre que table guarda tudo, tr e a linha, th e cabecalho, td e dado. Explique thead, tbody e tfoot como partes da tabela.',
    forElisa: {
      headline: 'Tabela organiza em grade',
      description:
        'Linhas e colunas guardam dados. Cada tag cuida de uma parte.',
      metaphorImage: 'table-grid',
      metaphorAlt: 'Tabela simples com cabecalho, corpo e rodape.',
    },
    concepts: [
      {
        tag: '<table>',
        name: 'Tabela inteira',
        description: 'Guarda toda a grade.',
        visualExample:
          '<table><tr><th>Nome</th><th>Nota</th></tr><tr><td>Ana</td><td>9</td></tr></table>',
        renderPreview: true,
      },
      {
        tag: '<thead> <tbody> <tfoot>',
        name: 'Partes da tabela',
        description: 'Cabecalho, corpo e rodape ajudam a organizar.',
        visualExample:
          '<table><thead><tr><th>Fruta</th></tr></thead><tbody><tr><td>Maca</td></tr></tbody><tfoot><tr><td>Total: 1</td></tr></tfoot></table>',
        renderPreview: true,
      },
      {
        tag: 'colspan / rowspan',
        name: 'Celulas mescladas',
        description: 'Uma celula pode ocupar mais espaco.',
        visualExample:
          '<table><tr><th colspan="2">Boletim</th></tr><tr><td>Nome</td><td>Nota</td></tr></table>',
        renderPreview: true,
      },
    ],
    exercises: [
      makeMatchExercise(
        'ex-12-1',
        'Ligue a tag a sua funcao na tabela.',
        [
          { id: 'tr', label: '<tr>', preview: '↔️ Uma linha da tabela' },
          { id: 'th', label: '<th>', preview: '🔠 Cabecalho da coluna' },
          { id: 'td', label: '<td>', preview: '🔢 Dado da tabela' },
          { id: 'tbody', label: '<tbody>', preview: '📦 Corpo com os dados' },
        ],
        'Boa! A tabela esta ficando clara.',
      ),
      makeFillExercise(
        'ex-12-2',
        'Complete a linha da tabela.',
        [
          { type: 'text', value: '<table><tr><' },
          { type: 'blank', id: 'b1' },
          { type: 'text', value: '>Nome</' },
          { type: 'blank', id: 'b2' },
          { type: 'text', value: '><' },
          { type: 'blank', id: 'b3' },
          { type: 'text', value: '>Elisa</' },
          { type: 'blank', id: 'b4' },
          { type: 'text', value: '></tr></table>' },
        ],
        ['th', 'th', 'td', 'td', 'tr'],
        { b1: 'th', b2: 'th', b3: 'td', b4: 'td' },
        'Muito bem! Cabecalho e dado ficaram certos.',
      ),
    ],
  },
  {
    id: 13,
    slug: 'formularios',
    title: 'Formularios',
    emoji: '📨',
    color: '#14B8A6',
    forInterpreter:
      'Use a ideia de formulario como envelope de respostas. form guarda tudo. label diz o nome do campo. input muda conforme o tipo. textarea aceita texto maior. select e option criam uma lista de escolha.',
    forElisa: {
      headline: 'Formulario guarda respostas',
      description:
        'Cada campo recebe uma informacao. O botao envia o formulario.',
      metaphorImage: 'form-envelope',
      metaphorAlt: 'Envelope com campos de nome, email e mensagem.',
    },
    concepts: [
      {
        tag: '<form>',
        name: 'Envelope do formulario',
        description: 'Reune todos os campos e botoes.',
        visualExample:
          '<form><label for="nome">Nome</label><input id="nome" type="text" placeholder="Seu nome" /></form>',
        renderPreview: true,
      },
      {
        tag: '<input>',
        name: 'Campo de entrada',
        description: 'Pode receber texto, email, senha e outros tipos.',
        visualExample:
          '<input type="email" name="email" placeholder="voce@email.com" required />',
        renderPreview: true,
      },
      {
        tag: '<textarea> e <select>',
        name: 'Campos maiores e escolhas',
        description: 'textarea recebe texto longo. select mostra opcoes.',
        visualExample:
          '<textarea placeholder="Escreva aqui"></textarea><select><option>Chocolate</option><option>Morango</option></select>',
        renderPreview: true,
      },
    ],
    exercises: [
      makeMatchExercise(
        'ex-13-1',
        'Ligue a tag ao resultado visual.',
        [
          { id: 'input', label: '<input type="text" />', preview: '⌨️ Campo pequeno para digitar' },
          { id: 'textarea', label: '<textarea>', preview: '📝 Caixa grande de texto' },
          { id: 'select', label: '<select>', preview: '🍦 Lista para escolher uma opcao' },
          { id: 'submit', label: 'type="submit"', preview: '📨 Botao de enviar' },
        ],
        'Muito bem! Os campos do formulario fazem sentido.',
      ),
      makeFillExercise(
        'ex-13-2',
        'Complete o campo com label.',
        [
          { type: 'text', value: '<label for="email">Email</label><' },
          { type: 'blank', id: 'b1' },
          { type: 'text', value: ' id="email" type="email" ' },
          { type: 'blank', id: 'b2' },
          { type: 'text', value: '="Digite seu email" required />' },
        ],
        ['input', 'placeholder', 'name'],
        { b1: 'input', b2: 'placeholder' },
        'Boa! O campo esta pronto para receber email.',
      ),
    ],
  },
];

export default chapters;
