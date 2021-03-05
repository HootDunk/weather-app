import { getData, processWeatherJSON } from "./logic";
import { radioBtnEvents, renderCard, setActiveRadio } from "./DOMContent";

const setupForm = (userData) => {
  const form = document.getElementById("weather-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = form["city"].value;
    processWeatherJSON(city).then((res) => {
      renderCard(res, userData.units);
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
        let data = await processWeatherJSON(place);
        renderCard(data, obj.units);
      })
    );
  } catch(err) {
    console.log(err)
  }

};


const startUp = () => {
  const userData = getData();
  setupForm(userData)
  setActiveRadio(userData);
  radioBtnEvents(userData);
  loadWeatherCards(userData);
}




startUp();
