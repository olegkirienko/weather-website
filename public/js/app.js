import { getWeatherByCity } from "./utils/weather.js";

const weatherForm = document.getElementById("search-weather");
const searchError = document.getElementById("search-error");
const searchResult = document.getElementById("search-result");

weatherForm.addEventListener("submit", async e => {
    e.preventDefault();

    searchError.innerText = "";
    searchResult.innerText = "Loading...";

    const result = await getWeatherByCity(weatherForm.elements["city"].value);

    if (result.error) {
        searchError.innerText = result.error;
        searchResult.innerText = "";
    } else {
        searchResult.innerText = `${result.data.location}, ${result.data.forecast}`;
    }
}, false);