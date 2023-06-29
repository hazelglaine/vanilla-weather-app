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
  console.log(data);
  let temperatureElement = document.querySelector("#temperatureValue");
  temperatureElement.innerHTML = Math.round(data.main.temp);
  let cityElement = document.querySelector("#cityName");
  cityElement.innerHTML = data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = data.weather[0].description;
  let humidityElement = document.querySelector("#humidityValue");
  humidityElement.innerHTML = data.main.humidity;
  let windSpeedElement = document.querySelector("#windSpeedValue");
  windSpeedElement.innerHTML = Math.round(data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(data.dt);
}

let cityName = "Quezon City";

let apiKey = "f088c6a2edca8c46f2604594d2426c54";
let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

axios.get(apiUrlCity).then(displayTemperature);
