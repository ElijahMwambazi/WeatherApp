// Uncomment if running in node console
// import fetch from "node-fetch"

let weather = {
    "api-key": process.env.api-key,
    fetchLatLon: function (city, country="") {
        // Getting latitude and longitude
        fetch("http://api.openweathermap.org/geo/1.0/direct?q=" 
        + city 
        + "," 
        + country 
        + "&limit=5&appid=" 
        + this["api-key"])
        .then((response) => response.json())
        .then((data) => this.fetchWeather(data[0].lat, data[0].lon))
    },
    fetchWeather: function (lat, lon) {
        // Getting weather data
        fetch("api.openweathermap.org/data/2.5/weather?lat=" 
        + lat 
        + "&lon=" 
        + lon 
        + "&appid=" 
        + this["api-key"])
        .then((response) => respose.json())
        .then((data) => console.log(data))
    },
    displayWeather: function (data) {
        const { name } = data
        const { icon, description } = data.weather[0]
        const { temperature, humidity } = data.main
        const { speed } = data.wind

        console.log(name, icon, desciption, temperature, humidity, speed)
    }
}