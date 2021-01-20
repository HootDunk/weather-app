import { userData, processWeatherJSON } from "./logic";
import { renderCard } from "./DOMContent";


// formSubmitEvent();
const form = document.getElementById("weather-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = form['city'].value;
  processWeatherJSON(city).then((res) => {
    renderCard(res, userData.units)
    userData.places.push(res.name)
    localStorage.setItem('user', JSON.stringify(userData));
  })
})

// consider re-writing for clarity
const loadWeatherCards = async (obj) => {
  Promise.all(obj.places.map(async (place) => {
    let data = await processWeatherJSON(place);
    renderCard(data, userData.units);
  }))
}


loadWeatherCards(userData)




// Separation of concerns
  // DOMstuff.js has all dom stuff
  // logic.js has code for data requests and cleaning
  // index.js has the event listeners

//call getWeatherImage in processWeatherJSON to create proper object
// include description underneath the image
// can just use the url with the proper format in the image source actually

// consider a blue color them for colder weather? like 40s and below
// maybe cold, neutral, and warm color scheme?
