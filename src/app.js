// format date displayed on the overview component
function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = new Date(timestamp * 1000);
  return days[day.getDay()];
}

// display temperature forecast from the API response obtained using getForecast
function displayForecast(response) {
  let data = response.data.daily;
  let days = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  data.forEach(function (forecast, index) {
    if (index < 6) {
      forecastHTML += `
        <div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecast.dt)}</div>

          <img
            src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png"
            alt=""
            width="42"
          />
          <div class="weather-forecast-temperature">
            <span id="weather-forecast-temp-max">${Math.round(
              forecast.temp.max
            )}º</span>
            <span id="weather-forecast-temp-min">${Math.round(
              forecast.temp.min
            )}º</span>
          </div>
        </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  // API key generate from SheCodes website
  let apiKey = "515c9ddbeb3cda9061acfab71031839e";
  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlForecast).then(displayForecast);
}

function displayTemperature(response) {
  let data = response.data;
  let temperatureElement = document.querySelector("#temperatureValue");
  let cityElement = document.querySelector("#cityName");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidityValue");
  let windSpeedElement = document.querySelector("#windSpeedValue");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  // store celsius temperature to a global variable
  celsiusTemperature = data.main.temp;

  // update weather parameters from API response
  temperatureElement.innerHTML = Math.round(data.main.temp);
  cityElement.innerHTML = `${data.name}, ${data.sys.country}`;
  descriptionElement.innerHTML = data.weather[0].description;
  humidityElement.innerHTML = data.main.humidity;
  windSpeedElement.innerHTML = Math.round(data.wind.speed);
  dateElement.innerHTML = formatDate(data.dt);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", data.weather[0].description);

  // display weather forecast using another API call
  getForecast(data.coord);
}

function search(city) {
  let apiKey = "f088c6a2edca8c46f2604594d2426c54";
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCity).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

search("Manila");

// handles search engine component
let form = document.querySelector("#search-form");
addEventListener("submit", handleSubmit);
