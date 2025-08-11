function loadScript() {
  import("./gs-worker.js");
}

var Module;

function _GSPS2PDF(dataStruct, responseCallback) {
  // Map optimization levels to Ghostscript PDF settings and additional flags
  const levelConfigs = {
    light: {
      pdfSettings: "/printer",
      imageDownsample: "false",
      colorImageResolution: "300",
      grayscaleImageResolution: "300",
      monoImageResolution: "1200",
      jpegQuality: "95"
    },
    medium: {
      pdfSettings: "/ebook",
      imageDownsample: "true",
      colorImageResolution: "150",
      grayscaleImageResolution: "150",
      monoImageResolution: "600",
      jpegQuality: "85"
    },
    heavy: {
      pdfSettings: "/screen",
      imageDownsample: "true",
      colorImageResolution: "96",
      grayscaleImageResolution: "96",
      monoImageResolution: "300",
      jpegQuality: "70"
    }
  };

  const config = levelConfigs[dataStruct.level] || levelConfigs.medium;
  // first download the ps data
  var xhr = new XMLHttpRequest();
  xhr.open("GET", dataStruct.psDataURL);
  xhr.responseType = "arraybuffer";
  xhr.onload = function () {
    console.log("onload");
    // release the URL
    self.URL.revokeObjectURL(dataStruct.psDataURL);
    //set up EMScripten environment
    Module = {
      preRun: [
        function () {
          self.Module.FS.writeFile("input.pdf", new Uint8Array(xhr.response));
        },
      ],
      postRun: [
        function () {
          var uarray = self.Module.FS.readFile("output.pdf", {
            encoding: "binary",
          });
          var blob = new Blob([uarray], { type: "application/octet-stream" });
          var pdfDataURL = self.URL.createObjectURL(blob);
          responseCallback({ pdfDataURL: pdfDataURL, url: dataStruct.url });
        },
      ],
      arguments: [
        "-sDEVICE=pdfwrite",
        "-dCompatibilityLevel=1.4",
        `-dPDFSETTINGS=${config.pdfSettings}`,
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
        `-dDownsampleColorImages=${config.imageDownsample}`,
        `-dColorImageResolution=${config.colorImageResolution}`,
        `-dDownsampleGrayImages=${config.imageDownsample}`,
        `-dGrayImageResolution=${config.grayscaleImageResolution}`,
        `-dDownsampleMonoImages=${config.imageDownsample}`,
        `-dMonoImageResolution=${config.monoImageResolution}`,
        `-dJPEGQ=${config.jpegQuality}`,
        "-dAutoRotatePages=/None",
        "-dColorImageFilter=/DCTEncode",
        "-dGrayImageFilter=/DCTEncode",
        "-sOutputFile=output.pdf",
        "input.pdf",
      ],
      print: function (text) {},
      printErr: function (text) {},
      totalDependencies: 0,
      noExitRuntime: 1,
    };
    // Module.setStatus("Loading Ghostscript...");
    if (!self.Module) {
      self.Module = Module;
      loadScript();
    } else {
      self.Module["calledRun"] = false;
      self.Module["postRun"] = Module.postRun;
      self.Module["preRun"] = Module.preRun;
      self.Module.callMain();
    }
  };
  xhr.send();
}

self.addEventListener("message", function ({ data: e }) {
  console.log("message", e);
  // e.data contains the message sent to the worker.
  if (e.target !== "wasm") {
    return;
  }
  console.log("Message received from main script", e.data);
  _GSPS2PDF(e.data, ({ pdfDataURL }) => self.postMessage(pdfDataURL));
});

console.log("Worker ready");
