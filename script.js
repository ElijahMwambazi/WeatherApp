// Uncomment if running in node console
// import fetch from "node-fetch"

let weather = {
    // TODO: Remove api Key when commiting
    "api-key": "af3ee534c9d1b85fa4988a12f0b41a21",
    fetchLatLon: function (location) {
        let [city, country] = location.trim().split(" ")

        // Getting latitude and longitude
        fetch("https://api.openweathermap.org/geo/1.0/direct?q=" 
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
        fetch("https://api.openweathermap.org/data/2.5/weather?lat=" 
        + lat 
        + "&lon=" 
        + lon 
        + "&units=metric&appid=" 
        + this["api-key"])
        .then((response) => response.json())
        .then((data) => this.displayWeather(data))
    },
    displayWeather: function (data) {
        const { name } = data
        const { icon, description } = data.weather[0]
        const { temp, humidity } = data.main
        const { speed } = data.wind
        
        document.querySelector(".city").innerText = "Weather in " + name
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon +".png"
        document.querySelector(".description").innerText = description
        document.querySelector(".temperature").innerText = temp + "°C"
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%"
        document.querySelector(".wind-speed").innerText = "Wind speed: " + speed + "km/h"

        document.querySelector(".weather").classList.remove("default")

        // documet.body.style.backgroundColor = "url('https://source.unsplash.com/random/1600x900/?" + name + "')"
    },
    searchWeather: function() {
        this.fetchLatLon(document.querySelector(".search-bar").value)
    }
}


document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        weather.searchWeather()
    }
})

document.querySelector(".search-button").addEventListener("click", function (){
    weather.searchWeather()
})

// Some dumb shit

// Enter key press or search button click event listener
// const elements = [document, document.querySelector(".search-button")]
// const events = ["click", "keypress"]

// events.forEach(function (event) {
//     elements.forEach(function (element) {
//         element.addEventListener(event, function (e) {
//             if (e.key === "Enter" || event) {
//                 weather.searchWeather()
//             }
//         })
//     })
// })