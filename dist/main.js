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
    localStorage.setItem("user", JSON.stringify(_logic__WEBPACK_IMPORTED_MODULE_0__.userData));
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
      localStorage.setItem("user", JSON.stringify(_logic__WEBPACK_IMPORTED_MODULE_0__.userData));
      updateTemps();
    }
  });

  const imperialBtn = document.getElementById("radio-two");
  imperialBtn.addEventListener("click", (e) => {
    if (_logic__WEBPACK_IMPORTED_MODULE_0__.userData.units !== "imperial") {
      _logic__WEBPACK_IMPORTED_MODULE_0__.userData.units = "imperial";
      localStorage.setItem("user", JSON.stringify(_logic__WEBPACK_IMPORTED_MODULE_0__.userData));
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



let userData = {
  units: "imperial",
  places: ["Dallas", "New York"],
}

const form = document.getElementById("weather-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = form["city"].value;
  (0,_logic__WEBPACK_IMPORTED_MODULE_0__.processWeatherJSON)(city).then((res) => {
    (0,_DOMContent__WEBPACK_IMPORTED_MODULE_1__.renderCard)(res, userData.units);
    userData.places.push(res.name);
    localStorage.setItem("user", JSON.stringify(userData));
  });
});

(0,_DOMContent__WEBPACK_IMPORTED_MODULE_1__.setActiveRadio)();
(0,_DOMContent__WEBPACK_IMPORTED_MODULE_1__.radioBtnEvents)();

// consider re-writing for clarity
const loadWeatherCards = async (obj) => {
  Promise.all(
    obj.places.map(async (place) => {
      let data = await (0,_logic__WEBPACK_IMPORTED_MODULE_0__.processWeatherJSON)(place);
      (0,_DOMContent__WEBPACK_IMPORTED_MODULE_1__.renderCard)(data, userData.units);
    })
  );
};


loadWeatherCards(userData);


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
    userData = JSON.parse(localStorage.getItem("user"));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9ET01Db250ZW50LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2xvZ2ljLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQW1DOztBQUVuQztBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUMsU0FBUztBQUM1QyxVQUFVLFNBQVMsSUFBSSxZQUFZO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxTQUFTO0FBQzdEO0FBQ0EsR0FBRztBQUNILG9CQUFvQixnQkFBZ0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLFNBQVMsZ0JBQWdCO0FBQy9DO0FBQ0E7QUFDQSxJQUFJO0FBQ0osc0JBQXNCLFNBQVMsMkJBQTJCO0FBQzFEO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLCtCQUErQix3QkFBd0I7QUFDdkQsOEJBQThCLHVCQUF1QjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDJEQUF1QjtBQUN2QztBQUNBLE1BQU0sMERBQXNCO0FBQzVCO0FBQ0EsZ0RBQWdELDRDQUFRO0FBQ3hELEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBLE1BQU0sa0RBQWM7QUFDcEIsTUFBTTtBQUNOLEdBQUc7O0FBRUg7QUFDQTtBQUNBLHlEQUF5RCxrREFBYztBQUN2RSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSxrREFBYztBQUN0QixNQUFNLGtEQUFjO0FBQ3BCLGtEQUFrRCw0Q0FBUTtBQUMxRDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsUUFBUSxrREFBYztBQUN0QixNQUFNLGtEQUFjO0FBQ3BCLGtEQUFrRCw0Q0FBUTtBQUMxRDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0EsTUFBTSxrREFBYztBQUNwQjtBQUNBLEdBQUcsVUFBVSxrREFBYztBQUMzQjtBQUNBO0FBQ0E7O0FBRXNEOzs7Ozs7Ozs7Ozs7OztBQ3RIVDtBQUM2Qjs7QUFFMUU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLDBEQUFrQjtBQUNwQixJQUFJLHVEQUFVO0FBQ2Q7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVELDJEQUFjO0FBQ2QsMkRBQWM7O0FBRWQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsMERBQWtCO0FBQ3pDLE1BQU0sdURBQVU7QUFDaEIsS0FBSztBQUNMO0FBQ0E7OztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsU0FBUyxTQUFTLE1BQU07QUFDbkY7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRXdDOzs7Ozs7O1VDdkR4QztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZXJEYXRhIH0gZnJvbSBcIi4vbG9naWNcIjtcblxuY29uc3QgdGVtcENvbnZlcnNpb24gPSAoa2VsdmluLCBkZXNpcmVkVW5pdCkgPT4ge1xuICBpZiAoZGVzaXJlZFVuaXQgPT09IFwiaW1wZXJpYWxcIikge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKDEuOCAqIChrZWx2aW4gLSAyNzMpICsgMzIpO1xuICB9IGVsc2UgaWYgKGRlc2lyZWRVbml0ID09PSBcIm1ldHJpY1wiKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoa2VsdmluIC0gMjczLjE1KTtcbiAgfVxufTtcblxuLy8gY29uc2lkZXIgdXNpbmcgZGF0ZS1mbnMgdG8gZ2V0IHRoZSB0aW1lc3RyaW5nIGZvciB0aGF0IHBhcnRpY3VsYXIgYXJlYVxuY29uc3QgZm9ybWF0VGltZSA9ICh1bml4KSA9PiB7XG4gIGxldCBkYXRlID0gbmV3IERhdGUodW5peCAqIDEwMDApO1xuICByZXR1cm4gZGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoKS5zbGljZSgwLCA0KTtcbn07XG5cbmNvbnN0IGNyZWF0ZUNhcmQgPSAob2JqLCBkZXNpcmVkVW5pdCkgPT4ge1xuICBjb25zdCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY2FyZC5jbGFzc0xpc3QuYWRkKFwiY2FyZFwiKTtcblxuICBjYXJkLmlubmVySFRNTCA9IGBcbiAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICA8aSBpZD1cImRlbGV0ZS1idXR0b25cIiBkYXRhLWlkPVwiJHtvYmoubmFtZX1cIiBjbGFzcz1cImZhcyBmYS10aW1lcyBjbG9zZVwiPjwvaT5cbiAgICA8aDE+JHtvYmoubmFtZX0sICR7b2JqLmNvdW50cnl9PC9oMT5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJyb3cgd2VhdGhlci1pbWdcIj5cbiAgICA8ZmlndXJlPlxuICAgICAgPGltZyBzcmM9XCJodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtvYmouaWNvbn1ANHgucG5nXCIgYWx0PVwiJHtcbiAgICBvYmouZGVzY3JpcHRpb25cbiAgfVwiPlxuICAgICAgPGZpZ2NhcHRpb24+JHtvYmouZGVzY3JpcHRpb259PC9maWdjYXB0aW9uPlxuICAgIDwvZmlndXJlPlxuICA8L2Rpdj5cbiAgPGRpdiBpZD1cInRlbXAtZGF0YVwiIGNsYXNzPVwidGVtcC1pbmZvIHJvd1wiPlxuICAgIDxoMSBkYXRhLWtlbHZpbj0ke29iai50ZW1wfSBjbGFzcz1cInRlbXBcIj4ke3RlbXBDb252ZXJzaW9uKFxuICAgIG9iai50ZW1wLFxuICAgIGRlc2lyZWRVbml0XG4gICl9JmRlZzwvaDE+XG4gICAgPGgzIGRhdGEta2VsdmluPSR7b2JqLmZlZWx9IGNsYXNzPVwiZmVlbFwiPkZlZWxzIGxpa2UgJHt0ZW1wQ29udmVyc2lvbihcbiAgICBvYmouZmVlbCxcbiAgICBkZXNpcmVkVW5pdFxuICApfSZkZWc8L2gzPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInJvdyBzdW5cIj5cbiAgICA8aDMgY2xhc3M9XCJzdW5cIj5TdW5yaXNlOiAke2Zvcm1hdFRpbWUob2JqLnN1bnJpc2UpfTwvaDI+XG4gICAgPGgzIGNsYXNzPVwic3VuXCI+U3Vuc2V0OiAke2Zvcm1hdFRpbWUob2JqLnN1bnNldCl9PC9oMj5cbiAgPC9kaXY+XG4gIGA7XG4gIHJldHVybiBjYXJkO1xufTtcblxuY29uc3QgYWRkRGVsZXRlRXZlbnQgPSAoY2FyZENvbnRhaW5lcikgPT4ge1xuICBjb25zdCBjdXJyZW50Q2FyZCA9IGNhcmRDb250YWluZXIubGFzdEVsZW1lbnRDaGlsZDtcbiAgY29uc3QgZGVsZXRlQnRuID0gY3VycmVudENhcmQucXVlcnlTZWxlY3RvcihcIiNkZWxldGUtYnV0dG9uXCIpO1xuICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgY3VycmVudENhcmQucmVtb3ZlKCk7XG4gICAgbGV0IGluZGV4ID0gdXNlckRhdGEucGxhY2VzLmluZGV4T2YoZS50YXJnZXQuZGF0YXNldC5pZCk7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgdXNlckRhdGEucGxhY2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidXNlclwiLCBKU09OLnN0cmluZ2lmeSh1c2VyRGF0YSkpO1xuICB9KTtcbn07XG5cbmNvbnN0IGNhcmRET01Db250ZW50ID0gKGNhcmQpID0+IHtcbiAgY29uc3QgY2FyZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZC1jb250YWluZXJcIik7XG4gIGNhcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoY2FyZCk7XG4gIGFkZERlbGV0ZUV2ZW50KGNhcmRDb250YWluZXIpO1xufTtcblxuY29uc3QgcmVuZGVyQ2FyZCA9IChvYmosIGRlc2lyZWRVbml0KSA9PiB7XG4gIGNvbnN0IGNhcmQgPSBjcmVhdGVDYXJkKG9iaiwgZGVzaXJlZFVuaXQpO1xuICBjYXJkRE9NQ29udGVudChjYXJkKTtcbn07XG5cbmNvbnN0IHVwZGF0ZVRlbXBzID0gKCkgPT4ge1xuICBjb25zdCBmZWVsTm9kZXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJmZWVsXCIpKTtcbiAgZmVlbE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICBub2RlLmlubmVyVGV4dCA9IGBGZWVscyBsaWtlICR7dGVtcENvbnZlcnNpb24oXG4gICAgICBub2RlLmRhdGFzZXQua2VsdmluLFxuICAgICAgdXNlckRhdGEudW5pdHNcbiAgICApfWA7XG4gIH0pO1xuXG4gIGNvbnN0IHRlbXBOb2RlcyA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRlbXBcIikpO1xuICB0ZW1wTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgIG5vZGUuaW5uZXJUZXh0ID0gdGVtcENvbnZlcnNpb24obm9kZS5kYXRhc2V0LmtlbHZpbiwgdXNlckRhdGEudW5pdHMpO1xuICB9KTtcbn07XG5cbmNvbnN0IHJhZGlvQnRuRXZlbnRzID0gKCkgPT4ge1xuICBjb25zdCBtZXRyaWNCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhZGlvLW9uZVwiKTtcbiAgbWV0cmljQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGlmICh1c2VyRGF0YS51bml0cyAhPT0gXCJtZXRyaWNcIikge1xuICAgICAgdXNlckRhdGEudW5pdHMgPSBcIm1ldHJpY1wiO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ1c2VyXCIsIEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKSk7XG4gICAgICB1cGRhdGVUZW1wcygpO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgaW1wZXJpYWxCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhZGlvLXR3b1wiKTtcbiAgaW1wZXJpYWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgaWYgKHVzZXJEYXRhLnVuaXRzICE9PSBcImltcGVyaWFsXCIpIHtcbiAgICAgIHVzZXJEYXRhLnVuaXRzID0gXCJpbXBlcmlhbFwiO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ1c2VyXCIsIEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKSk7XG4gICAgICB1cGRhdGVUZW1wcygpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5jb25zdCBzZXRBY3RpdmVSYWRpbyA9ICgpID0+IHtcbiAgaWYgKHVzZXJEYXRhLnVuaXRzID09IFwibWV0cmljXCIpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhZGlvLW9uZVwiKS5jaGVja2VkID0gdHJ1ZTtcbiAgfSBlbHNlIGlmICh1c2VyRGF0YS51bml0cyA9PSBcImltcGVyaWFsXCIpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhZGlvLXR3b1wiKS5jaGVja2VkID0gdHJ1ZTtcbiAgfVxufTtcblxuZXhwb3J0IHsgcmVuZGVyQ2FyZCwgcmFkaW9CdG5FdmVudHMsIHNldEFjdGl2ZVJhZGlvIH07XG4iLCJpbXBvcnQgeyBwcm9jZXNzV2VhdGhlckpTT04gfSBmcm9tIFwiLi9sb2dpY1wiO1xuaW1wb3J0IHsgcmFkaW9CdG5FdmVudHMsIHJlbmRlckNhcmQsIHNldEFjdGl2ZVJhZGlvIH0gZnJvbSBcIi4vRE9NQ29udGVudFwiO1xuXG5sZXQgdXNlckRhdGEgPSB7XG4gIHVuaXRzOiBcImltcGVyaWFsXCIsXG4gIHBsYWNlczogW1wiRGFsbGFzXCIsIFwiTmV3IFlvcmtcIl0sXG59XG5cbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXRoZXItZm9ybVwiKTtcbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGNpdHkgPSBmb3JtW1wiY2l0eVwiXS52YWx1ZTtcbiAgcHJvY2Vzc1dlYXRoZXJKU09OKGNpdHkpLnRoZW4oKHJlcykgPT4ge1xuICAgIHJlbmRlckNhcmQocmVzLCB1c2VyRGF0YS51bml0cyk7XG4gICAgdXNlckRhdGEucGxhY2VzLnB1c2gocmVzLm5hbWUpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidXNlclwiLCBKU09OLnN0cmluZ2lmeSh1c2VyRGF0YSkpO1xuICB9KTtcbn0pO1xuXG5zZXRBY3RpdmVSYWRpbygpO1xucmFkaW9CdG5FdmVudHMoKTtcblxuLy8gY29uc2lkZXIgcmUtd3JpdGluZyBmb3IgY2xhcml0eVxuY29uc3QgbG9hZFdlYXRoZXJDYXJkcyA9IGFzeW5jIChvYmopID0+IHtcbiAgUHJvbWlzZS5hbGwoXG4gICAgb2JqLnBsYWNlcy5tYXAoYXN5bmMgKHBsYWNlKSA9PiB7XG4gICAgICBsZXQgZGF0YSA9IGF3YWl0IHByb2Nlc3NXZWF0aGVySlNPTihwbGFjZSk7XG4gICAgICByZW5kZXJDYXJkKGRhdGEsIHVzZXJEYXRhLnVuaXRzKTtcbiAgICB9KVxuICApO1xufTtcblxuXG5sb2FkV2VhdGhlckNhcmRzKHVzZXJEYXRhKTtcbiIsImNvbnN0IGdldERhdGEgPSAoKSA9PiB7XG4gIGxldCB1c2VyRGF0YTtcbiAgaWYgKGxvY2FsU3RvcmFnZS5sZW5ndGgpIHtcbiAgICB1c2VyRGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyXCIpKTtcbiAgfSBlbHNlIHtcbiAgICB1c2VyRGF0YSA9IHtcbiAgICAgIHVuaXRzOiBcImltcGVyaWFsXCIsXG4gICAgICBwbGFjZXM6IFtcIkRhbGxhc1wiLCBcIk5ldyBZb3JrXCJdLFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIHVzZXJEYXRhO1xufTtcblxuLy8gTWFrZXMgYSByZXF1ZXN0IHRvIHRoZSB3ZWF0aGVyIEFQSSBmb3Igd2VhdGhlciBkYXRhIGJhc2VkIG9uIGNpdHkgbmFtZVxuY29uc3QgZ2V0V2VhdGhlckpTT04gPSBhc3luYyAoY2l0eU5hbWUpID0+IHtcbiAgY29uc3QgYXBwSUQgPSBcImQ4ZDYwYzhjODU5Y2IzZTMxZWJmMjQzOTYwZDljNjQyXCI7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eU5hbWV9JkFQUElEPSR7YXBwSUR9YCxcbiAgICAgIHtcbiAgICAgICAgbW9kZTogXCJjb3JzXCJcbiAgICAgIH0pO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLy8gY29kZSB0byBoYW5kbGUgZXJyb3IgZ29lcyBoZXJlXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn07XG5cbi8vIGNvbnNpZGVyIGRvaW5nIGEgdHJ5IGNhdGNoIGluIHRoZSB0b3AgbGV2ZWwgZnVuY3Rpb24gY2FsbCBvbmx5IGFzIHRoZSBwcm9taXNlIGVyciB3aWxsIHBhc3MgdGhyb3VnaCB0aGUgY2hhaW4gdG8gdGhlIGVuZFxuLy8gcHJvY2Vzc2VzIGpzb24gZGF0YSBhbmQgcmV0dXJucyBvYmplY3Qgd2l0aCBvbmx5IGRhdGEgcmVxdWlyZWQgZm9yIG91ciBhcHBcbmNvbnN0IHByb2Nlc3NXZWF0aGVySlNPTiA9IGFzeW5jIChjaXR5TmFtZSkgPT4ge1xuICB0cnkge1xuICAgIGxldCBqc29uID0gYXdhaXQgZ2V0V2VhdGhlckpTT04oY2l0eU5hbWUpO1xuICAgIGNvbnNvbGUubG9nKFwianNvbiBvdXRwdXQgPSBcIiwganNvbik7XG4gICAgbGV0IG9iaiA9IHtcbiAgICAgIG5hbWU6IGpzb24ubmFtZSxcbiAgICAgIGNvdW50cnk6IGpzb24uc3lzLmNvdW50cnksXG4gICAgICB0ZW1wOiBqc29uLm1haW4udGVtcCxcbiAgICAgIGZlZWw6IGpzb24ubWFpbi5mZWVsc19saWtlLFxuICAgICAgdGltZXpvbmU6IGpzb24udGltZXpvbmUsXG4gICAgICBzdW5yaXNlOiBqc29uLnN5cy5zdW5yaXNlLFxuICAgICAgc3Vuc2V0OiBqc29uLnN5cy5zdW5zZXQsXG4gICAgICBpY29uOiBqc29uLndlYXRoZXJbMF0uaWNvbixcbiAgICAgIGRlc2NyaXB0aW9uOiBqc29uLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgfTtcbiAgICByZXR1cm4gb2JqO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuXG5jb25zdCB1c2VyRGF0YSA9IGdldERhdGEoKTtcblxuZXhwb3J0IHsgdXNlckRhdGEsIHByb2Nlc3NXZWF0aGVySlNPTiB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9