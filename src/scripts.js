
function displayDateTime() {

let currentDateTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[currentDateTime.getDay()];

let hour = currentDateTime.getHours();
let minutes = currentDateTime.getMinutes();

if(minutes < 10) {
  minutes = `0${minutes}`;
}

let dateElement = document.querySelector("#current-date-time");
dateElement.innerHTML = `${day} ${hour}:${minutes}`
}

displayDateTime();

function displayWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name.toUpperCase();
  document.querySelector("#weather-condition").innerHTML = response.data.weather[0].description.toUpperCase();
  document.querySelector("#current-temp").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#current-humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);
}

function searchCity(city) {
  let apiKey = "4964201fe38c8af7f212aad270301c64"
  let units = "imperial"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`

  axios.get(apiUrl).then(displayWeather);
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
}

function currentLocationButton (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrieveCurrentLocation);
}

let submitForm = document.querySelector("#search-form");
submitForm.addEventListener("submit", submitCity);

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", currentLocationButton);

searchCity("New York");


