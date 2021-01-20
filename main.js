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
    return Math.round(1.8*(kelvin - 273) + 32);
  }
  else if (desiredUnit === "metric") {
    return Math.round(kelvin - 273.15);
  }
}

// consider using date-fns to get the timestring for that particular area
const formatTime = (unix) => {
  let date = new Date(unix * 1000);
  return date.toLocaleTimeString().slice(0,4);
}

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
      <img src="http://openweathermap.org/img/wn/${obj.icon}@4x.png" alt="${obj.description}">
      <figcaption>${(obj.description)}</figcaption>
    </figure>
  </div>
  <div id="temp-data" class="temp-info row">
    <h1 data-kelvin=${obj.temp} class="temp">${tempConversion(obj.temp, desiredUnit)}&deg</h1>
    <h3 data-kelvin=${obj.feel} class="feel">Feels like ${tempConversion(obj.feel, desiredUnit)}&deg</h3>
  </div>
  <div class="row sun">
    <h3 class="sun">Sunrise: ${formatTime(obj.sunrise)}</h2>
    <h3 class="sun">Sunset: ${formatTime(obj.sunset)}</h2>
  </div>
  `;
  return card;
}

const addDeleteEvent = (cardContainer) => {
  const currentCard = cardContainer.lastElementChild;
  const deleteBtn = currentCard.querySelector("#delete-button");
  deleteBtn.addEventListener("click", (e) => {
    currentCard.remove();
    let index = _logic__WEBPACK_IMPORTED_MODULE_0__.userData.places.indexOf(e.target.dataset.id);
    if (index !== -1) {
      _logic__WEBPACK_IMPORTED_MODULE_0__.userData.places.splice(index, 1);
    }
    localStorage.setItem('user', JSON.stringify(_logic__WEBPACK_IMPORTED_MODULE_0__.userData));
  })
}

const cardDOMContent = (card) => {
  const cardContainer = document.querySelector(".card-container");
  cardContainer.appendChild(card);
  addDeleteEvent(cardContainer)
}


const renderCard = (obj, desiredUnit) => {
  const card = createCard(obj, desiredUnit);
  cardDOMContent(card);
}

const updateTemps = () => {
  const feelNodes = Array.from(document.getElementsByClassName("feel"));
  feelNodes.forEach((node)=> {
    node.innerText = `Feels like ${tempConversion(node.dataset.kelvin, _logic__WEBPACK_IMPORTED_MODULE_0__.userData.units)}`
  })

  const tempNodes = Array.from(document.getElementsByClassName("temp"));
  tempNodes.forEach((node) => {
    node.innerText = tempConversion(node.dataset.kelvin, _logic__WEBPACK_IMPORTED_MODULE_0__.userData.units);
  })
  
}

const radioBtnEvents = () => {
  const metricBtn = document.getElementById("radio-one");
  metricBtn.addEventListener("click", (e) => {
    if (_logic__WEBPACK_IMPORTED_MODULE_0__.userData.units !== "metric"){
      _logic__WEBPACK_IMPORTED_MODULE_0__.userData.units = "metric";
      localStorage.setItem('user', JSON.stringify(_logic__WEBPACK_IMPORTED_MODULE_0__.userData));
      updateTemps();
    }
  })

  const imperialBtn = document.getElementById("radio-two");
  imperialBtn.addEventListener("click", (e) => {
    if (_logic__WEBPACK_IMPORTED_MODULE_0__.userData.units !== "imperial"){
      _logic__WEBPACK_IMPORTED_MODULE_0__.userData.units = "imperial";
      localStorage.setItem('user', JSON.stringify(_logic__WEBPACK_IMPORTED_MODULE_0__.userData));
      updateTemps();
    }
  })
}

const setActiveRadio = () => {
  if(_logic__WEBPACK_IMPORTED_MODULE_0__.userData.units == "metric") {
    document.getElementById("radio-one").checked = true;
  }
  else if (_logic__WEBPACK_IMPORTED_MODULE_0__.userData.units == "imperial") {
    document.getElementById("radio-two").checked = true;
  }
}






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
  const city = form['city'].value;
  (0,_logic__WEBPACK_IMPORTED_MODULE_0__.processWeatherJSON)(city).then((res) => {
    (0,_DOMContent__WEBPACK_IMPORTED_MODULE_1__.renderCard)(res, _logic__WEBPACK_IMPORTED_MODULE_0__.userData.units)
    _logic__WEBPACK_IMPORTED_MODULE_0__.userData.places.push(res.name)
    localStorage.setItem('user', JSON.stringify(_logic__WEBPACK_IMPORTED_MODULE_0__.userData));
  })
})

;(0,_DOMContent__WEBPACK_IMPORTED_MODULE_1__.setActiveRadio)();
(0,_DOMContent__WEBPACK_IMPORTED_MODULE_1__.radioBtnEvents)();

// consider re-writing for clarity
const loadWeatherCards = async (obj) => {
  Promise.all(obj.places.map(async (place) => {
    let data = await (0,_logic__WEBPACK_IMPORTED_MODULE_0__.processWeatherJSON)(place);
    (0,_DOMContent__WEBPACK_IMPORTED_MODULE_1__.renderCard)(data, _logic__WEBPACK_IMPORTED_MODULE_0__.userData.units);
  }))
}

loadWeatherCards(_logic__WEBPACK_IMPORTED_MODULE_0__.userData)



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
    userData = JSON.parse(localStorage.getItem('user'));
  } else {
    userData = {
      units: 'imperial',
      places: ['Dallas', "New York"],
    }
  }
  return userData;
};

// Makes a request to the weather API for weather data based on city name
const getWeatherJSON = async (cityName) => {
  const appID = "d8d60c8c859cb3e31ebf243960d9c642";
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${appID}`
    );
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


const userData = getData();





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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9ET01Db250ZW50LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2xvZ2ljLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQW1DOztBQUVuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUMsU0FBUztBQUM1QyxVQUFVLFNBQVMsSUFBSSxZQUFZO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxTQUFTLGdCQUFnQixnQkFBZ0I7QUFDNUYsb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsU0FBUyxnQkFBZ0Isc0NBQXNDO0FBQ3JGLHNCQUFzQixTQUFTLDJCQUEyQixzQ0FBc0M7QUFDaEc7QUFDQTtBQUNBLCtCQUErQix3QkFBd0I7QUFDdkQsOEJBQThCLHVCQUF1QjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDJEQUF1QjtBQUN2QztBQUNBLE1BQU0sMERBQXNCO0FBQzVCO0FBQ0EsZ0RBQWdELDRDQUFRO0FBQ3hELEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsb0NBQW9DLGtEQUFjLEVBQUU7QUFDdkYsR0FBRzs7QUFFSDtBQUNBO0FBQ0EseURBQXlELGtEQUFjO0FBQ3ZFLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSxrREFBYztBQUN0QixNQUFNLGtEQUFjO0FBQ3BCLGtEQUFrRCw0Q0FBUTtBQUMxRDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsUUFBUSxrREFBYztBQUN0QixNQUFNLGtEQUFjO0FBQ3BCLGtEQUFrRCw0Q0FBUTtBQUMxRDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0EsS0FBSyxrREFBYztBQUNuQjtBQUNBO0FBQ0EsV0FBVyxrREFBYztBQUN6QjtBQUNBO0FBQ0E7O0FBTUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuSHNEO0FBQ21COzs7QUFHMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLDBEQUFrQjtBQUNwQixJQUFJLHVEQUFVLE1BQU0sa0RBQWM7QUFDbEMsSUFBSSx3REFBb0I7QUFDeEIsZ0RBQWdELDRDQUFRO0FBQ3hELEdBQUc7QUFDSCxDQUFDOztBQUVELDREQUFjO0FBQ2QsMkRBQWM7O0FBRWQ7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDBEQUFrQjtBQUN2QyxJQUFJLHVEQUFVLE9BQU8sa0RBQWM7QUFDbkMsR0FBRztBQUNIOztBQUVBLGlCQUFpQiw0Q0FBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQnpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwREFBMEQsU0FBUyxTQUFTLE1BQU07QUFDbEY7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7OztBQUdBOzs7Ozs7Ozs7O1VDcERBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3JCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsc0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlckRhdGEgfSBmcm9tIFwiLi9sb2dpY1wiO1xyXG5cclxuY29uc3QgdGVtcENvbnZlcnNpb24gPSAoa2VsdmluLCBkZXNpcmVkVW5pdCkgPT4ge1xyXG4gIGlmIChkZXNpcmVkVW5pdCA9PT0gXCJpbXBlcmlhbFwiKSB7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZCgxLjgqKGtlbHZpbiAtIDI3MykgKyAzMik7XHJcbiAgfVxyXG4gIGVsc2UgaWYgKGRlc2lyZWRVbml0ID09PSBcIm1ldHJpY1wiKSB7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZChrZWx2aW4gLSAyNzMuMTUpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gY29uc2lkZXIgdXNpbmcgZGF0ZS1mbnMgdG8gZ2V0IHRoZSB0aW1lc3RyaW5nIGZvciB0aGF0IHBhcnRpY3VsYXIgYXJlYVxyXG5jb25zdCBmb3JtYXRUaW1lID0gKHVuaXgpID0+IHtcclxuICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHVuaXggKiAxMDAwKTtcclxuICByZXR1cm4gZGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoKS5zbGljZSgwLDQpO1xyXG59XHJcblxyXG5jb25zdCBjcmVhdGVDYXJkID0gKG9iaiwgZGVzaXJlZFVuaXQpID0+IHtcclxuICBjb25zdCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjYXJkLmNsYXNzTGlzdC5hZGQoXCJjYXJkXCIpO1xyXG5cclxuICBjYXJkLmlubmVySFRNTCA9IGBcclxuICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgPGkgaWQ9XCJkZWxldGUtYnV0dG9uXCIgZGF0YS1pZD1cIiR7b2JqLm5hbWV9XCIgY2xhc3M9XCJmYXMgZmEtdGltZXMgY2xvc2VcIj48L2k+XHJcbiAgICA8aDE+JHtvYmoubmFtZX0sICR7b2JqLmNvdW50cnl9PC9oMT5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwicm93IHdlYXRoZXItaW1nXCI+XHJcbiAgICA8ZmlndXJlPlxyXG4gICAgICA8aW1nIHNyYz1cImh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7b2JqLmljb259QDR4LnBuZ1wiIGFsdD1cIiR7b2JqLmRlc2NyaXB0aW9ufVwiPlxyXG4gICAgICA8ZmlnY2FwdGlvbj4keyhvYmouZGVzY3JpcHRpb24pfTwvZmlnY2FwdGlvbj5cclxuICAgIDwvZmlndXJlPlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgaWQ9XCJ0ZW1wLWRhdGFcIiBjbGFzcz1cInRlbXAtaW5mbyByb3dcIj5cclxuICAgIDxoMSBkYXRhLWtlbHZpbj0ke29iai50ZW1wfSBjbGFzcz1cInRlbXBcIj4ke3RlbXBDb252ZXJzaW9uKG9iai50ZW1wLCBkZXNpcmVkVW5pdCl9JmRlZzwvaDE+XHJcbiAgICA8aDMgZGF0YS1rZWx2aW49JHtvYmouZmVlbH0gY2xhc3M9XCJmZWVsXCI+RmVlbHMgbGlrZSAke3RlbXBDb252ZXJzaW9uKG9iai5mZWVsLCBkZXNpcmVkVW5pdCl9JmRlZzwvaDM+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cInJvdyBzdW5cIj5cclxuICAgIDxoMyBjbGFzcz1cInN1blwiPlN1bnJpc2U6ICR7Zm9ybWF0VGltZShvYmouc3VucmlzZSl9PC9oMj5cclxuICAgIDxoMyBjbGFzcz1cInN1blwiPlN1bnNldDogJHtmb3JtYXRUaW1lKG9iai5zdW5zZXQpfTwvaDI+XHJcbiAgPC9kaXY+XHJcbiAgYDtcclxuICByZXR1cm4gY2FyZDtcclxufVxyXG5cclxuY29uc3QgYWRkRGVsZXRlRXZlbnQgPSAoY2FyZENvbnRhaW5lcikgPT4ge1xyXG4gIGNvbnN0IGN1cnJlbnRDYXJkID0gY2FyZENvbnRhaW5lci5sYXN0RWxlbWVudENoaWxkO1xyXG4gIGNvbnN0IGRlbGV0ZUJ0biA9IGN1cnJlbnRDYXJkLnF1ZXJ5U2VsZWN0b3IoXCIjZGVsZXRlLWJ1dHRvblwiKTtcclxuICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICBjdXJyZW50Q2FyZC5yZW1vdmUoKTtcclxuICAgIGxldCBpbmRleCA9IHVzZXJEYXRhLnBsYWNlcy5pbmRleE9mKGUudGFyZ2V0LmRhdGFzZXQuaWQpO1xyXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgICB1c2VyRGF0YS5wbGFjZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyJywgSlNPTi5zdHJpbmdpZnkodXNlckRhdGEpKTtcclxuICB9KVxyXG59XHJcblxyXG5jb25zdCBjYXJkRE9NQ29udGVudCA9IChjYXJkKSA9PiB7XHJcbiAgY29uc3QgY2FyZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZC1jb250YWluZXJcIik7XHJcbiAgY2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChjYXJkKTtcclxuICBhZGREZWxldGVFdmVudChjYXJkQ29udGFpbmVyKVxyXG59XHJcblxyXG5cclxuY29uc3QgcmVuZGVyQ2FyZCA9IChvYmosIGRlc2lyZWRVbml0KSA9PiB7XHJcbiAgY29uc3QgY2FyZCA9IGNyZWF0ZUNhcmQob2JqLCBkZXNpcmVkVW5pdCk7XHJcbiAgY2FyZERPTUNvbnRlbnQoY2FyZCk7XHJcbn1cclxuXHJcbmNvbnN0IHVwZGF0ZVRlbXBzID0gKCkgPT4ge1xyXG4gIGNvbnN0IGZlZWxOb2RlcyA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImZlZWxcIikpO1xyXG4gIGZlZWxOb2Rlcy5mb3JFYWNoKChub2RlKT0+IHtcclxuICAgIG5vZGUuaW5uZXJUZXh0ID0gYEZlZWxzIGxpa2UgJHt0ZW1wQ29udmVyc2lvbihub2RlLmRhdGFzZXQua2VsdmluLCB1c2VyRGF0YS51bml0cyl9YFxyXG4gIH0pXHJcblxyXG4gIGNvbnN0IHRlbXBOb2RlcyA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRlbXBcIikpO1xyXG4gIHRlbXBOb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XHJcbiAgICBub2RlLmlubmVyVGV4dCA9IHRlbXBDb252ZXJzaW9uKG5vZGUuZGF0YXNldC5rZWx2aW4sIHVzZXJEYXRhLnVuaXRzKTtcclxuICB9KVxyXG4gIFxyXG59XHJcblxyXG5jb25zdCByYWRpb0J0bkV2ZW50cyA9ICgpID0+IHtcclxuICBjb25zdCBtZXRyaWNCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhZGlvLW9uZVwiKTtcclxuICBtZXRyaWNCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICBpZiAodXNlckRhdGEudW5pdHMgIT09IFwibWV0cmljXCIpe1xyXG4gICAgICB1c2VyRGF0YS51bml0cyA9IFwibWV0cmljXCI7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyJywgSlNPTi5zdHJpbmdpZnkodXNlckRhdGEpKTtcclxuICAgICAgdXBkYXRlVGVtcHMoKTtcclxuICAgIH1cclxuICB9KVxyXG5cclxuICBjb25zdCBpbXBlcmlhbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFkaW8tdHdvXCIpO1xyXG4gIGltcGVyaWFsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgaWYgKHVzZXJEYXRhLnVuaXRzICE9PSBcImltcGVyaWFsXCIpe1xyXG4gICAgICB1c2VyRGF0YS51bml0cyA9IFwiaW1wZXJpYWxcIjtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXInLCBKU09OLnN0cmluZ2lmeSh1c2VyRGF0YSkpO1xyXG4gICAgICB1cGRhdGVUZW1wcygpO1xyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmNvbnN0IHNldEFjdGl2ZVJhZGlvID0gKCkgPT4ge1xyXG4gIGlmKHVzZXJEYXRhLnVuaXRzID09IFwibWV0cmljXCIpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFkaW8tb25lXCIpLmNoZWNrZWQgPSB0cnVlO1xyXG4gIH1cclxuICBlbHNlIGlmICh1c2VyRGF0YS51bml0cyA9PSBcImltcGVyaWFsXCIpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFkaW8tdHdvXCIpLmNoZWNrZWQgPSB0cnVlO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICByZW5kZXJDYXJkLFxyXG4gIHJhZGlvQnRuRXZlbnRzLFxyXG4gIHNldEFjdGl2ZVJhZGlvLFxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IHsgdXNlckRhdGEsIHByb2Nlc3NXZWF0aGVySlNPTiB9IGZyb20gXCIuL2xvZ2ljXCI7XG5pbXBvcnQgeyByYWRpb0J0bkV2ZW50cywgcmVuZGVyQ2FyZCwgc2V0QWN0aXZlUmFkaW8gfSBmcm9tIFwiLi9ET01Db250ZW50XCI7XG5cblxuY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2VhdGhlci1mb3JtXCIpO1xuZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3QgY2l0eSA9IGZvcm1bJ2NpdHknXS52YWx1ZTtcbiAgcHJvY2Vzc1dlYXRoZXJKU09OKGNpdHkpLnRoZW4oKHJlcykgPT4ge1xuICAgIHJlbmRlckNhcmQocmVzLCB1c2VyRGF0YS51bml0cylcbiAgICB1c2VyRGF0YS5wbGFjZXMucHVzaChyZXMubmFtZSlcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcicsIEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKSk7XG4gIH0pXG59KVxuXG5zZXRBY3RpdmVSYWRpbygpO1xucmFkaW9CdG5FdmVudHMoKTtcblxuLy8gY29uc2lkZXIgcmUtd3JpdGluZyBmb3IgY2xhcml0eVxuY29uc3QgbG9hZFdlYXRoZXJDYXJkcyA9IGFzeW5jIChvYmopID0+IHtcbiAgUHJvbWlzZS5hbGwob2JqLnBsYWNlcy5tYXAoYXN5bmMgKHBsYWNlKSA9PiB7XG4gICAgbGV0IGRhdGEgPSBhd2FpdCBwcm9jZXNzV2VhdGhlckpTT04ocGxhY2UpO1xuICAgIHJlbmRlckNhcmQoZGF0YSwgdXNlckRhdGEudW5pdHMpO1xuICB9KSlcbn1cblxubG9hZFdlYXRoZXJDYXJkcyh1c2VyRGF0YSlcblxuIiwiY29uc3QgZ2V0RGF0YSA9ICgpID0+IHtcbiAgbGV0IHVzZXJEYXRhO1xuICBpZiAobG9jYWxTdG9yYWdlLmxlbmd0aCkge1xuICAgIHVzZXJEYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcicpKTtcbiAgfSBlbHNlIHtcbiAgICB1c2VyRGF0YSA9IHtcbiAgICAgIHVuaXRzOiAnaW1wZXJpYWwnLFxuICAgICAgcGxhY2VzOiBbJ0RhbGxhcycsIFwiTmV3IFlvcmtcIl0sXG4gICAgfVxuICB9XG4gIHJldHVybiB1c2VyRGF0YTtcbn07XG5cbi8vIE1ha2VzIGEgcmVxdWVzdCB0byB0aGUgd2VhdGhlciBBUEkgZm9yIHdlYXRoZXIgZGF0YSBiYXNlZCBvbiBjaXR5IG5hbWVcbmNvbnN0IGdldFdlYXRoZXJKU09OID0gYXN5bmMgKGNpdHlOYW1lKSA9PiB7XG4gIGNvbnN0IGFwcElEID0gXCJkOGQ2MGM4Yzg1OWNiM2UzMWViZjI0Mzk2MGQ5YzY0MlwiO1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eU5hbWV9JkFQUElEPSR7YXBwSUR9YFxuICAgICk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvLyBjb2RlIHRvIGhhbmRsZSBlcnJvciBnb2VzIGhlcmVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxuLy8gY29uc2lkZXIgZG9pbmcgYSB0cnkgY2F0Y2ggaW4gdGhlIHRvcCBsZXZlbCBmdW5jdGlvbiBjYWxsIG9ubHkgYXMgdGhlIHByb21pc2UgZXJyIHdpbGwgcGFzcyB0aHJvdWdoIHRoZSBjaGFpbiB0byB0aGUgZW5kXG4vLyBwcm9jZXNzZXMganNvbiBkYXRhIGFuZCByZXR1cm5zIG9iamVjdCB3aXRoIG9ubHkgZGF0YSByZXF1aXJlZCBmb3Igb3VyIGFwcFxuY29uc3QgcHJvY2Vzc1dlYXRoZXJKU09OID0gYXN5bmMgKGNpdHlOYW1lKSA9PiB7XG4gIHRyeSB7XG4gICAgbGV0IGpzb24gPSBhd2FpdCBnZXRXZWF0aGVySlNPTihjaXR5TmFtZSk7XG4gICAgY29uc29sZS5sb2coXCJqc29uIG91dHB1dCA9IFwiLCBqc29uKTtcbiAgICBsZXQgb2JqID0ge1xuICAgICAgbmFtZToganNvbi5uYW1lLFxuICAgICAgY291bnRyeToganNvbi5zeXMuY291bnRyeSxcbiAgICAgIHRlbXA6IGpzb24ubWFpbi50ZW1wLFxuICAgICAgZmVlbDoganNvbi5tYWluLmZlZWxzX2xpa2UsXG4gICAgICB0aW1lem9uZToganNvbi50aW1lem9uZSxcbiAgICAgIHN1bnJpc2U6IGpzb24uc3lzLnN1bnJpc2UsXG4gICAgICBzdW5zZXQ6IGpzb24uc3lzLnN1bnNldCxcbiAgICAgIGljb246IGpzb24ud2VhdGhlclswXS5pY29uLFxuICAgICAgZGVzY3JpcHRpb246IGpzb24ud2VhdGhlclswXS5kZXNjcmlwdGlvbixcbiAgICB9O1xuICAgIHJldHVybiBvYmo7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn07XG5cblxuY29uc3QgdXNlckRhdGEgPSBnZXREYXRhKCk7XG5cblxuXG5leHBvcnQge1xuICB1c2VyRGF0YSxcbiAgcHJvY2Vzc1dlYXRoZXJKU09OLFxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==