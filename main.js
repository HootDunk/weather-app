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
    let index = _logic__WEBPACK_IMPORTED_MODULE_0__.userData.places.indexOf(e.target.dataset.id);
    if (index !== -1) {
      _logic__WEBPACK_IMPORTED_MODULE_0__.userData.places.splice(index, 1);
    }
    localStorage.setItem("weather-app-user", JSON.stringify(_logic__WEBPACK_IMPORTED_MODULE_0__.userData));
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

const updateTemps = () => {
  const feelNodes = Array.from(document.getElementsByClassName("feel"));
  feelNodes.forEach((node) => {
    node.innerText = `Feels like ${tempConversion(
      node.dataset.kelvin,
      _logic__WEBPACK_IMPORTED_MODULE_0__.userData.units
    )}`;
  });

  const tempNodes = Array.from(document.getElementsByClassName("temp"));
  tempNodes.forEach((node) => {
    node.innerText = tempConversion(node.dataset.kelvin, _logic__WEBPACK_IMPORTED_MODULE_0__.userData.units);
  });
};

const radioBtnEvents = () => {
  const metricBtn = document.getElementById("radio-one");
  metricBtn.addEventListener("click", (e) => {
    if (_logic__WEBPACK_IMPORTED_MODULE_0__.userData.units !== "metric") {
      _logic__WEBPACK_IMPORTED_MODULE_0__.userData.units = "metric";
      localStorage.setItem("weather-app-user", JSON.stringify(_logic__WEBPACK_IMPORTED_MODULE_0__.userData));
      updateTemps();
    }
  });

  const imperialBtn = document.getElementById("radio-two");
  imperialBtn.addEventListener("click", (e) => {
    if (_logic__WEBPACK_IMPORTED_MODULE_0__.userData.units !== "imperial") {
      _logic__WEBPACK_IMPORTED_MODULE_0__.userData.units = "imperial";
      localStorage.setItem("weather-app-user", JSON.stringify(_logic__WEBPACK_IMPORTED_MODULE_0__.userData));
      updateTemps();
    }
  });
};

const setActiveRadio = () => {
  if (_logic__WEBPACK_IMPORTED_MODULE_0__.userData.units == "metric") {
    document.getElementById("radio-one").checked = true;
  } else if (_logic__WEBPACK_IMPORTED_MODULE_0__.userData.units == "imperial") {
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





const form = document.getElementById("weather-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = form["city"].value;
  (0,_logic__WEBPACK_IMPORTED_MODULE_0__.processWeatherJSON)(city).then((res) => {
    (0,_DOMContent__WEBPACK_IMPORTED_MODULE_1__.renderCard)(res, _logic__WEBPACK_IMPORTED_MODULE_0__.userData.units);
    _logic__WEBPACK_IMPORTED_MODULE_0__.userData.places.push(res.name);
    localStorage.setItem("weather-app-user", JSON.stringify(_logic__WEBPACK_IMPORTED_MODULE_0__.userData));
  });
});

(0,_DOMContent__WEBPACK_IMPORTED_MODULE_1__.setActiveRadio)();
(0,_DOMContent__WEBPACK_IMPORTED_MODULE_1__.radioBtnEvents)();

// consider re-writing for clarity
const loadWeatherCards = async (obj) => {
  Promise.all(
    obj.places.map(async (place) => {
      let data = await (0,_logic__WEBPACK_IMPORTED_MODULE_0__.processWeatherJSON)(place);
      (0,_DOMContent__WEBPACK_IMPORTED_MODULE_1__.renderCard)(data, _logic__WEBPACK_IMPORTED_MODULE_0__.userData.units);
    })
  );
};


loadWeatherCards(_logic__WEBPACK_IMPORTED_MODULE_0__.userData);


/***/ }),

/***/ "./src/logic.js":
/*!**********************!*\
  !*** ./src/logic.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "userData": () => /* binding */ userData,
/* harmony export */   "processWeatherJSON": () => /* binding */ processWeatherJSON
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

let userData = getData();





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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9ET01Db250ZW50LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2xvZ2ljLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQW1DOztBQUVuQztBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUMsU0FBUztBQUM1QyxVQUFVLFNBQVMsSUFBSSxZQUFZO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxTQUFTO0FBQzdEO0FBQ0EsR0FBRztBQUNILG9CQUFvQixnQkFBZ0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLFNBQVMsZ0JBQWdCO0FBQy9DO0FBQ0E7QUFDQSxJQUFJO0FBQ0osc0JBQXNCLFNBQVMsMkJBQTJCO0FBQzFEO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLCtCQUErQix3QkFBd0I7QUFDdkQsOEJBQThCLHVCQUF1QjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDJEQUF1QjtBQUN2QztBQUNBLE1BQU0sMERBQXNCO0FBQzVCO0FBQ0EsNERBQTRELDRDQUFRO0FBQ3BFLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBLE1BQU0sa0RBQWM7QUFDcEIsTUFBTTtBQUNOLEdBQUc7O0FBRUg7QUFDQTtBQUNBLHlEQUF5RCxrREFBYztBQUN2RSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSxrREFBYztBQUN0QixNQUFNLGtEQUFjO0FBQ3BCLDhEQUE4RCw0Q0FBUTtBQUN0RTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsUUFBUSxrREFBYztBQUN0QixNQUFNLGtEQUFjO0FBQ3BCLDhEQUE4RCw0Q0FBUTtBQUN0RTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0EsTUFBTSxrREFBYztBQUNwQjtBQUNBLEdBQUcsVUFBVSxrREFBYztBQUMzQjtBQUNBO0FBQ0E7O0FBRXNEOzs7Ozs7Ozs7Ozs7OztBQ3RIQTtBQUNvQjs7OztBQUkxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsMERBQWtCO0FBQ3BCLElBQUksdURBQVUsTUFBTSxrREFBYztBQUNsQyxJQUFJLHdEQUFvQjtBQUN4Qiw0REFBNEQsNENBQVE7QUFDcEUsR0FBRztBQUNILENBQUM7O0FBRUQsMkRBQWM7QUFDZCwyREFBYzs7QUFFZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QiwwREFBa0I7QUFDekMsTUFBTSx1REFBVSxPQUFPLGtEQUFjO0FBQ3JDLEtBQUs7QUFDTDtBQUNBOzs7QUFHQSxpQkFBaUIsNENBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5QnpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsU0FBUyxTQUFTLE1BQU07QUFDbkY7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRXVDOzs7Ozs7OztVQ3ZEdkM7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSxzRjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VyRGF0YSB9IGZyb20gXCIuL2xvZ2ljXCI7XG5cbmNvbnN0IHRlbXBDb252ZXJzaW9uID0gKGtlbHZpbiwgZGVzaXJlZFVuaXQpID0+IHtcbiAgaWYgKGRlc2lyZWRVbml0ID09PSBcImltcGVyaWFsXCIpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCgxLjggKiAoa2VsdmluIC0gMjczKSArIDMyKTtcbiAgfSBlbHNlIGlmIChkZXNpcmVkVW5pdCA9PT0gXCJtZXRyaWNcIikge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKGtlbHZpbiAtIDI3My4xNSk7XG4gIH1cbn07XG5cbi8vIGNvbnNpZGVyIHVzaW5nIGRhdGUtZm5zIHRvIGdldCB0aGUgdGltZXN0cmluZyBmb3IgdGhhdCBwYXJ0aWN1bGFyIGFyZWFcbmNvbnN0IGZvcm1hdFRpbWUgPSAodW5peCkgPT4ge1xuICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHVuaXggKiAxMDAwKTtcbiAgcmV0dXJuIGRhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKCkuc2xpY2UoMCwgNCk7XG59O1xuXG5jb25zdCBjcmVhdGVDYXJkID0gKG9iaiwgZGVzaXJlZFVuaXQpID0+IHtcbiAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNhcmQuY2xhc3NMaXN0LmFkZChcImNhcmRcIik7XG5cbiAgY2FyZC5pbm5lckhUTUwgPSBgXG4gIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgPGkgaWQ9XCJkZWxldGUtYnV0dG9uXCIgZGF0YS1pZD1cIiR7b2JqLm5hbWV9XCIgY2xhc3M9XCJmYXMgZmEtdGltZXMgY2xvc2VcIj48L2k+XG4gICAgPGgxPiR7b2JqLm5hbWV9LCAke29iai5jb3VudHJ5fTwvaDE+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwicm93IHdlYXRoZXItaW1nXCI+XG4gICAgPGZpZ3VyZT5cbiAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7b2JqLmljb259QDR4LnBuZ1wiIGFsdD1cIiR7XG4gICAgb2JqLmRlc2NyaXB0aW9uXG4gIH1cIj5cbiAgICAgIDxmaWdjYXB0aW9uPiR7b2JqLmRlc2NyaXB0aW9ufTwvZmlnY2FwdGlvbj5cbiAgICA8L2ZpZ3VyZT5cbiAgPC9kaXY+XG4gIDxkaXYgaWQ9XCJ0ZW1wLWRhdGFcIiBjbGFzcz1cInRlbXAtaW5mbyByb3dcIj5cbiAgICA8aDEgZGF0YS1rZWx2aW49JHtvYmoudGVtcH0gY2xhc3M9XCJ0ZW1wXCI+JHt0ZW1wQ29udmVyc2lvbihcbiAgICBvYmoudGVtcCxcbiAgICBkZXNpcmVkVW5pdFxuICApfSZkZWc8L2gxPlxuICAgIDxoMyBkYXRhLWtlbHZpbj0ke29iai5mZWVsfSBjbGFzcz1cImZlZWxcIj5GZWVscyBsaWtlICR7dGVtcENvbnZlcnNpb24oXG4gICAgb2JqLmZlZWwsXG4gICAgZGVzaXJlZFVuaXRcbiAgKX0mZGVnPC9oMz5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJyb3cgc3VuXCI+XG4gICAgPGgzIGNsYXNzPVwic3VuXCI+U3VucmlzZTogJHtmb3JtYXRUaW1lKG9iai5zdW5yaXNlKX08L2gyPlxuICAgIDxoMyBjbGFzcz1cInN1blwiPlN1bnNldDogJHtmb3JtYXRUaW1lKG9iai5zdW5zZXQpfTwvaDI+XG4gIDwvZGl2PlxuICBgO1xuICByZXR1cm4gY2FyZDtcbn07XG5cbmNvbnN0IGFkZERlbGV0ZUV2ZW50ID0gKGNhcmRDb250YWluZXIpID0+IHtcbiAgY29uc3QgY3VycmVudENhcmQgPSBjYXJkQ29udGFpbmVyLmxhc3RFbGVtZW50Q2hpbGQ7XG4gIGNvbnN0IGRlbGV0ZUJ0biA9IGN1cnJlbnRDYXJkLnF1ZXJ5U2VsZWN0b3IoXCIjZGVsZXRlLWJ1dHRvblwiKTtcbiAgZGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGN1cnJlbnRDYXJkLnJlbW92ZSgpO1xuICAgIGxldCBpbmRleCA9IHVzZXJEYXRhLnBsYWNlcy5pbmRleE9mKGUudGFyZ2V0LmRhdGFzZXQuaWQpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHVzZXJEYXRhLnBsYWNlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndlYXRoZXItYXBwLXVzZXJcIiwgSlNPTi5zdHJpbmdpZnkodXNlckRhdGEpKTtcbiAgfSk7XG59O1xuXG5jb25zdCBjYXJkRE9NQ29udGVudCA9IChjYXJkKSA9PiB7XG4gIGNvbnN0IGNhcmRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmQtY29udGFpbmVyXCIpO1xuICBjYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGNhcmQpO1xuICBhZGREZWxldGVFdmVudChjYXJkQ29udGFpbmVyKTtcbn07XG5cbmNvbnN0IHJlbmRlckNhcmQgPSAob2JqLCBkZXNpcmVkVW5pdCkgPT4ge1xuICBjb25zdCBjYXJkID0gY3JlYXRlQ2FyZChvYmosIGRlc2lyZWRVbml0KTtcbiAgY2FyZERPTUNvbnRlbnQoY2FyZCk7XG59O1xuXG5jb25zdCB1cGRhdGVUZW1wcyA9ICgpID0+IHtcbiAgY29uc3QgZmVlbE5vZGVzID0gQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZmVlbFwiKSk7XG4gIGZlZWxOb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgbm9kZS5pbm5lclRleHQgPSBgRmVlbHMgbGlrZSAke3RlbXBDb252ZXJzaW9uKFxuICAgICAgbm9kZS5kYXRhc2V0LmtlbHZpbixcbiAgICAgIHVzZXJEYXRhLnVuaXRzXG4gICAgKX1gO1xuICB9KTtcblxuICBjb25zdCB0ZW1wTm9kZXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0ZW1wXCIpKTtcbiAgdGVtcE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICBub2RlLmlubmVyVGV4dCA9IHRlbXBDb252ZXJzaW9uKG5vZGUuZGF0YXNldC5rZWx2aW4sIHVzZXJEYXRhLnVuaXRzKTtcbiAgfSk7XG59O1xuXG5jb25zdCByYWRpb0J0bkV2ZW50cyA9ICgpID0+IHtcbiAgY29uc3QgbWV0cmljQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpby1vbmVcIik7XG4gIG1ldHJpY0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBpZiAodXNlckRhdGEudW5pdHMgIT09IFwibWV0cmljXCIpIHtcbiAgICAgIHVzZXJEYXRhLnVuaXRzID0gXCJtZXRyaWNcIjtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid2VhdGhlci1hcHAtdXNlclwiLCBKU09OLnN0cmluZ2lmeSh1c2VyRGF0YSkpO1xuICAgICAgdXBkYXRlVGVtcHMoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IGltcGVyaWFsQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpby10d29cIik7XG4gIGltcGVyaWFsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGlmICh1c2VyRGF0YS51bml0cyAhPT0gXCJpbXBlcmlhbFwiKSB7XG4gICAgICB1c2VyRGF0YS51bml0cyA9IFwiaW1wZXJpYWxcIjtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid2VhdGhlci1hcHAtdXNlclwiLCBKU09OLnN0cmluZ2lmeSh1c2VyRGF0YSkpO1xuICAgICAgdXBkYXRlVGVtcHMoKTtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3Qgc2V0QWN0aXZlUmFkaW8gPSAoKSA9PiB7XG4gIGlmICh1c2VyRGF0YS51bml0cyA9PSBcIm1ldHJpY1wiKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpby1vbmVcIikuY2hlY2tlZCA9IHRydWU7XG4gIH0gZWxzZSBpZiAodXNlckRhdGEudW5pdHMgPT0gXCJpbXBlcmlhbFwiKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpby10d29cIikuY2hlY2tlZCA9IHRydWU7XG4gIH1cbn07XG5cbmV4cG9ydCB7IHJlbmRlckNhcmQsIHJhZGlvQnRuRXZlbnRzLCBzZXRBY3RpdmVSYWRpbyB9O1xuIiwiaW1wb3J0IHt1c2VyRGF0YSwgcHJvY2Vzc1dlYXRoZXJKU09OIH0gZnJvbSBcIi4vbG9naWNcIjtcbmltcG9ydCB7IHJhZGlvQnRuRXZlbnRzLCByZW5kZXJDYXJkLCBzZXRBY3RpdmVSYWRpbyB9IGZyb20gXCIuL0RPTUNvbnRlbnRcIjtcblxuXG5cbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXRoZXItZm9ybVwiKTtcbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGNpdHkgPSBmb3JtW1wiY2l0eVwiXS52YWx1ZTtcbiAgcHJvY2Vzc1dlYXRoZXJKU09OKGNpdHkpLnRoZW4oKHJlcykgPT4ge1xuICAgIHJlbmRlckNhcmQocmVzLCB1c2VyRGF0YS51bml0cyk7XG4gICAgdXNlckRhdGEucGxhY2VzLnB1c2gocmVzLm5hbWUpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid2VhdGhlci1hcHAtdXNlclwiLCBKU09OLnN0cmluZ2lmeSh1c2VyRGF0YSkpO1xuICB9KTtcbn0pO1xuXG5zZXRBY3RpdmVSYWRpbygpO1xucmFkaW9CdG5FdmVudHMoKTtcblxuLy8gY29uc2lkZXIgcmUtd3JpdGluZyBmb3IgY2xhcml0eVxuY29uc3QgbG9hZFdlYXRoZXJDYXJkcyA9IGFzeW5jIChvYmopID0+IHtcbiAgUHJvbWlzZS5hbGwoXG4gICAgb2JqLnBsYWNlcy5tYXAoYXN5bmMgKHBsYWNlKSA9PiB7XG4gICAgICBsZXQgZGF0YSA9IGF3YWl0IHByb2Nlc3NXZWF0aGVySlNPTihwbGFjZSk7XG4gICAgICByZW5kZXJDYXJkKGRhdGEsIHVzZXJEYXRhLnVuaXRzKTtcbiAgICB9KVxuICApO1xufTtcblxuXG5sb2FkV2VhdGhlckNhcmRzKHVzZXJEYXRhKTtcbiIsImNvbnN0IGdldERhdGEgPSAoKSA9PiB7XHJcbiAgbGV0IHVzZXJEYXRhO1xyXG4gIGlmIChsb2NhbFN0b3JhZ2UubGVuZ3RoKSB7XHJcbiAgICB1c2VyRGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ3ZWF0aGVyLWFwcC11c2VyXCIpKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdXNlckRhdGEgPSB7XHJcbiAgICAgIHVuaXRzOiBcImltcGVyaWFsXCIsXHJcbiAgICAgIHBsYWNlczogW1wiRGFsbGFzXCIsIFwiTmV3IFlvcmtcIl0sXHJcbiAgICB9O1xyXG4gIH1cclxuICByZXR1cm4gdXNlckRhdGE7XHJcbn07XHJcblxyXG4vLyBNYWtlcyBhIHJlcXVlc3QgdG8gdGhlIHdlYXRoZXIgQVBJIGZvciB3ZWF0aGVyIGRhdGEgYmFzZWQgb24gY2l0eSBuYW1lXHJcbmNvbnN0IGdldFdlYXRoZXJKU09OID0gYXN5bmMgKGNpdHlOYW1lKSA9PiB7XHJcbiAgY29uc3QgYXBwSUQgPSBcImQ4ZDYwYzhjODU5Y2IzZTMxZWJmMjQzOTYwZDljNjQyXCI7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXHJcbiAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eU5hbWV9JkFQUElEPSR7YXBwSUR9YCxcclxuICAgICAge1xyXG4gICAgICAgIG1vZGU6IFwiY29yc1wiXHJcbiAgICAgIH0pO1xyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAvLyBjb2RlIHRvIGhhbmRsZSBlcnJvciBnb2VzIGhlcmVcclxuICAgIHRocm93IGVycm9yO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIGNvbnNpZGVyIGRvaW5nIGEgdHJ5IGNhdGNoIGluIHRoZSB0b3AgbGV2ZWwgZnVuY3Rpb24gY2FsbCBvbmx5IGFzIHRoZSBwcm9taXNlIGVyciB3aWxsIHBhc3MgdGhyb3VnaCB0aGUgY2hhaW4gdG8gdGhlIGVuZFxyXG4vLyBwcm9jZXNzZXMganNvbiBkYXRhIGFuZCByZXR1cm5zIG9iamVjdCB3aXRoIG9ubHkgZGF0YSByZXF1aXJlZCBmb3Igb3VyIGFwcFxyXG5jb25zdCBwcm9jZXNzV2VhdGhlckpTT04gPSBhc3luYyAoY2l0eU5hbWUpID0+IHtcclxuICB0cnkge1xyXG4gICAgbGV0IGpzb24gPSBhd2FpdCBnZXRXZWF0aGVySlNPTihjaXR5TmFtZSk7XHJcbiAgICBjb25zb2xlLmxvZyhcImpzb24gb3V0cHV0ID0gXCIsIGpzb24pO1xyXG4gICAgbGV0IG9iaiA9IHtcclxuICAgICAgbmFtZToganNvbi5uYW1lLFxyXG4gICAgICBjb3VudHJ5OiBqc29uLnN5cy5jb3VudHJ5LFxyXG4gICAgICB0ZW1wOiBqc29uLm1haW4udGVtcCxcclxuICAgICAgZmVlbDoganNvbi5tYWluLmZlZWxzX2xpa2UsXHJcbiAgICAgIHRpbWV6b25lOiBqc29uLnRpbWV6b25lLFxyXG4gICAgICBzdW5yaXNlOiBqc29uLnN5cy5zdW5yaXNlLFxyXG4gICAgICBzdW5zZXQ6IGpzb24uc3lzLnN1bnNldCxcclxuICAgICAgaWNvbjoganNvbi53ZWF0aGVyWzBdLmljb24sXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBqc29uLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIG9iajtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgdGhyb3cgZXJyb3I7XHJcbiAgfVxyXG59O1xyXG5cclxubGV0IHVzZXJEYXRhID0gZ2V0RGF0YSgpO1xyXG5cclxuZXhwb3J0IHt1c2VyRGF0YSwgcHJvY2Vzc1dlYXRoZXJKU09OIH07XHJcblxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=