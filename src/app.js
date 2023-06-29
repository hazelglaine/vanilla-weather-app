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
}

let cityName = "Quezon City";

let apiKey = "f088c6a2edca8c46f2604594d2426c54";
let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

axios.get(apiUrlCity).then(displayTemperature);
