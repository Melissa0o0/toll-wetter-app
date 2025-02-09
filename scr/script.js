function UpdateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let moodElement = document.querySelector("#mood");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.date.time * 1000);
  let emojiElement = document.querySelector("#emoji");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  moodElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windspeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  emojiElement.innerHTML = `<img  src="${response.data.condition.icon_url}" class="wetter-app-emoji" />`;
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}
function CitySearch(city) {
  let apiKey = "937eb44cb68833ao5cdt10179cf40b38";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(UpdateWeather);
}

function SearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  SearchSubmit(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", SearchSubmit);

SearchSubmit("Berlin");
