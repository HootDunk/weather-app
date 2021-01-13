import testing from './test'


// make temps have subfield of the temp and the unit
// then use the temp.unit with conditionals in the conversion funciton

const appID = 'd8d60c8c859cb3e31ebf243960d9c642';

testing();



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