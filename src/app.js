function formatDate(timestamp) {
  let date = new Date(timestamp);
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

function displayTemperature(response) {
  let data = response.data;
  let temperatureElement = document.querySelector("#temperatureValue");
  let cityElement = document.querySelector("#cityName");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidityValue");
  let windSpeedElement = document.querySelector("#windSpeedValue");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  console.log(data);
  temperatureElement.innerHTML = Math.round(data.main.temp);
  cityElement.innerHTML = data.name;
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

let cityName = "Manila";

let apiKey = "f088c6a2edca8c46f2604594d2426c54";
let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

axios.get(apiUrlCity).then(displayTemperature);
