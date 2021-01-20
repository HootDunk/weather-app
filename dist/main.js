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
/* harmony export */   "renderCard": () => /* binding */ renderCard
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
      <figcaption>${obj.description}</figcaption>
    </figure>
  </div>
  <div id="temp-data" class="temp-info row">
    <h1 class="temp">${tempConversion(obj.temp, desiredUnit)}&deg</h1>
    <h3>Feels like ${tempConversion(obj.feel, desiredUnit)}&deg</h3>
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
    console.log(_logic__WEBPACK_IMPORTED_MODULE_0__.userData)
    // import logic funtion and remove the place from the object array
    // then save
    localStorage.setItem('user', JSON.stringify(_logic__WEBPACK_IMPORTED_MODULE_0__.userData));
  })
}

const cardDOMContent = (card) => {
  const cardContainer = document.querySelector(".card-container");
  cardContainer.appendChild(card);
  // function to add delete event call

  addDeleteEvent(cardContainer)
}


// const formSubmitEvent = () => {
//   const form = document.getElementById("weather-form");
//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const city = form['city'].value;
//     processWeatherJSON(city).then((res) => {
//       renderCard(res, userData.units)
//       userData.places.push(res.name)
//       localStorage.setItem('user', JSON.stringify(userData));
//     })
//   })
// }


const renderCard = (obj, desiredUnit) => {
  const card = createCard(obj, desiredUnit);
  cardDOMContent(card);
}









// Import the logic function that removes the deleted place and call it from the event listener.

// on form submit
  // Get the new data and call the append function
  // if successful, add the place name to the userData object and save local storage

// on startup, iterate through the list of places and generate the cards with proper temp.
// keep temps in kelvin.
// process the temperature based on the users obj.unit

// on tempSwitch event, change obj.unit to opposite and the querySelect all temp divs and change their innerHTML, or get all
// h1's and h2s and change the innerTEXT



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logic */ "./src/logic.js");
/* harmony import */ var _DOMContent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOMContent */ "./src/DOMContent.js");




// formSubmitEvent();
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

// consider re-writing for clarity
const loadWeatherCards = async (obj) => {
  Promise.all(obj.places.map(async (place) => {
    let data = await (0,_logic__WEBPACK_IMPORTED_MODULE_0__.processWeatherJSON)(place);
    (0,_DOMContent__WEBPACK_IMPORTED_MODULE_1__.renderCard)(data, _logic__WEBPACK_IMPORTED_MODULE_0__.userData.units);
  }))
}


loadWeatherCards(_logic__WEBPACK_IMPORTED_MODULE_0__.userData)




// Separation of concerns
  // DOMstuff.js has all dom stuff
  // logic.js has code for data requests and cleaning
  // index.js has the event listeners

//call getWeatherImage in processWeatherJSON to create proper object
// include description underneath the image
// can just use the url with the proper format in the image source actually

// consider a blue color them for colder weather? like 40s and below
// maybe cold, neutral, and warm color scheme?


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9ET01Db250ZW50LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2xvZ2ljLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFtQzs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DLFNBQVM7QUFDNUMsVUFBVSxTQUFTLElBQUksWUFBWTtBQUNuQztBQUNBO0FBQ0E7QUFDQSxtREFBbUQsU0FBUyxnQkFBZ0IsZ0JBQWdCO0FBQzVGLG9CQUFvQixnQkFBZ0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNDQUFzQztBQUM3RCxxQkFBcUIsc0NBQXNDO0FBQzNEO0FBQ0E7QUFDQSwrQkFBK0Isd0JBQXdCO0FBQ3ZELDhCQUE4Qix1QkFBdUI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IsMkRBQXVCO0FBQ3ZDO0FBQ0EsTUFBTSwwREFBc0I7QUFDNUI7QUFDQSxnQkFBZ0IsNENBQVE7QUFDeEI7QUFDQTtBQUNBLGdEQUFnRCw0Q0FBUTtBQUN4RCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSLE1BQU07QUFDTjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQVNDOzs7O0FBSUQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMvR3VEO0FBQ2I7OztBQUcxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSwwREFBa0I7QUFDcEIsSUFBSSx1REFBVSxNQUFNLGtEQUFjO0FBQ2xDLElBQUksd0RBQW9CO0FBQ3hCLGdEQUFnRCw0Q0FBUTtBQUN4RCxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMERBQWtCO0FBQ3ZDLElBQUksdURBQVUsT0FBTyxrREFBYztBQUNuQyxHQUFHO0FBQ0g7OztBQUdBLGlCQUFpQiw0Q0FBUTs7Ozs7QUFLekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBELFNBQVMsU0FBUyxNQUFNO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOzs7QUFHQTs7Ozs7Ozs7Ozs7VUN0REE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSxzRjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VyRGF0YSB9IGZyb20gXCIuL2xvZ2ljXCI7XHJcblxyXG5jb25zdCB0ZW1wQ29udmVyc2lvbiA9IChrZWx2aW4sIGRlc2lyZWRVbml0KSA9PiB7XHJcbiAgaWYgKGRlc2lyZWRVbml0ID09PSBcImltcGVyaWFsXCIpIHtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKDEuOCooa2VsdmluIC0gMjczKSArIDMyKTtcclxuICB9XHJcbiAgZWxzZSBpZiAoZGVzaXJlZFVuaXQgPT09IFwibWV0cmljXCIpIHtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKGtlbHZpbiAtIDI3My4xNSk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBjb25zaWRlciB1c2luZyBkYXRlLWZucyB0byBnZXQgdGhlIHRpbWVzdHJpbmcgZm9yIHRoYXQgcGFydGljdWxhciBhcmVhXHJcbmNvbnN0IGZvcm1hdFRpbWUgPSAodW5peCkgPT4ge1xyXG4gIGxldCBkYXRlID0gbmV3IERhdGUodW5peCAqIDEwMDApO1xyXG4gIHJldHVybiBkYXRlLnRvTG9jYWxlVGltZVN0cmluZygpLnNsaWNlKDAsNCk7XHJcbn1cclxuXHJcbmNvbnN0IGNyZWF0ZUNhcmQgPSAob2JqLCBkZXNpcmVkVW5pdCkgPT4ge1xyXG4gIGNvbnN0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGNhcmQuY2xhc3NMaXN0LmFkZChcImNhcmRcIik7XHJcblxyXG4gIGNhcmQuaW5uZXJIVE1MID0gYFxyXG4gIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICA8aSBpZD1cImRlbGV0ZS1idXR0b25cIiBkYXRhLWlkPVwiJHtvYmoubmFtZX1cIiBjbGFzcz1cImZhcyBmYS10aW1lcyBjbG9zZVwiPjwvaT5cclxuICAgIDxoMT4ke29iai5uYW1lfSwgJHtvYmouY291bnRyeX08L2gxPlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJyb3cgd2VhdGhlci1pbWdcIj5cclxuICAgIDxmaWd1cmU+XHJcbiAgICAgIDxpbWcgc3JjPVwiaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtvYmouaWNvbn1ANHgucG5nXCIgYWx0PVwiJHtvYmouZGVzY3JpcHRpb259XCI+XHJcbiAgICAgIDxmaWdjYXB0aW9uPiR7b2JqLmRlc2NyaXB0aW9ufTwvZmlnY2FwdGlvbj5cclxuICAgIDwvZmlndXJlPlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgaWQ9XCJ0ZW1wLWRhdGFcIiBjbGFzcz1cInRlbXAtaW5mbyByb3dcIj5cclxuICAgIDxoMSBjbGFzcz1cInRlbXBcIj4ke3RlbXBDb252ZXJzaW9uKG9iai50ZW1wLCBkZXNpcmVkVW5pdCl9JmRlZzwvaDE+XHJcbiAgICA8aDM+RmVlbHMgbGlrZSAke3RlbXBDb252ZXJzaW9uKG9iai5mZWVsLCBkZXNpcmVkVW5pdCl9JmRlZzwvaDM+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cInJvdyBzdW5cIj5cclxuICAgIDxoMyBjbGFzcz1cInN1blwiPlN1bnJpc2U6ICR7Zm9ybWF0VGltZShvYmouc3VucmlzZSl9PC9oMj5cclxuICAgIDxoMyBjbGFzcz1cInN1blwiPlN1bnNldDogJHtmb3JtYXRUaW1lKG9iai5zdW5zZXQpfTwvaDI+XHJcbiAgPC9kaXY+XHJcbiAgYDtcclxuICByZXR1cm4gY2FyZDtcclxufVxyXG5cclxuY29uc3QgYWRkRGVsZXRlRXZlbnQgPSAoY2FyZENvbnRhaW5lcikgPT4ge1xyXG4gIGNvbnN0IGN1cnJlbnRDYXJkID0gY2FyZENvbnRhaW5lci5sYXN0RWxlbWVudENoaWxkO1xyXG4gIGNvbnN0IGRlbGV0ZUJ0biA9IGN1cnJlbnRDYXJkLnF1ZXJ5U2VsZWN0b3IoXCIjZGVsZXRlLWJ1dHRvblwiKTtcclxuICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICBjdXJyZW50Q2FyZC5yZW1vdmUoKTtcclxuXHJcbiAgICBsZXQgaW5kZXggPSB1c2VyRGF0YS5wbGFjZXMuaW5kZXhPZihlLnRhcmdldC5kYXRhc2V0LmlkKTtcclxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuICAgICAgdXNlckRhdGEucGxhY2VzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyh1c2VyRGF0YSlcclxuICAgIC8vIGltcG9ydCBsb2dpYyBmdW50aW9uIGFuZCByZW1vdmUgdGhlIHBsYWNlIGZyb20gdGhlIG9iamVjdCBhcnJheVxyXG4gICAgLy8gdGhlbiBzYXZlXHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcicsIEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKSk7XHJcbiAgfSlcclxufVxyXG5cclxuY29uc3QgY2FyZERPTUNvbnRlbnQgPSAoY2FyZCkgPT4ge1xyXG4gIGNvbnN0IGNhcmRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmQtY29udGFpbmVyXCIpO1xyXG4gIGNhcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoY2FyZCk7XHJcbiAgLy8gZnVuY3Rpb24gdG8gYWRkIGRlbGV0ZSBldmVudCBjYWxsXHJcblxyXG4gIGFkZERlbGV0ZUV2ZW50KGNhcmRDb250YWluZXIpXHJcbn1cclxuXHJcblxyXG4vLyBjb25zdCBmb3JtU3VibWl0RXZlbnQgPSAoKSA9PiB7XHJcbi8vICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2VhdGhlci1mb3JtXCIpO1xyXG4vLyAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xyXG4vLyAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4vLyAgICAgY29uc3QgY2l0eSA9IGZvcm1bJ2NpdHknXS52YWx1ZTtcclxuLy8gICAgIHByb2Nlc3NXZWF0aGVySlNPTihjaXR5KS50aGVuKChyZXMpID0+IHtcclxuLy8gICAgICAgcmVuZGVyQ2FyZChyZXMsIHVzZXJEYXRhLnVuaXRzKVxyXG4vLyAgICAgICB1c2VyRGF0YS5wbGFjZXMucHVzaChyZXMubmFtZSlcclxuLy8gICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXInLCBKU09OLnN0cmluZ2lmeSh1c2VyRGF0YSkpO1xyXG4vLyAgICAgfSlcclxuLy8gICB9KVxyXG4vLyB9XHJcblxyXG5cclxuY29uc3QgcmVuZGVyQ2FyZCA9IChvYmosIGRlc2lyZWRVbml0KSA9PiB7XHJcbiAgY29uc3QgY2FyZCA9IGNyZWF0ZUNhcmQob2JqLCBkZXNpcmVkVW5pdCk7XHJcbiAgY2FyZERPTUNvbnRlbnQoY2FyZCk7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQge1xyXG4gIHJlbmRlckNhcmQsXHJcbiAgLy8gZm9ybVN1Ym1pdEV2ZW50LFxyXG59XHJcblxyXG5cclxuXHJcbi8vIEltcG9ydCB0aGUgbG9naWMgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBkZWxldGVkIHBsYWNlIGFuZCBjYWxsIGl0IGZyb20gdGhlIGV2ZW50IGxpc3RlbmVyLlxyXG5cclxuLy8gb24gZm9ybSBzdWJtaXRcclxuICAvLyBHZXQgdGhlIG5ldyBkYXRhIGFuZCBjYWxsIHRoZSBhcHBlbmQgZnVuY3Rpb25cclxuICAvLyBpZiBzdWNjZXNzZnVsLCBhZGQgdGhlIHBsYWNlIG5hbWUgdG8gdGhlIHVzZXJEYXRhIG9iamVjdCBhbmQgc2F2ZSBsb2NhbCBzdG9yYWdlXHJcblxyXG4vLyBvbiBzdGFydHVwLCBpdGVyYXRlIHRocm91Z2ggdGhlIGxpc3Qgb2YgcGxhY2VzIGFuZCBnZW5lcmF0ZSB0aGUgY2FyZHMgd2l0aCBwcm9wZXIgdGVtcC5cclxuLy8ga2VlcCB0ZW1wcyBpbiBrZWx2aW4uXHJcbi8vIHByb2Nlc3MgdGhlIHRlbXBlcmF0dXJlIGJhc2VkIG9uIHRoZSB1c2VycyBvYmoudW5pdFxyXG5cclxuLy8gb24gdGVtcFN3aXRjaCBldmVudCwgY2hhbmdlIG9iai51bml0IHRvIG9wcG9zaXRlIGFuZCB0aGUgcXVlcnlTZWxlY3QgYWxsIHRlbXAgZGl2cyBhbmQgY2hhbmdlIHRoZWlyIGlubmVySFRNTCwgb3IgZ2V0IGFsbFxyXG4vLyBoMSdzIGFuZCBoMnMgYW5kIGNoYW5nZSB0aGUgaW5uZXJURVhUXHJcblxyXG4iLCJpbXBvcnQgeyB1c2VyRGF0YSwgcHJvY2Vzc1dlYXRoZXJKU09OIH0gZnJvbSBcIi4vbG9naWNcIjtcbmltcG9ydCB7IHJlbmRlckNhcmQgfSBmcm9tIFwiLi9ET01Db250ZW50XCI7XG5cblxuLy8gZm9ybVN1Ym1pdEV2ZW50KCk7XG5jb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWF0aGVyLWZvcm1cIik7XG5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBjaXR5ID0gZm9ybVsnY2l0eSddLnZhbHVlO1xuICBwcm9jZXNzV2VhdGhlckpTT04oY2l0eSkudGhlbigocmVzKSA9PiB7XG4gICAgcmVuZGVyQ2FyZChyZXMsIHVzZXJEYXRhLnVuaXRzKVxuICAgIHVzZXJEYXRhLnBsYWNlcy5wdXNoKHJlcy5uYW1lKVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyJywgSlNPTi5zdHJpbmdpZnkodXNlckRhdGEpKTtcbiAgfSlcbn0pXG5cbi8vIGNvbnNpZGVyIHJlLXdyaXRpbmcgZm9yIGNsYXJpdHlcbmNvbnN0IGxvYWRXZWF0aGVyQ2FyZHMgPSBhc3luYyAob2JqKSA9PiB7XG4gIFByb21pc2UuYWxsKG9iai5wbGFjZXMubWFwKGFzeW5jIChwbGFjZSkgPT4ge1xuICAgIGxldCBkYXRhID0gYXdhaXQgcHJvY2Vzc1dlYXRoZXJKU09OKHBsYWNlKTtcbiAgICByZW5kZXJDYXJkKGRhdGEsIHVzZXJEYXRhLnVuaXRzKTtcbiAgfSkpXG59XG5cblxubG9hZFdlYXRoZXJDYXJkcyh1c2VyRGF0YSlcblxuXG5cblxuLy8gU2VwYXJhdGlvbiBvZiBjb25jZXJuc1xuICAvLyBET01zdHVmZi5qcyBoYXMgYWxsIGRvbSBzdHVmZlxuICAvLyBsb2dpYy5qcyBoYXMgY29kZSBmb3IgZGF0YSByZXF1ZXN0cyBhbmQgY2xlYW5pbmdcbiAgLy8gaW5kZXguanMgaGFzIHRoZSBldmVudCBsaXN0ZW5lcnNcblxuLy9jYWxsIGdldFdlYXRoZXJJbWFnZSBpbiBwcm9jZXNzV2VhdGhlckpTT04gdG8gY3JlYXRlIHByb3BlciBvYmplY3Rcbi8vIGluY2x1ZGUgZGVzY3JpcHRpb24gdW5kZXJuZWF0aCB0aGUgaW1hZ2Vcbi8vIGNhbiBqdXN0IHVzZSB0aGUgdXJsIHdpdGggdGhlIHByb3BlciBmb3JtYXQgaW4gdGhlIGltYWdlIHNvdXJjZSBhY3R1YWxseVxuXG4vLyBjb25zaWRlciBhIGJsdWUgY29sb3IgdGhlbSBmb3IgY29sZGVyIHdlYXRoZXI/IGxpa2UgNDBzIGFuZCBiZWxvd1xuLy8gbWF5YmUgY29sZCwgbmV1dHJhbCwgYW5kIHdhcm0gY29sb3Igc2NoZW1lP1xuIiwiXG5cbmNvbnN0IGdldERhdGEgPSAoKSA9PiB7XG4gIGxldCB1c2VyRGF0YTtcbiAgaWYgKGxvY2FsU3RvcmFnZS5sZW5ndGgpIHtcbiAgICB1c2VyRGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXInKSk7XG4gIH0gZWxzZSB7XG4gICAgdXNlckRhdGEgPSB7XG4gICAgICB1bml0czogJ2ltcGVyaWFsJyxcbiAgICAgIHBsYWNlczogWydEYWxsYXMnLCBcIk5ldyBZb3JrXCJdLFxuICAgIH1cbiAgfVxuICByZXR1cm4gdXNlckRhdGE7XG59O1xuXG4vLyBNYWtlcyBhIHJlcXVlc3QgdG8gdGhlIHdlYXRoZXIgQVBJIGZvciB3ZWF0aGVyIGRhdGEgYmFzZWQgb24gY2l0eSBuYW1lXG5jb25zdCBnZXRXZWF0aGVySlNPTiA9IGFzeW5jIChjaXR5TmFtZSkgPT4ge1xuICBjb25zdCBhcHBJRCA9IFwiZDhkNjBjOGM4NTljYjNlMzFlYmYyNDM5NjBkOWM2NDJcIjtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHlOYW1lfSZBUFBJRD0ke2FwcElEfWBcbiAgICApO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLy8gY29kZSB0byBoYW5kbGUgZXJyb3IgZ29lcyBoZXJlXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn07XG5cbi8vIGNvbnNpZGVyIGRvaW5nIGEgdHJ5IGNhdGNoIGluIHRoZSB0b3AgbGV2ZWwgZnVuY3Rpb24gY2FsbCBvbmx5IGFzIHRoZSBwcm9taXNlIGVyciB3aWxsIHBhc3MgdGhyb3VnaCB0aGUgY2hhaW4gdG8gdGhlIGVuZFxuLy8gcHJvY2Vzc2VzIGpzb24gZGF0YSBhbmQgcmV0dXJucyBvYmplY3Qgd2l0aCBvbmx5IGRhdGEgcmVxdWlyZWQgZm9yIG91ciBhcHBcbmNvbnN0IHByb2Nlc3NXZWF0aGVySlNPTiA9IGFzeW5jIChjaXR5TmFtZSkgPT4ge1xuICB0cnkge1xuICAgIGxldCBqc29uID0gYXdhaXQgZ2V0V2VhdGhlckpTT04oY2l0eU5hbWUpO1xuICAgIGNvbnNvbGUubG9nKFwianNvbiBvdXRwdXQgPSBcIiwganNvbik7XG4gICAgbGV0IG9iaiA9IHtcbiAgICAgIG5hbWU6IGpzb24ubmFtZSxcbiAgICAgIGNvdW50cnk6IGpzb24uc3lzLmNvdW50cnksXG4gICAgICB0ZW1wOiBqc29uLm1haW4udGVtcCxcbiAgICAgIGZlZWw6IGpzb24ubWFpbi5mZWVsc19saWtlLFxuICAgICAgdGltZXpvbmU6IGpzb24udGltZXpvbmUsXG4gICAgICBzdW5yaXNlOiBqc29uLnN5cy5zdW5yaXNlLFxuICAgICAgc3Vuc2V0OiBqc29uLnN5cy5zdW5zZXQsXG4gICAgICBpY29uOiBqc29uLndlYXRoZXJbMF0uaWNvbixcbiAgICAgIGRlc2NyaXB0aW9uOiBqc29uLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgfTtcbiAgICByZXR1cm4gb2JqO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuXG5cbmNvbnN0IHVzZXJEYXRhID0gZ2V0RGF0YSgpO1xuXG5cblxuXG5leHBvcnQge1xuICB1c2VyRGF0YSxcbiAgcHJvY2Vzc1dlYXRoZXJKU09OLFxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==