// Import the Ghostscript WebAssembly module
function loadGhostscriptModule() {
  import("./gs-worker.js");
}

// Global Module variable for Emscripten
let Module;

// Optimization configurations for different compression levels
const OPTIMIZATION_CONFIGS = {
  light: {
    pdfSettings: "/printer",
    imageDownsample: "false",
    colorImageResolution: "300",
    grayscaleImageResolution: "300",
    monoImageResolution: "1200",
    jpegQuality: "95",
  },
  medium: {
    pdfSettings: "/ebook",
    imageDownsample: "true",
    colorImageResolution: "150",
    grayscaleImageResolution: "150",
    monoImageResolution: "600",
    jpegQuality: "85",
  },
  heavy: {
    pdfSettings: "/screen",
    imageDownsample: "true",
    colorImageResolution: "96",
    grayscaleImageResolution: "96",
    monoImageResolution: "300",
    jpegQuality: "70",
  },
};

// Default Ghostscript arguments for PDF optimization
const BASE_GS_ARGS = [
  "-sDEVICE=pdfwrite",
  "-dCompatibilityLevel=1.4",
  "-dNOPAUSE",
  "-dQUIET",
  "-dBATCH",
  "-dSAFER",
  "-dOptimize=true",
  "-dEmbedAllFonts=true",
  "-dSubsetFonts=true",
  "-dCompressFonts=true",
  "-dDetectDuplicateImages=true",
  "-dCompressPages=true",
  "-dUseFlateCompression=true",
  "-dAutoRotatePages=/None",
  "-dColorImageFilter=/DCTEncode",
  "-dGrayImageFilter=/DCTEncode",
  "-sOutputFile=output.pdf",
  "input.pdf",
];

/**
 * Builds Ghostscript command arguments based on optimization config
 * @param {Object} config - Optimization configuration
 * @returns {Array} Complete arguments array for Ghostscript
 */
function buildGhostscriptArgs(config) {
  const dynamicArgs = [
    `-dPDFSETTINGS=${config.pdfSettings}`,
    `-dDownsampleColorImages=${config.imageDownsample}`,
    `-dColorImageResolution=${config.colorImageResolution}`,
    `-dDownsampleGrayImages=${config.imageDownsample}`,
    `-dGrayImageResolution=${config.grayscaleImageResolution}`,
    `-dDownsampleMonoImages=${config.imageDownsample}`,
    `-dMonoImageResolution=${config.monoImageResolution}`,
    `-dJPEGQ=${config.jpegQuality}`,
  ];

  // Insert dynamic args before the last two items (output file and input file)
  return [
    ...BASE_GS_ARGS.slice(0, -2),
    ...dynamicArgs,
    ...BASE_GS_ARGS.slice(-2),
  ];
}

/**
 * Downloads PDF data from URL and returns as ArrayBuffer
 * @param {string} url - PDF data URL
 * @returns {Promise<ArrayBuffer>} PDF data as ArrayBuffer
 */
function downloadPdfData(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "arraybuffer";

    xhr.onload = () => {
      if (xhr.status === 200) {
        // Clean up the object URL
        self.URL.revokeObjectURL(url);
        resolve(xhr.response);
      } else {
        reject(new Error(`Failed to download PDF: ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error("Network error downloading PDF"));
    xhr.send();
  });
}

/**
 * Creates optimized PDF blob from processed data
 * @returns {string} Object URL for the optimized PDF
 */
function createOptimizedPdfUrl() {
  const outputData = self.Module.FS.readFile("output.pdf", {
    encoding: "binary",
  });
  const blob = new Blob([outputData], { type: "application/pdf" });
  return self.URL.createObjectURL(blob);
}

/**
 * Sets up Emscripten Module configuration
 * @param {ArrayBuffer} pdfData - Input PDF data
 * @param {Array} gsArgs - Ghostscript arguments
 * @param {Function} onComplete - Callback when processing completes
 * @returns {Object} Module configuration object
 */
function createModuleConfig(pdfData, gsArgs, onComplete) {
  return {
    preRun: [
      function () {
        self.Module.FS.writeFile("input.pdf", new Uint8Array(pdfData));
      },
    ],
    postRun: [
      function () {
        try {
          const optimizedPdfUrl = createOptimizedPdfUrl();
          onComplete({ pdfDataURL: optimizedPdfUrl });
        } catch (error) {
          onComplete({ error: error.message });
        }
      },
    ],
    arguments: gsArgs,
    print: function (text) {
      // Suppress normal output - could be used for progress tracking
    },
    printErr: function (text) {
      console.warn("Ghostscript warning:", text);
    },
    totalDependencies: 0,
    noExitRuntime: 1,
  };
}

/**
 * Main PDF optimization function
 * @param {Object} request - Contains psDataURL and optimization level
 * @param {Function} responseCallback - Called with optimization result
 */
async function optimizePdfWithGhostscript(request, responseCallback) {
  try {
    // Get optimization configuration
    const config =
      OPTIMIZATION_CONFIGS[request.level] || OPTIMIZATION_CONFIGS.medium;

    // Download PDF data
    const pdfData = await downloadPdfData(request.psDataURL);

    // Build Ghostscript arguments
    const gsArgs = buildGhostscriptArgs(config);

    // Create module configuration
    const moduleConfig = createModuleConfig(pdfData, gsArgs, responseCallback);

    // Initialize or reuse Ghostscript module
    if (!self.Module) {
      Module = moduleConfig;
      self.Module = Module;
      loadGhostscriptModule();
    } else {
      // Reuse existing module
      self.Module.calledRun = false;
      self.Module.postRun = moduleConfig.postRun;
      self.Module.preRun = moduleConfig.preRun;
      self.Module.callMain();
    }
  } catch (error) {
    responseCallback({ error: error.message });
  }
}

// Worker message handler
self.addEventListener("message", function (event) {
  const { data: messageData } = event;

  // Validate message format
  if (messageData.target !== "wasm") {
    return;
  }

  console.log("PDF optimization request received:", messageData.data);

  // Process the optimization request
  optimizePdfWithGhostscript(messageData.data, (result) => {
    if (result.error) {
      console.error("PDF optimization failed:", result.error);
    }
    self.postMessage(result.pdfDataURL || result.error);
  });
});

console.log("PDF optimization worker ready");
