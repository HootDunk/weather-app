/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOMContent.js":
/*!***************************!*\
  !*** ./src/DOMContent.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderCard": () => /* binding */ renderCard,
/* harmony export */   "radioBtnEvents": () => /* binding */ radioBtnEvents,
/* harmony export */   "setActiveRadio": () => /* binding */ setActiveRadio
/* harmony export */ });
/* harmony import */ var _logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logic */ "./src/logic.js");


const tempConversion = (kelvin, desiredUnit) => {
  if (desiredUnit === "imperial") {
    return Math.round(1.8 * (kelvin - 273) + 32);
  } else if (desiredUnit === "metric") {
    return Math.round(kelvin - 273.15);
  }
};

// consider using date-fns to get the timestring for that particular area
const formatTime = (unix) => {
  let date = new Date(unix * 1000);
  return date.toLocaleTimeString().slice(0, 4);
};

const createCard = (obj, desiredUnit) => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
  <div class="row">
  <i id="delete-button" data-id="${obj.name}" class="fas fa-times close"></i>
    <h1>${obj.name}, ${obj.country}</h1>
  </div>
  <div class="row weather-img">
    <figure>
      <img src="https://openweathermap.org/img/wn/${obj.icon}@4x.png" alt="${
    obj.description
  }">
      <figcaption>${obj.description}</figcaption>
    </figure>
  </div>
  <div id="temp-data" class="temp-info row">
    <h1 data-kelvin=${obj.temp} class="temp">${tempConversion(
    obj.temp,
    desiredUnit
  )}&deg</h1>
    <h3 data-kelvin=${obj.feel} class="feel">Feels like ${tempConversion(
    obj.feel,
    desiredUnit
  )}&deg</h3>
  </div>
  <div class="row sun">
    <h3 class="sun">Sunrise: ${formatTime(obj.sunrise)}</h2>
    <h3 class="sun">Sunset: ${formatTime(obj.sunset)}</h2>
  </div>
  `;
  return card;
};

const addDeleteEvent = (cardContainer) => {
  const currentCard = cardContainer.lastElementChild;
  const deleteBtn = currentCard.querySelector("#delete-button");
  deleteBtn.addEventListener("click", (e) => {
    currentCard.remove();
    (0,_logic__WEBPACK_IMPORTED_MODULE_0__.removeData)(e.target.dataset.id);

  });
};

const cardDOMContent = (card) => {
  const cardContainer = document.querySelector(".card-container");
  cardContainer.appendChild(card);
  addDeleteEvent(cardContainer);
};

const renderCard = (obj, desiredUnit) => {
  const card = createCard(obj, desiredUnit);
  cardDOMContent(card);
};

const updateTemps = (desiredUnits) => {
  const feelNodes = Array.from(document.getElementsByClassName("feel"));
  feelNodes.forEach((node) => {
    node.innerText = `Feels like ${tempConversion(
      node.dataset.kelvin,
      desiredUnits
    )}`;
  });

  const tempNodes = Array.from(document.getElementsByClassName("temp"));
  tempNodes.forEach((node) => {
    node.innerText = tempConversion(node.dataset.kelvin, desiredUnits);
  });
};

const radioBtnEvents = () => {
  
  const metricBtn = document.getElementById("radio-one");
  metricBtn.addEventListener("click", (e) => {
    const userData = (0,_logic__WEBPACK_IMPORTED_MODULE_0__.getData)();
    if (userData.units !== "metric") {
      userData.units = "metric";
      (0,_logic__WEBPACK_IMPORTED_MODULE_0__.saveData)(userData)
      updateTemps(userData.units);
    }
  });

  const imperialBtn = document.getElementById("radio-two");
  imperialBtn.addEventListener("click", (e) => {
    const userData = (0,_logic__WEBPACK_IMPORTED_MODULE_0__.getData)();
    if (userData.units !== "imperial") {
      userData.units = "imperial";
      (0,_logic__WEBPACK_IMPORTED_MODULE_0__.saveData)(userData)
      updateTemps(userData.units);
    }
  });
};

const setActiveRadio = (userData) => {
  if (userData.units == "metric") {
    document.getElementById("radio-one").checked = true;
  } else if (userData.units == "imperial") {
    document.getElementById("radio-two").checked = true;
  }
};




/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logic */ "./src/logic.js");
/* harmony import */ var _DOMContent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOMContent */ "./src/DOMContent.js");



const setupForm = (userData) => {
  const form = document.getElementById("weather-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = form["city"].value;
    (0,_logic__WEBPACK_IMPORTED_MODULE_0__.processWeatherJSON)(city).then((res) => {
      (0,_DOMContent__WEBPACK_IMPORTED_MODULE_1__.renderCard)(res, userData.units);
      userData.places.push(res.name);
      localStorage.setItem("weather-app-user", JSON.stringify(userData));
    });
  });
}

// consider re-writing for clarity
const loadWeatherCards = async (obj) => {
  try {
    Promise.all(
      obj.places.map(async (place) => {
        let data = await (0,_logic__WEBPACK_IMPORTED_MODULE_0__.processWeatherJSON)(place);
        (0,_DOMContent__WEBPACK_IMPORTED_MODULE_1__.renderCard)(data, obj.units);
      })
    );
  } catch(err) {
    console.log(err)
  }

};


const startUp = () => {
  const userData = (0,_logic__WEBPACK_IMPORTED_MODULE_0__.getData)();
  setupForm(userData)
  ;(0,_DOMContent__WEBPACK_IMPORTED_MODULE_1__.setActiveRadio)(userData);
  (0,_DOMContent__WEBPACK_IMPORTED_MODULE_1__.radioBtnEvents)(userData);
  loadWeatherCards(userData);
}




startUp();


/***/ }),

/***/ "./src/logic.js":
/*!**********************!*\
  !*** ./src/logic.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => /* binding */ getData,
/* harmony export */   "processWeatherJSON": () => /* binding */ processWeatherJSON,
/* harmony export */   "saveData": () => /* binding */ saveData,
/* harmony export */   "removeData": () => /* binding */ removeData
/* harmony export */ });
const getData = () => {
  let userData;
  if (localStorage.length) {
    userData = JSON.parse(localStorage.getItem("weather-app-user"));
  } else {
    userData = {
      units: "imperial",
      places: ["Dallas", "New York"],
    };
  }
  return userData;
};

const saveData = (data) => {
  localStorage.setItem("weather-app-user", JSON.stringify(data));
}

const removeData = (removeName) => {
  const data = getData();
  const places = data.places;
  console.log(data)
  const newPlaces = places.filter(name => name !== removeName)
  data.places = newPlaces;
  saveData(data)
}

// Makes a request to the weather API for weather data based on city name
const getWeatherJSON = async (cityName) => {
  const appID = "d8d60c8c859cb3e31ebf243960d9c642";
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${appID}`,
      {
        mode: "cors"
      });
    const data = await response.json();
    return data;
  } catch (error) {
    // code to handle error goes here
    throw error;
  }
};

// consider doing a try catch in the top level function call only as the promise err will pass through the chain to the end
// processes json data and returns object with only data required for our app
const processWeatherJSON = async (cityName) => {
  try {
    let json = await getWeatherJSON(cityName);
    console.log("json output = ", json);
    let obj = {
      name: json.name,
      country: json.sys.country,
      temp: json.main.temp,
      feel: json.main.feels_like,
      timezone: json.timezone,
      sunrise: json.sys.sunrise,
      sunset: json.sys.sunset,
      icon: json.weather[0].icon,
      description: json.weather[0].description,
    };
    return obj;
  } catch (error) {
    throw error;
  }
};







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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9ET01Db250ZW50LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2xvZ2ljLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXdEOztBQUV4RDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUMsU0FBUztBQUM1QyxVQUFVLFNBQVMsSUFBSSxZQUFZO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxTQUFTO0FBQzdEO0FBQ0EsR0FBRztBQUNILG9CQUFvQixnQkFBZ0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLFNBQVMsZ0JBQWdCO0FBQy9DO0FBQ0E7QUFDQSxJQUFJO0FBQ0osc0JBQXNCLFNBQVMsMkJBQTJCO0FBQzFEO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLCtCQUErQix3QkFBd0I7QUFDdkQsOEJBQThCLHVCQUF1QjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxrREFBVTs7QUFFZCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBLE1BQU07QUFDTixHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLCtDQUFPO0FBQzVCO0FBQ0E7QUFDQSxNQUFNLGdEQUFRO0FBQ2Q7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLHFCQUFxQiwrQ0FBTztBQUM1QjtBQUNBO0FBQ0EsTUFBTSxnREFBUTtBQUNkO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFc0Q7Ozs7Ozs7Ozs7Ozs7O0FDdEhBO0FBQ29COztBQUUxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSwwREFBa0I7QUFDdEIsTUFBTSx1REFBVTtBQUNoQjtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLDBEQUFrQjtBQUMzQyxRQUFRLHVEQUFVO0FBQ2xCLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBLG1CQUFtQiwrQ0FBTztBQUMxQjtBQUNBLEVBQUUsNERBQWM7QUFDaEIsRUFBRSwyREFBYztBQUNoQjtBQUNBOzs7OztBQUtBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxTQUFTLFNBQVMsTUFBTTtBQUNuRjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7OztBQUk2RDs7Ozs7Ozs7VUNwRTdEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3JCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsc0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2F2ZURhdGEsIGdldERhdGEsIHJlbW92ZURhdGEgfSBmcm9tIFwiLi9sb2dpY1wiO1xyXG5cclxuY29uc3QgdGVtcENvbnZlcnNpb24gPSAoa2VsdmluLCBkZXNpcmVkVW5pdCkgPT4ge1xyXG4gIGlmIChkZXNpcmVkVW5pdCA9PT0gXCJpbXBlcmlhbFwiKSB7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZCgxLjggKiAoa2VsdmluIC0gMjczKSArIDMyKTtcclxuICB9IGVsc2UgaWYgKGRlc2lyZWRVbml0ID09PSBcIm1ldHJpY1wiKSB7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZChrZWx2aW4gLSAyNzMuMTUpO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIGNvbnNpZGVyIHVzaW5nIGRhdGUtZm5zIHRvIGdldCB0aGUgdGltZXN0cmluZyBmb3IgdGhhdCBwYXJ0aWN1bGFyIGFyZWFcclxuY29uc3QgZm9ybWF0VGltZSA9ICh1bml4KSA9PiB7XHJcbiAgbGV0IGRhdGUgPSBuZXcgRGF0ZSh1bml4ICogMTAwMCk7XHJcbiAgcmV0dXJuIGRhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKCkuc2xpY2UoMCwgNCk7XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVDYXJkID0gKG9iaiwgZGVzaXJlZFVuaXQpID0+IHtcclxuICBjb25zdCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjYXJkLmNsYXNzTGlzdC5hZGQoXCJjYXJkXCIpO1xyXG5cclxuICBjYXJkLmlubmVySFRNTCA9IGBcclxuICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgPGkgaWQ9XCJkZWxldGUtYnV0dG9uXCIgZGF0YS1pZD1cIiR7b2JqLm5hbWV9XCIgY2xhc3M9XCJmYXMgZmEtdGltZXMgY2xvc2VcIj48L2k+XHJcbiAgICA8aDE+JHtvYmoubmFtZX0sICR7b2JqLmNvdW50cnl9PC9oMT5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwicm93IHdlYXRoZXItaW1nXCI+XHJcbiAgICA8ZmlndXJlPlxyXG4gICAgICA8aW1nIHNyYz1cImh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke29iai5pY29ufUA0eC5wbmdcIiBhbHQ9XCIke1xyXG4gICAgb2JqLmRlc2NyaXB0aW9uXHJcbiAgfVwiPlxyXG4gICAgICA8ZmlnY2FwdGlvbj4ke29iai5kZXNjcmlwdGlvbn08L2ZpZ2NhcHRpb24+XHJcbiAgICA8L2ZpZ3VyZT5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGlkPVwidGVtcC1kYXRhXCIgY2xhc3M9XCJ0ZW1wLWluZm8gcm93XCI+XHJcbiAgICA8aDEgZGF0YS1rZWx2aW49JHtvYmoudGVtcH0gY2xhc3M9XCJ0ZW1wXCI+JHt0ZW1wQ29udmVyc2lvbihcclxuICAgIG9iai50ZW1wLFxyXG4gICAgZGVzaXJlZFVuaXRcclxuICApfSZkZWc8L2gxPlxyXG4gICAgPGgzIGRhdGEta2VsdmluPSR7b2JqLmZlZWx9IGNsYXNzPVwiZmVlbFwiPkZlZWxzIGxpa2UgJHt0ZW1wQ29udmVyc2lvbihcclxuICAgIG9iai5mZWVsLFxyXG4gICAgZGVzaXJlZFVuaXRcclxuICApfSZkZWc8L2gzPlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJyb3cgc3VuXCI+XHJcbiAgICA8aDMgY2xhc3M9XCJzdW5cIj5TdW5yaXNlOiAke2Zvcm1hdFRpbWUob2JqLnN1bnJpc2UpfTwvaDI+XHJcbiAgICA8aDMgY2xhc3M9XCJzdW5cIj5TdW5zZXQ6ICR7Zm9ybWF0VGltZShvYmouc3Vuc2V0KX08L2gyPlxyXG4gIDwvZGl2PlxyXG4gIGA7XHJcbiAgcmV0dXJuIGNhcmQ7XHJcbn07XHJcblxyXG5jb25zdCBhZGREZWxldGVFdmVudCA9IChjYXJkQ29udGFpbmVyKSA9PiB7XHJcbiAgY29uc3QgY3VycmVudENhcmQgPSBjYXJkQ29udGFpbmVyLmxhc3RFbGVtZW50Q2hpbGQ7XHJcbiAgY29uc3QgZGVsZXRlQnRuID0gY3VycmVudENhcmQucXVlcnlTZWxlY3RvcihcIiNkZWxldGUtYnV0dG9uXCIpO1xyXG4gIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgIGN1cnJlbnRDYXJkLnJlbW92ZSgpO1xyXG4gICAgcmVtb3ZlRGF0YShlLnRhcmdldC5kYXRhc2V0LmlkKTtcclxuXHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBjYXJkRE9NQ29udGVudCA9IChjYXJkKSA9PiB7XHJcbiAgY29uc3QgY2FyZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZC1jb250YWluZXJcIik7XHJcbiAgY2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChjYXJkKTtcclxuICBhZGREZWxldGVFdmVudChjYXJkQ29udGFpbmVyKTtcclxufTtcclxuXHJcbmNvbnN0IHJlbmRlckNhcmQgPSAob2JqLCBkZXNpcmVkVW5pdCkgPT4ge1xyXG4gIGNvbnN0IGNhcmQgPSBjcmVhdGVDYXJkKG9iaiwgZGVzaXJlZFVuaXQpO1xyXG4gIGNhcmRET01Db250ZW50KGNhcmQpO1xyXG59O1xyXG5cclxuY29uc3QgdXBkYXRlVGVtcHMgPSAoZGVzaXJlZFVuaXRzKSA9PiB7XHJcbiAgY29uc3QgZmVlbE5vZGVzID0gQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZmVlbFwiKSk7XHJcbiAgZmVlbE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcclxuICAgIG5vZGUuaW5uZXJUZXh0ID0gYEZlZWxzIGxpa2UgJHt0ZW1wQ29udmVyc2lvbihcclxuICAgICAgbm9kZS5kYXRhc2V0LmtlbHZpbixcclxuICAgICAgZGVzaXJlZFVuaXRzXHJcbiAgICApfWA7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHRlbXBOb2RlcyA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRlbXBcIikpO1xyXG4gIHRlbXBOb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XHJcbiAgICBub2RlLmlubmVyVGV4dCA9IHRlbXBDb252ZXJzaW9uKG5vZGUuZGF0YXNldC5rZWx2aW4sIGRlc2lyZWRVbml0cyk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCByYWRpb0J0bkV2ZW50cyA9ICgpID0+IHtcclxuICBcclxuICBjb25zdCBtZXRyaWNCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhZGlvLW9uZVwiKTtcclxuICBtZXRyaWNCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICBjb25zdCB1c2VyRGF0YSA9IGdldERhdGEoKTtcclxuICAgIGlmICh1c2VyRGF0YS51bml0cyAhPT0gXCJtZXRyaWNcIikge1xyXG4gICAgICB1c2VyRGF0YS51bml0cyA9IFwibWV0cmljXCI7XHJcbiAgICAgIHNhdmVEYXRhKHVzZXJEYXRhKVxyXG4gICAgICB1cGRhdGVUZW1wcyh1c2VyRGF0YS51bml0cyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGltcGVyaWFsQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpby10d29cIik7XHJcbiAgaW1wZXJpYWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICBjb25zdCB1c2VyRGF0YSA9IGdldERhdGEoKTtcclxuICAgIGlmICh1c2VyRGF0YS51bml0cyAhPT0gXCJpbXBlcmlhbFwiKSB7XHJcbiAgICAgIHVzZXJEYXRhLnVuaXRzID0gXCJpbXBlcmlhbFwiO1xyXG4gICAgICBzYXZlRGF0YSh1c2VyRGF0YSlcclxuICAgICAgdXBkYXRlVGVtcHModXNlckRhdGEudW5pdHMpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3Qgc2V0QWN0aXZlUmFkaW8gPSAodXNlckRhdGEpID0+IHtcclxuICBpZiAodXNlckRhdGEudW5pdHMgPT0gXCJtZXRyaWNcIikge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpby1vbmVcIikuY2hlY2tlZCA9IHRydWU7XHJcbiAgfSBlbHNlIGlmICh1c2VyRGF0YS51bml0cyA9PSBcImltcGVyaWFsXCIpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFkaW8tdHdvXCIpLmNoZWNrZWQgPSB0cnVlO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCB7IHJlbmRlckNhcmQsIHJhZGlvQnRuRXZlbnRzLCBzZXRBY3RpdmVSYWRpbyB9O1xyXG4iLCJpbXBvcnQgeyBnZXREYXRhLCBwcm9jZXNzV2VhdGhlckpTT04gfSBmcm9tIFwiLi9sb2dpY1wiO1xyXG5pbXBvcnQgeyByYWRpb0J0bkV2ZW50cywgcmVuZGVyQ2FyZCwgc2V0QWN0aXZlUmFkaW8gfSBmcm9tIFwiLi9ET01Db250ZW50XCI7XHJcblxyXG5jb25zdCBzZXR1cEZvcm0gPSAodXNlckRhdGEpID0+IHtcclxuICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWF0aGVyLWZvcm1cIik7XHJcbiAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBjaXR5ID0gZm9ybVtcImNpdHlcIl0udmFsdWU7XHJcbiAgICBwcm9jZXNzV2VhdGhlckpTT04oY2l0eSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgIHJlbmRlckNhcmQocmVzLCB1c2VyRGF0YS51bml0cyk7XHJcbiAgICAgIHVzZXJEYXRhLnBsYWNlcy5wdXNoKHJlcy5uYW1lKTtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ3ZWF0aGVyLWFwcC11c2VyXCIsIEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuLy8gY29uc2lkZXIgcmUtd3JpdGluZyBmb3IgY2xhcml0eVxyXG5jb25zdCBsb2FkV2VhdGhlckNhcmRzID0gYXN5bmMgKG9iaikgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBQcm9taXNlLmFsbChcclxuICAgICAgb2JqLnBsYWNlcy5tYXAoYXN5bmMgKHBsYWNlKSA9PiB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCBwcm9jZXNzV2VhdGhlckpTT04ocGxhY2UpO1xyXG4gICAgICAgIHJlbmRlckNhcmQoZGF0YSwgb2JqLnVuaXRzKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfSBjYXRjaChlcnIpIHtcclxuICAgIGNvbnNvbGUubG9nKGVycilcclxuICB9XHJcblxyXG59O1xyXG5cclxuXHJcbmNvbnN0IHN0YXJ0VXAgPSAoKSA9PiB7XHJcbiAgY29uc3QgdXNlckRhdGEgPSBnZXREYXRhKCk7XHJcbiAgc2V0dXBGb3JtKHVzZXJEYXRhKVxyXG4gIHNldEFjdGl2ZVJhZGlvKHVzZXJEYXRhKTtcclxuICByYWRpb0J0bkV2ZW50cyh1c2VyRGF0YSk7XHJcbiAgbG9hZFdlYXRoZXJDYXJkcyh1c2VyRGF0YSk7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbnN0YXJ0VXAoKTtcclxuIiwiY29uc3QgZ2V0RGF0YSA9ICgpID0+IHtcclxuICBsZXQgdXNlckRhdGE7XHJcbiAgaWYgKGxvY2FsU3RvcmFnZS5sZW5ndGgpIHtcclxuICAgIHVzZXJEYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIndlYXRoZXItYXBwLXVzZXJcIikpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB1c2VyRGF0YSA9IHtcclxuICAgICAgdW5pdHM6IFwiaW1wZXJpYWxcIixcclxuICAgICAgcGxhY2VzOiBbXCJEYWxsYXNcIiwgXCJOZXcgWW9ya1wiXSxcclxuICAgIH07XHJcbiAgfVxyXG4gIHJldHVybiB1c2VyRGF0YTtcclxufTtcclxuXHJcbmNvbnN0IHNhdmVEYXRhID0gKGRhdGEpID0+IHtcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndlYXRoZXItYXBwLXVzZXJcIiwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG59XHJcblxyXG5jb25zdCByZW1vdmVEYXRhID0gKHJlbW92ZU5hbWUpID0+IHtcclxuICBjb25zdCBkYXRhID0gZ2V0RGF0YSgpO1xyXG4gIGNvbnN0IHBsYWNlcyA9IGRhdGEucGxhY2VzO1xyXG4gIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgY29uc3QgbmV3UGxhY2VzID0gcGxhY2VzLmZpbHRlcihuYW1lID0+IG5hbWUgIT09IHJlbW92ZU5hbWUpXHJcbiAgZGF0YS5wbGFjZXMgPSBuZXdQbGFjZXM7XHJcbiAgc2F2ZURhdGEoZGF0YSlcclxufVxyXG5cclxuLy8gTWFrZXMgYSByZXF1ZXN0IHRvIHRoZSB3ZWF0aGVyIEFQSSBmb3Igd2VhdGhlciBkYXRhIGJhc2VkIG9uIGNpdHkgbmFtZVxyXG5jb25zdCBnZXRXZWF0aGVySlNPTiA9IGFzeW5jIChjaXR5TmFtZSkgPT4ge1xyXG4gIGNvbnN0IGFwcElEID0gXCJkOGQ2MGM4Yzg1OWNiM2UzMWViZjI0Mzk2MGQ5YzY0MlwiO1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxyXG4gICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHlOYW1lfSZBUFBJRD0ke2FwcElEfWAsXHJcbiAgICAgIHtcclxuICAgICAgICBtb2RlOiBcImNvcnNcIlxyXG4gICAgICB9KTtcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgLy8gY29kZSB0byBoYW5kbGUgZXJyb3IgZ29lcyBoZXJlXHJcbiAgICB0aHJvdyBlcnJvcjtcclxuICB9XHJcbn07XHJcblxyXG4vLyBjb25zaWRlciBkb2luZyBhIHRyeSBjYXRjaCBpbiB0aGUgdG9wIGxldmVsIGZ1bmN0aW9uIGNhbGwgb25seSBhcyB0aGUgcHJvbWlzZSBlcnIgd2lsbCBwYXNzIHRocm91Z2ggdGhlIGNoYWluIHRvIHRoZSBlbmRcclxuLy8gcHJvY2Vzc2VzIGpzb24gZGF0YSBhbmQgcmV0dXJucyBvYmplY3Qgd2l0aCBvbmx5IGRhdGEgcmVxdWlyZWQgZm9yIG91ciBhcHBcclxuY29uc3QgcHJvY2Vzc1dlYXRoZXJKU09OID0gYXN5bmMgKGNpdHlOYW1lKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGxldCBqc29uID0gYXdhaXQgZ2V0V2VhdGhlckpTT04oY2l0eU5hbWUpO1xyXG4gICAgY29uc29sZS5sb2coXCJqc29uIG91dHB1dCA9IFwiLCBqc29uKTtcclxuICAgIGxldCBvYmogPSB7XHJcbiAgICAgIG5hbWU6IGpzb24ubmFtZSxcclxuICAgICAgY291bnRyeToganNvbi5zeXMuY291bnRyeSxcclxuICAgICAgdGVtcDoganNvbi5tYWluLnRlbXAsXHJcbiAgICAgIGZlZWw6IGpzb24ubWFpbi5mZWVsc19saWtlLFxyXG4gICAgICB0aW1lem9uZToganNvbi50aW1lem9uZSxcclxuICAgICAgc3VucmlzZToganNvbi5zeXMuc3VucmlzZSxcclxuICAgICAgc3Vuc2V0OiBqc29uLnN5cy5zdW5zZXQsXHJcbiAgICAgIGljb246IGpzb24ud2VhdGhlclswXS5pY29uLFxyXG4gICAgICBkZXNjcmlwdGlvbjoganNvbi53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxyXG4gICAgfTtcclxuICAgIHJldHVybiBvYmo7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHRocm93IGVycm9yO1xyXG4gIH1cclxufTtcclxuXHJcblxyXG5cclxuZXhwb3J0IHsgZ2V0RGF0YSwgcHJvY2Vzc1dlYXRoZXJKU09OLCBzYXZlRGF0YSwgcmVtb3ZlRGF0YSB9O1xyXG5cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9