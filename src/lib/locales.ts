export type Locale = "en" | "pt";

export const defaultLocale: Locale = "en";

export const locales = {
  en: {
    home: {
      title: "PDF Optimizer",
      subtitle:
        "Reduce PDF file sizes instantly with our advanced compression technology. Upload your PDF and choose your optimization level for the perfect balance of quality and file size.",
      uploadTitle: "Upload & Optimize",
      uploadDescription:
        "Choose your PDF file and optimization level to get started",
      selectFile: "Select PDF File",
      selectedFile: "Selected file",
      optimizationLevel: "Optimization Level",
      lightName: "Light Compression",
      lightDescription: "Minimal compression with maximum quality retention",
      mediumName: "Medium Compression",
      mediumDescription: "Balanced compression for most use cases",
      heavyName: "Heavy Compression",
      heavyDescription: "Maximum compression for smallest file sizes",
      optimizePdf: "Optimize PDF",
      optimizing: "Optimizing...",
      downloadOptimized: "Download Optimized PDF",
      feature1Title: "Lightning Fast",
      feature1Description:
        "Process PDFs in seconds with our optimized algorithms",
      feature2Title: "Secure & Private",
      feature2Description: "Your files are processed securely and never stored",
      feature3Title: "Unlimited Usage",
      feature3Description: "Optimize as many PDFs as you need, completely free",
      privacyPolicy: "Privacy Policy",
      poweredBy: "Powered by Ghostscript",
    },
    privacy: {
      title: "Privacy Policy",
      subtitle:
        "Your privacy is our top priority. Here's exactly how we protect it.",
      backToHome: "Back to Home",
      lastUpdated: "Last updated",
      localProcessingTitle: "Local Processing",
      localProcessingContent:
        "All PDF optimization happens directly in your browser using WebAssembly technology. Your files are processed in memory and never transmitted to any server. When you close the page, all data is automatically discarded.",
      noTrackingTitle: "No Tracking",
      noTrackingContent:
        "We don't use any analytics, cookies, tracking pixels, or third-party scripts. We have no way to identify you or track your behavior across sessions. Your usage is completely anonymous.",
      noDataStorageTitle: "No Data Storage",
      noDataStorageContent:
        "We don't store, cache, or retain any of your files or personal information. Everything happens in your browser's temporary memory and is automatically cleared when you navigate away or close the tab.",
      openSourceTitle: "Open Source",
      openSourceContent:
        "Our code is transparent and auditable. You can inspect exactly how your files are processed and verify that no data leaves your device.",
      hostingTitle: "Hosting Disclosure",
      hostingContent:
        "This website is hosted on Vercel's content delivery network. While we don't collect any data about you, Vercel may collect basic analytics such as:",
      hostingList: [
        "Page views and visit counts",
        "General geographic location (country/region level)",
        "Browser type and device information",
        "Referrer information (which site you came from)",
      ],
      hostingNote:
        "Important: No file content, personal data, or detailed usage information is ever transmitted to Vercel or any other service.",
      technicalTitle: "Technical Implementation",
      technicalContent: "Our PDF optimizer uses:",
      technicalList: [
        "WebAssembly for high-performance local processing",
        "Web Workers to prevent browser blocking",
        "Client-side JavaScript with no server communication",
        "Temporary blob URLs that are automatically revoked",
      ],
      contactTitle: "Questions?",
      contactContent:
        "If you have any questions about this privacy policy or our practices, you can review our open-source code or contact us through our public repository.",
    },
  },
  pt: {
    home: {
      title: "Otimizador de PDF",
      subtitle:
        "Reduza o tamanho de arquivos PDF instantaneamente com nossa tecnologia de compressão avançada. Faça upload do seu PDF e escolha o nível de otimização para o equilíbrio perfeito entre qualidade e tamanho do arquivo.",
      uploadTitle: "Enviar e Otimizar",
      uploadDescription:
        "Escolha seu arquivo PDF e o nível de otimização para começar",
      selectFile: "Selecionar Arquivo PDF",
      selectedFile: "Arquivo selecionado",
      optimizationLevel: "Nível de Otimização",
      lightName: "Compressão Leve",
      lightDescription: "Compressão mínima com máxima retenção de qualidade",
      mediumName: "Compressão Média",
      mediumDescription:
        "Compressão equilibrada para a maioria dos casos de uso",
      heavyName: "Compressão Pesada",
      heavyDescription: "Compressão máxima para menores tamanhos de arquivo",
      optimizePdf: "Otimizar PDF",
      optimizing: "Otimizando...",
      downloadOptimized: "Baixar PDF Otimizado",
      feature1Title: "Extremamente Rápido",
      feature1Description:
        "Processe PDFs em segundos com nossos algoritmos otimizados",
      feature2Title: "Seguro e Privado",
      feature2Description:
        "Seus arquivos são processados com segurança e nunca armazenados",
      feature3Title: "Uso Ilimitado",
      feature3Description:
        "Otimize quantos PDFs precisar, completamente gratuito",
      privacyPolicy: "Política de Privacidade",
      poweredBy: "Powered by Ghostscript",
    },
    privacy: {
      title: "Política de Privacidade",
      subtitle:
        "A sua privacidade é a nossa prioridade máxima. Aqui está exatamente como a protegemos.",
      backToHome: "Voltar ao Início",
      lastUpdated: "Última atualização",
      localProcessingTitle: "Processamento Local",
      localProcessingContent:
        "Toda a otimização de PDF acontece diretamente no seu navegador usando tecnologia WebAssembly. Os seus ficheiros são processados na memória e nunca transmitidos para qualquer servidor. Quando fecha a página, todos os dados são automaticamente descartados.",
      noTrackingTitle: "Sem Rastreamento",
      noTrackingContent:
        "Não usamos análises, cookies, pixels de rastreamento ou scripts de terceiros. Não temos forma de o identificar ou rastrear o seu comportamento entre sessões. A sua utilização é completamente anónima.",
      noDataStorageTitle: "Sem Armazenamento de Dados",
      noDataStorageContent:
        "Não armazenamos, guardamos em cache ou retemos nenhum dos seus ficheiros ou informações pessoais. Tudo acontece na memória temporária do seu navegador e é automaticamente limpo quando navega para outro lado ou fecha o separador.",
      openSourceTitle: "Código Aberto",
      openSourceContent:
        "O nosso código é transparente e auditável. Pode inspecionar exatamente como os seus ficheiros são processados e verificar que nenhum dado sai do seu dispositivo.",
      hostingTitle: "Divulgação de Hospedagem",
      hostingContent:
        "Este website está hospedado na rede de distribuição de conteúdo da Vercel. Embora não recolhamos dados sobre si, a Vercel pode recolher análises básicas como:",
      hostingList: [
        "Visualizações de página e contagens de visitas",
        "Localização geográfica geral (nível país/região)",
        "Tipo de navegador e informações do dispositivo",
        "Informações de referência (de que site veio)",
      ],
      hostingNote:
        "Importante: Nenhum conteúdo de ficheiro, dados pessoais ou informações detalhadas de uso são transmitidos para a Vercel ou qualquer outro serviço.",
      technicalTitle: "Implementação Técnica",
      technicalContent: "O nosso otimizador de PDF usa:",
      technicalList: [
        "WebAssembly para processamento local de alto desempenho",
        "Web Workers para prevenir bloqueio do navegador",
        "JavaScript do lado do cliente sem comunicação com servidor",
        "URLs blob temporários que são automaticamente revogados",
      ],
      contactTitle: "Questões?",
      contactContent:
        "Se tiver questões sobre esta política de privacidade ou as nossas práticas, pode rever o nosso código open-source ou contactar-nos através do nosso repositório público.",
    },
  },
} as const;
