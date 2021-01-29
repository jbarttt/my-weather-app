
function displayDateTime(timestamp) {

let date = new Date(timestamp);
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[date.getDay()];
return `${day} ${formatTime(timestamp)}`

}

function formatTime(timestamp) {
let date = new Date(timestamp);
let hour = date.getHours();
let minutes = date.getMinutes();

if(minutes < 10) {
  minutes = `0${minutes}`;
}

return `${hour}:${minutes}`
}

function displayWeather(response) {
  fahrenheitTemperature = response.data.main.temp;

  document.querySelector("#current-city").innerHTML = response.data.name.toUpperCase();
  document.querySelector("#current-date-time").innerHTML = displayDateTime(response.data.dt * 1000);
  document.querySelector("#weather-condition").innerHTML = response.data.weather[0].description;
  document.querySelector("#current-temp").innerHTML = Math.round(fahrenheitTemperature);
  document.querySelector("#current-humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#weather-icon").setAttribute("src", `images/${response.data.weather[0].icon}.png`);
  document.querySelector("#weather-icon").setAttribute("alt", response.data.weather[0].description);
  
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#hourly-forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
  forecast = response.data.hourly[index];
  forecastElement.innerHTML += `
    <div class="col-2">
    <div class="next-hour">${formatTime(forecast.dt * 1000)}</div>
    <img src="images/${forecast.weather[0].icon}.png" class="img-thumbnail" alt="${forecast.weather[0].description}">    
    <div class="temp">${Math.round(forecast.temp)}°F</div>
    </div>
  `;
  }
}

function getCoords(response) {
  let lat = response.data.coord.lat
  let lon = response.data.coord.lon
  let apiKey = "4964201fe38c8af7f212aad270301c64"
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`

  axios.get(apiUrl).then(displayForecast);
}

function searchCity(city) {
  let apiKey = "4964201fe38c8af7f212aad270301c64"
  let units = "imperial"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`

  axios.get(apiUrl).then(displayWeather);
  axios.get(apiUrl).then(getCoords);

}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  searchCity(city);
}

function retrieveCurrentLocation (position) {
  let apiKey = "4964201fe38c8af7f212aad270301c64"
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units ="imperial"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(displayWeather);
  
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`

  axios.get(apiUrl).then(displayForecast);
}

function currentLocationButton (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrieveCurrentLocation);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemp = (fahrenheitTemperature - 32) * 5 / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let submitForm = document.querySelector("#search-form");
submitForm.addEventListener("submit", submitCity);

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", currentLocationButton);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

searchCity("New York");