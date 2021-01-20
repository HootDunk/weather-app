import { userData } from "./logic";

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

    let index = userData.places.indexOf(e.target.dataset.id);
    if (index !== -1) {
      userData.places.splice(index, 1);
    }
    console.log(userData)
    // import logic funtion and remove the place from the object array
    // then save
    localStorage.setItem('user', JSON.stringify(userData));
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





export {
  renderCard,
  // formSubmitEvent,
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

