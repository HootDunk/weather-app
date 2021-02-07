import {userData, processWeatherJSON } from "./logic";
import { radioBtnEvents, renderCard, setActiveRadio } from "./DOMContent";



const form = document.getElementById("weather-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = form["city"].value;
  processWeatherJSON(city).then((res) => {
    renderCard(res, userData.units);
    userData.places.push(res.name);
    localStorage.setItem("user", JSON.stringify(userData));
  });
});

setActiveRadio();
radioBtnEvents();

// consider re-writing for clarity
const loadWeatherCards = async (obj) => {
  Promise.all(
    obj.places.map(async (place) => {
      let data = await processWeatherJSON(place);
      renderCard(data, userData.units);
    })
  );
};


loadWeatherCards(userData);
