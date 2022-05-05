/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 396:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 777:
/***/ ((module) => {

module.exports = eval("require")("easy-yandex-s3");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(396);
const EasyYandexS3 = __nccwpck_require__(777); // https://github.com/powerdot/easy-yandex-s3

async function main() {
  // Get inputs from action.yml file
  try {
    const inputs = {
      accessKeyId: core.getInput("accessKeyId", { required: true }),
      secretAccessKey: core.getInput("secretAccessKey", { required: true }),
      bucket: core.getInput("bucket", { required: true }),
      localPath: core.getInput("localPath", { required: true }),  // Relative path to files/folder to upload. 
      remotePath: core.getInput("remotePath", { required: true }),  // Relative path to upoload to. 
      // clear: getBooleanFromString(core.getInput("clear", { required: false })),  // in case we'll need it in the future
    };
  } catch (error) {
    core.setFailed(error.message)
  }

  const s3 = new EasyYandexS3({
    auth: {
        accessKeyId: inputs.accessKeyId,
        secretAccessKey: inputs.secretAccessKey,
    },
    Bucket: inputs.bucket, 
    debug: true // Дебаг в консоли, потом можете удалить в релизе
  });

    // Относительный путь:
  const upload = await s3.Upload({
    path: inputs.localPath,  // относительный путь до папки
    save_name: true // сохранять оригинальные названия файлов 
  }, inputs.remotePath);
  console.log(upload);    // <- массив загруженных файлов
  console.log('It works!');
}

main();



})();

module.exports = __webpack_exports__;
/******/ })()
;