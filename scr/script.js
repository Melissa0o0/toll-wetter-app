function UpdateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
}

function CitySearch(city) {
  let apiKey = "937eb44cb68833ao5cdt10179cf40b38";
  let apiUrl =
    " https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey} ";
  axios.get(apiUrl).then(UpdateWeather);
}

function SearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", SearchSubmit);
