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

function displayForecast() {
  let days = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col-2">
          <div class="weather-forecast-date">${day}</div>

          <img
            src="http://openweathermap.org/img/wn/04d@2x.png"
            alt=""
            width="42"
          />
          <div class="weather-forecast-temperature">
            <span id="weather-forecast-temp-max">18º</span>
            <span id="weather-forecast-temp-min">12º</span>
          </div>
        </div>
    `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  let data = response.data;
  console.log(data);
  let temperatureElement = document.querySelector("#temperatureValue");
  let cityElement = document.querySelector("#cityName");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidityValue");
  let windSpeedElement = document.querySelector("#windSpeedValue");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  //store celsius temperature to a global variable
  celsiusTemperature = data.main.temp;

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

function displayFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperatureValue");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperatureValue");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
displayForecast();

// handles search engine component
let form = document.querySelector("#search-form");
addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);
