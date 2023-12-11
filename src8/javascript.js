function refreshWeather(response) {
  console.log(response.data.temperature.current);
  let temperatureElement = document.querySelector(".weather-app-temperature");
  let temperature = response.data.temperature.current;
  let city = document.querySelector("#weather-app-city");
  let condition = document.querySelector("#description");
  let humidity = document.querySelector("#Humidity");
  let wind = document.querySelector("#Wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  city.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  condition.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tueasday",
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

function searchCity(city) {
  //call api and update the interface
  let apiKey = "tb8746f8a332o55bf03481bf03f90fe4";
  let apiUlr = `https://api.shecodes.io/weather/v1/current?query=${city}}&key=${apiKey}&units=metric`;
  axios.get(apiUlr).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  //let city = document.querySelector("#weather-app-city");
  //city.innerHTML = searchInput.value;
  //call API
  //search for city
  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "tb8746f8a332o55bf03481bf03f90fe4";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return days[date.getDay()];
}

function displayForecast(response) {
  //console.log(response.data);
  let forecast = document.querySelector("#forecast");

  let forecastHtml = "";

  response.data.daily.forEach(function (day , index) {
    if (index < 5){
      forecastHtml =
      forecastHtml +
      `<div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <div ><img src="${
              day.condition.icon_url
            }" class="weather-forecast-icon"</> </div>
            <div class="weather-forecast-temperature">
              <span class="weather-forecast-temperature-max">${Math.round(
                day.temperature.maximum
              )}°</span>
              <span class="weather-forecast-temperature-min">${Math.round(
                day.temperature.minimum
              )}°</span>
            </div>
          </div>`
          ;
    }
  }); 

  forecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");
displayForecast();
