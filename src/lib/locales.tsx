export type Locale = "en" | "pt";

export const defaultLocale: Locale = "en";

export const locales = {
  en: {
    common: {
      privacyPolicy: "Privacy policy",
      license: "License",
      contact: "Contact",
      github: "GitHub",
      email: "Email",
      poweredBy: "Powered by Ghostscript",
    },
    nav: {
      optimize: "Optimize",
      merge: "Merge",
      split: "Split",
    },
    landing: {
      title: "PDF Optimizer",
      subtitle:
        "Optimize, merge and split PDFs instantly, entirely in your browser. No uploads, no waiting, no limits.",
      optimizeTitle: "Optimize",
      optimizeDescription:
        "Reduce PDF file sizes with adjustable compression levels",
      mergeTitle: "Merge",
      mergeDescription: "Combine multiple PDFs into a single document",
      splitTitle: "Split",
      splitDescription: "Break a PDF apart into individual page files",
      openTool: "Open tool",
    },
    optimize: {
      title: "PDF Optimizer",
      subtitle:
        "Reduce PDF file sizes instantly with our advanced compression technology. Upload your PDF and choose your optimization level for the perfect balance of quality and file size.",
      uploadTitle: "Upload & optimize",
      uploadDescription:
        "Choose your PDF file and optimization level to get started",
      selectFile: "Select PDF file",
      dropzoneActive: "Drop your PDFs here...",
      dropzoneIdle: "Drop your PDFs here or click to browse",
      dropzoneHint: "Supports multiple PDF files",
      selectedFilesLabel: "Selected files",
      clearAll: "Clear all",
      optimizationLevel: "Optimization level",
      lightName: "Light compression",
      lightDescription: "Minimal compression with maximum quality retention",
      mediumName: "Medium compression",
      mediumDescription: "Balanced compression for most use cases",
      heavyName: "Heavy compression",
      heavyDescription: "Maximum compression for smallest file sizes",
      optimizePdf: "Optimize",
      optimizing: "Optimizing...",
      resultsLabel: "Optimization results",
      download: "Download",
      error: "Error",
      clearAllResults: "Clear all results",
      feature1Title: "Lightning fast",
      feature1Description:
        "Process PDFs in seconds with our optimized algorithms",
      feature2Title: "Secure & private",
      feature2Description:
        "Your files are processed securely, offline and never leave your computer",
      feature3Title: "Unlimited usage",
      feature3Description: "Optimize as many PDFs as you need, completely free",
    },
    merge: {
      title: "Merge PDFs",
      subtitle:
        "Combine multiple PDF files into a single document, entirely in your browser.",
      uploadTitle: "Upload & merge",
      uploadDescription: "Add the PDFs you want to combine, in any order",
      selectFiles: "Select PDF files",
      dropzoneActive: "Drop your PDFs here...",
      dropzoneIdle: "Drop your PDFs here or click to browse",
      dropzoneHint: "Supports multiple PDF files",
      selectedFilesLabel: "Files to merge",
      clearAll: "Clear all",
      mergeButton: "Merge PDFs",
      merging: "Merging...",
      resultLabel: "Merged PDF",
      download: "Download",
      error: "Error",
    },
    split: {
      title: "Split PDF",
      subtitle:
        "Break a PDF apart into a separate file for every page, entirely in your browser.",
      uploadTitle: "Upload & split",
      uploadDescription: "Choose the PDF file you want to split",
      selectFile: "Select PDF file",
      dropzoneActive: "Drop your PDF here...",
      dropzoneIdle: "Drop your PDF here or click to browse",
      dropzoneHint: "Supports a single PDF file",
      selectedFileLabel: "File to split",
      clearAll: "Clear all",
      splitButton: "Split PDF",
      splitting: "Splitting...",
      resultsLabel: "Pages",
      download: "Download",
      downloadZip: "Download all (.zip)",
      error: "Error",
    },
    notFound: {
      title: "404 - Page not found",
      subtitle: "The page you're looking for doesn't exist",
      description:
        "The page you requested could not be found. It may have been moved, deleted, or you entered the wrong URL.",
      backToHome: "Back to home",
      suggestion: "Try going back to the home page to optimize your PDFs.",
    },
    error: {
      title: "Oops! Something went wrong",
      subtitle: "An unexpected error occurred",
      description:
        "We're sorry, but something went wrong on our end. This might be a temporary issue.",
      tryAgain: "Try again",
      backToHome: "Back to home",
      suggestion:
        "You can try refreshing the page or go back to the home page.",
    },
    license: {
      title: "License",
      subtitle: "This software is released under the MIT License",
      backToHome: "Back to home",
      copyright: "Copyright 2025 José Francisco Ferreira Alves de Sousa",
      mitTitle: "MIT License",
      permission:
        'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:',
      conditions:
        "The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.",
      disclaimer:
        'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.',
    },
    privacy: {
      title: "Privacy policy",
      subtitle:
        "Your privacy is our top priority. Here's exactly how we protect it.",
      backToHome: "Back to home",
      lastUpdated: "Last updated",
      localProcessingTitle: "Local processing",
      localProcessingContent:
        "All PDF optimization happens directly in your browser using WebAssembly technology. Your files are processed in memory and never transmitted to any server. When you close the page, all data is automatically discarded.",
      noTrackingTitle: "No tracking",
      noTrackingContent:
        "We don't use any analytics, cookies, tracking pixels, or third-party scripts. We have no way to identify you or track your behavior across sessions. Your usage is completely anonymous.",
      noDataStorageTitle: "No data storage",
      noDataStorageContent:
        "We don't store, cache, or retain any of your files or personal information. Everything happens in your browser's temporary memory and is automatically cleared when you navigate away or close the tab.",
      openSourceTitle: "Open source",
      openSourceContent:
        "Our code is transparent and auditable. You can inspect exactly how your files are processed and verify that no data leaves your device.",
      hostingTitle: "Hosting disclosure",
      hostingContent:
        "This website is hosted on Vercel's content delivery network. While we don't collect any data about you, Vercel may collect basic analytics such as:",
      hostingList: [
        "Page views and visit counts",
        "General geographic location (country/region level)",
        "Browser type and device information",
        "Referrer information (which site you came from)",
      ],
      hostingNote:
        "Important: no file content, personal data, or detailed usage information is ever transmitted to Vercel or any other service.",
      technicalTitle: "Technical implementation",
      technicalContent: "Our PDF optimizer uses:",
      technicalList: [
        "WebAssembly for high-performance local processing",
        "Web Workers to prevent browser blocking",
        "Client-side JavaScript with no server communication",
        "Temporary blob URLs that are automatically revoked",
      ],
      contactTitle: "Questions?",
      contactContent:
        "If you have any questions about this privacy policy or our practices, you can review our open-source code or contact us:",
      contactEmail: "Email us at",
      contactGitHub: "View source code and report issues on GitHub",
    },
  },
  pt: {
    common: {
      privacyPolicy: "Política de privacidade",
      license: "Licença",
      contact: "Contacto",
      github: "GitHub",
      email: "Email",
      poweredBy: "Powered by Ghostscript",
    },
    nav: {
      optimize: "Optimizar",
      merge: "Juntar",
      split: "Dividir",
    },
    landing: {
      title: "Optimizador de PDF",
      subtitle:
        "Optimize, junte e divida PDFs instantaneamente, directamente no seu navegador. Sem envios, sem espera, sem limites.",
      optimizeTitle: "Optimizar",
      optimizeDescription:
        "Reduza o tamanho de ficheiros PDF com níveis de compressão ajustáveis",
      mergeTitle: "Juntar",
      mergeDescription: "Combine vários PDFs num único documento",
      splitTitle: "Dividir",
      splitDescription: "Separe um PDF em ficheiros individuais por página",
      openTool: "Abrir ferramenta",
    },
    optimize: {
      title: "Optimizador de PDF",
      subtitle:
        "Reduza o tamanho de ficheiros PDF instantaneamente com a nossa tecnologia de compressão avançada. Carregue o seu PDF e escolha o nível de optimização para o equilíbrio perfeito entre qualidade e tamanho do ficheiro.",
      uploadTitle: "Carregar e optimizar",
      uploadDescription:
        "Escolha o seu ficheiro PDF e o nível de optimização para começar",
      selectFile: "Selecionar ficheiro PDF",
      dropzoneActive: "Largue os seus PDFs aqui...",
      dropzoneIdle: "Largue os seus PDFs aqui ou clique para procurar",
      dropzoneHint: "Suporta vários ficheiros PDF",
      selectedFilesLabel: "Ficheiros selecionados",
      clearAll: "Limpar tudo",
      optimizationLevel: "Nível de optimização",
      lightName: "Compressão leve",
      lightDescription: "Compressão mínima com máxima retenção de qualidade",
      mediumName: "Compressão média",
      mediumDescription:
        "Compressão equilibrada para a maioria dos casos de uso",
      heavyName: "Compressão pesada",
      heavyDescription: "Compressão máxima para menores tamanhos de ficheiro",
      optimizePdf: "Optimizar",
      optimizing: "A optimizar...",
      resultsLabel: "Resultados da optimização",
      download: "Descarregar",
      error: "Erro",
      clearAllResults: "Limpar todos os resultados",
      feature1Title: "Extremamente rápido",
      feature1Description:
        "Processe PDFs em segundos com os nossos algoritmos optimizados",
      feature2Title: "Seguro e privado",
      feature2Description:
        "Os seus ficheiros são processados com segurança, offline e nunca saem do seu computador",
      feature3Title: "Utilização ilimitada",
      feature3Description:
        "Optimize quantos PDFs precisar, completamente gratuito",
    },
    merge: {
      title: "Juntar PDFs",
      subtitle:
        "Combine vários ficheiros PDF num único documento, directamente no seu navegador.",
      uploadTitle: "Carregar e juntar",
      uploadDescription:
        "Adicione os PDFs que quer combinar, pela ordem que preferir",
      selectFiles: "Selecionar ficheiros PDF",
      dropzoneActive: "Largue os seus PDFs aqui...",
      dropzoneIdle: "Largue os seus PDFs aqui ou clique para procurar",
      dropzoneHint: "Suporta vários ficheiros PDF",
      selectedFilesLabel: "Ficheiros a juntar",
      clearAll: "Limpar tudo",
      mergeButton: "Juntar PDFs",
      merging: "A juntar...",
      resultLabel: "PDF combinado",
      download: "Descarregar",
      error: "Erro",
    },
    split: {
      title: "Dividir PDF",
      subtitle:
        "Separe um PDF num ficheiro para cada página, directamente no seu navegador.",
      uploadTitle: "Carregar e dividir",
      uploadDescription: "Escolha o ficheiro PDF que quer dividir",
      selectFile: "Selecionar ficheiro PDF",
      dropzoneActive: "Largue o seu PDF aqui...",
      dropzoneIdle: "Largue o seu PDF aqui ou clique para procurar",
      dropzoneHint: "Suporta um único ficheiro PDF",
      selectedFileLabel: "Ficheiro a dividir",
      clearAll: "Limpar tudo",
      splitButton: "Dividir PDF",
      splitting: "A dividir...",
      resultsLabel: "Páginas",
      download: "Descarregar",
      downloadZip: "Descarregar tudo (.zip)",
      error: "Erro",
    },
    notFound: {
      title: "404 - Página não encontrada",
      subtitle: "A página que procura não existe",
      description:
        "A página solicitada não foi encontrada. Pode ter sido movida, eliminada, ou introduziu o URL incorrecto.",
      backToHome: "Voltar ao início",
      suggestion: "Tente voltar à página inicial para optimizar os seus PDFs.",
    },
    error: {
      title: "Ops! Algo correu mal",
      subtitle: "Ocorreu um erro inesperado",
      description:
        "Pedimos desculpa, mas algo correu mal do nosso lado. Isto pode ser um problema temporário.",
      tryAgain: "Tentar novamente",
      backToHome: "Voltar ao início",
      suggestion: "Pode tentar actualizar a página ou voltar à página inicial.",
    },
    license: {
      title: "Licença",
      subtitle: "Este software é disponibilizado sob a Licença MIT",
      backToHome: "Voltar ao início",
      copyright: "Copyright 2025 José Francisco Ferreira Alves de Sousa",
      mitTitle: "Licença MIT",
      permission:
        'É concedida permissão, gratuitamente, a qualquer pessoa que obtenha uma cópia deste software e ficheiros de documentação associados (o "Software"), para negociar no Software sem restrição, incluindo sem limitação os direitos de usar, copiar, modificar, fundir, publicar, distribuir, sublicenciar, e/ou vender cópias do Software, e permitir às pessoas a quem o Software é fornecido fazê-lo, sujeito às seguintes condições:',
      conditions:
        "O aviso de copyright acima e este aviso de permissão devem ser incluídos em todas as cópias ou partes substanciais do Software.",
      disclaimer:
        'O SOFTWARE É FORNECIDO "COMO ESTÁ", SEM GARANTIA DE QUALQUER TIPO, EXPRESSA OU IMPLÍCITA, INCLUINDO MAS NÃO LIMITADO ÀS GARANTIAS DE COMERCIALIZAÇÃO, ADEQUAÇÃO A UM PROPÓSITO PARTICULAR E NÃO VIOLAÇÃO. EM CASO ALGUM OS AUTORES OU DETENTORES DE DIREITOS AUTORAIS SERÃO RESPONSÁVEIS POR QUALQUER RECLAMAÇÃO, DANOS OU OUTRA RESPONSABILIDADE, SEJA NUMA ACÇÃO DE CONTRATO, DELITO OU OUTRA, DECORRENTE DE, FORA DE OU EM CONEXÃO COM O SOFTWARE OU O USO OU OUTRAS NEGOCIAÇÕES NO SOFTWARE.',
    },
    privacy: {
      title: "Política de privacidade",
      subtitle:
        "A sua privacidade é a nossa prioridade máxima. Aqui está exactamente como a protegemos.",
      backToHome: "Voltar ao início",
      lastUpdated: "Última actualização",
      localProcessingTitle: "Processamento local",
      localProcessingContent:
        "Toda a optimização de PDF acontece directamente no seu navegador usando tecnologia WebAssembly. Os seus ficheiros são processados na memória e nunca transmitidos para qualquer servidor. Quando fecha a página, todos os dados são automaticamente descartados.",
      noTrackingTitle: "Sem rastreamento",
      noTrackingContent:
        "Não usamos análises, cookies, pixels de rastreamento ou scripts de terceiros. Não temos forma de o identificar ou rastrear o seu comportamento entre sessões. A sua utilização é completamente anónima.",
      noDataStorageTitle: "Sem armazenamento de dados",
      noDataStorageContent:
        "Não armazenamos, guardamos em cache ou retemos nenhum dos seus ficheiros ou informações pessoais. Tudo acontece na memória temporária do seu navegador e é automaticamente limpo quando navega para outro lado ou fecha o separador.",
      openSourceTitle: "Código aberto",
      openSourceContent:
        "O nosso código é transparente e auditável. Pode inspecionar exatamente como os seus ficheiros são processados e verificar que nenhum dado sai do seu dispositivo.",
      hostingTitle: "Divulgação de hospedagem",
      hostingContent:
        "Este sítio web está alojado na rede de distribuição de conteúdo da Vercel. Embora não recolhamos dados sobre si, a Vercel pode recolher análises básicas como:",
      hostingList: [
        "Visualizações de página e contagens de visitas",
        "Localização geográfica geral (nível país/região)",
        "Tipo de navegador e informações do dispositivo",
        "Informações de referência (de que sítio veio)",
      ],
      hostingNote:
        "Importante: nenhum conteúdo de ficheiro, dados pessoais ou informações detalhadas de utilização são transmitidos para a Vercel ou qualquer outro serviço.",
      technicalTitle: "Implementação técnica",
      technicalContent: "O nosso optimizador de PDF usa:",
      technicalList: [
        "WebAssembly para processamento local de alto desempenho",
        "Web Workers para prevenir bloqueio do navegador",
        "JavaScript do lado do cliente sem comunicação com servidor",
        "URLs blob temporários que são automaticamente revogados",
      ],
      contactTitle: "Questões?",
      contactContent:
        "Se tiver questões sobre esta política de privacidade ou as nossas práticas, pode rever o nosso código open-source ou contactar-nos:",
      contactEmail: "Envie-nos um email",
      contactGitHub: "Veja o código-fonte e reporte problemas no GitHub",
    },
  },
} as const;
