/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test */ "./src/test.js");



// make temps have subfield of the temp and the unit
// then use the temp.unit with conditionals in the conversion funciton

const appID = 'd8d60c8c859cb3e31ebf243960d9c642';

(0,_test__WEBPACK_IMPORTED_MODULE_0__.default)();



// Makes a request to the weather API for weather data based on city name
const getWeatherJSON = async (cityName, units) => {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&APPID=${appID}`)
    const data = await response.json();
    return data;
  } catch (error) {
    // code to handle error goes here
    throw error;
  }
}

// consider doing a try catch in the top level function call only as the promise err will pass through the chain to the end
// processes json data and returns object with only data required for our app
const processWeatherJSON = async (cityName, units) => {
  let json = await getWeatherJSON(cityName, units);
  // create code to break json down here
}


let data = getWeatherJSON('wildwood', 'imperial');
data.then((data)=> console.log(data))



// Write out the data requirements for the app here
  // temperature (temp and temp unit)
  // sunrise & sunset
  // country
  // weather description
  // name


// Separation of concerns
  // DOMstuff.js has all dom stuff
  // logic.js has code for data requests and cleaning
  // index.js has the event listeners

/***/ }),

/***/ "./src/test.js":
/*!*********************!*\
  !*** ./src/test.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ testing
/* harmony export */ });
function testing() {
  console.log("hello from test")
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy90ZXN0LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUE0Qjs7O0FBRzVCO0FBQ0E7O0FBRUE7O0FBRUEsOENBQU87Ozs7QUFJUDtBQUNBO0FBQ0E7QUFDQSxxRkFBcUYsU0FBUyxTQUFTLE1BQU0sU0FBUyxNQUFNO0FBQzVIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxxQzs7Ozs7Ozs7Ozs7Ozs7QUNoRGU7QUFDZjtBQUNBLEM7Ozs7OztVQ0ZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3JCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsc0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRlc3RpbmcgZnJvbSAnLi90ZXN0J1xyXG5cclxuXHJcbi8vIG1ha2UgdGVtcHMgaGF2ZSBzdWJmaWVsZCBvZiB0aGUgdGVtcCBhbmQgdGhlIHVuaXRcclxuLy8gdGhlbiB1c2UgdGhlIHRlbXAudW5pdCB3aXRoIGNvbmRpdGlvbmFscyBpbiB0aGUgY29udmVyc2lvbiBmdW5jaXRvblxyXG5cclxuY29uc3QgYXBwSUQgPSAnZDhkNjBjOGM4NTljYjNlMzFlYmYyNDM5NjBkOWM2NDInO1xyXG5cclxudGVzdGluZygpO1xyXG5cclxuXHJcblxyXG4vLyBNYWtlcyBhIHJlcXVlc3QgdG8gdGhlIHdlYXRoZXIgQVBJIGZvciB3ZWF0aGVyIGRhdGEgYmFzZWQgb24gY2l0eSBuYW1lXHJcbmNvbnN0IGdldFdlYXRoZXJKU09OID0gYXN5bmMgKGNpdHlOYW1lLCB1bml0cykgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtjaXR5TmFtZX0mdW5pdHM9JHt1bml0c30mQVBQSUQ9JHthcHBJRH1gKVxyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAvLyBjb2RlIHRvIGhhbmRsZSBlcnJvciBnb2VzIGhlcmVcclxuICAgIHRocm93IGVycm9yO1xyXG4gIH1cclxufVxyXG5cclxuLy8gY29uc2lkZXIgZG9pbmcgYSB0cnkgY2F0Y2ggaW4gdGhlIHRvcCBsZXZlbCBmdW5jdGlvbiBjYWxsIG9ubHkgYXMgdGhlIHByb21pc2UgZXJyIHdpbGwgcGFzcyB0aHJvdWdoIHRoZSBjaGFpbiB0byB0aGUgZW5kXHJcbi8vIHByb2Nlc3NlcyBqc29uIGRhdGEgYW5kIHJldHVybnMgb2JqZWN0IHdpdGggb25seSBkYXRhIHJlcXVpcmVkIGZvciBvdXIgYXBwXHJcbmNvbnN0IHByb2Nlc3NXZWF0aGVySlNPTiA9IGFzeW5jIChjaXR5TmFtZSwgdW5pdHMpID0+IHtcclxuICBsZXQganNvbiA9IGF3YWl0IGdldFdlYXRoZXJKU09OKGNpdHlOYW1lLCB1bml0cyk7XHJcbiAgLy8gY3JlYXRlIGNvZGUgdG8gYnJlYWsganNvbiBkb3duIGhlcmVcclxufVxyXG5cclxuXHJcbmxldCBkYXRhID0gZ2V0V2VhdGhlckpTT04oJ3dpbGR3b29kJywgJ2ltcGVyaWFsJyk7XHJcbmRhdGEudGhlbigoZGF0YSk9PiBjb25zb2xlLmxvZyhkYXRhKSlcclxuXHJcblxyXG5cclxuLy8gV3JpdGUgb3V0IHRoZSBkYXRhIHJlcXVpcmVtZW50cyBmb3IgdGhlIGFwcCBoZXJlXHJcbiAgLy8gdGVtcGVyYXR1cmUgKHRlbXAgYW5kIHRlbXAgdW5pdClcclxuICAvLyBzdW5yaXNlICYgc3Vuc2V0XHJcbiAgLy8gY291bnRyeVxyXG4gIC8vIHdlYXRoZXIgZGVzY3JpcHRpb25cclxuICAvLyBuYW1lXHJcblxyXG5cclxuLy8gU2VwYXJhdGlvbiBvZiBjb25jZXJuc1xyXG4gIC8vIERPTXN0dWZmLmpzIGhhcyBhbGwgZG9tIHN0dWZmXHJcbiAgLy8gbG9naWMuanMgaGFzIGNvZGUgZm9yIGRhdGEgcmVxdWVzdHMgYW5kIGNsZWFuaW5nXHJcbiAgLy8gaW5kZXguanMgaGFzIHRoZSBldmVudCBsaXN0ZW5lcnMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0ZXN0aW5nKCkge1xyXG4gIGNvbnNvbGUubG9nKFwiaGVsbG8gZnJvbSB0ZXN0XCIpXHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=