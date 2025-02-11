function UpdateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let moodElement = document.querySelector("#mood");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let emojiElement = document.querySelector("#emoji");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  moodElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windspeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  emojiElement.innerHTML = `<img  src="${response.data.condition.icon_url}" class="wetter-app-emoji" />`;
  getForecast(response.data.city);
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

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(UpdateWeather);
}
function SearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  CitySearch(searchInput.value);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function getForecast(city) {
  apiKey = "937eb44cb68833ao5cdt10179cf40b38";
  apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `

      <div class="forecast-day">
        <div class="forecast-date">${formatDay(day.time)}</div>
        <div ><img src="${day.condition.icon_url}" class="forecast-emoji"/>
        </div>
        <div class="forecast-temperature">
          <div class="forecast-temp">
            <strong>${Math.round(day.temperature.minimum)}°</strong>
          </div>
          <div class="forecast-temp">${Math.round(
            day.temperature.maximum
          )}°</div>
        </div>
      </div>
    `;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", SearchSubmit);

CitySearch("Berlin");
