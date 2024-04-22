const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "ce74408af791bdd9a0f017fb14a46fad";

weatherForm.addEventListener("submit", async event => {

    //stops it from the default behavior of refreshing the page;
    event.preventDefault(); 
    
    const city = cityInput.value; //store input of city in city variable

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);            
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError("Please enter a city.")
    }

});

async function getWeatherData(city) {
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);

    if (!response.ok){
        throw new Error("Could not fetch weather data.");
        
    }
    return await response.json(); //return object in json-like format 
}

function displayWeatherInfo(data) {
    
    console.log(data);

    //object/array destructuring
    const {
        name: city,
        main: {temp, humidity, feels_like}, 
        weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const feelsLikeDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
    let feelsLike = (feels_like*(9/5)-459.67).toFixed(0);

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp*(9/5)-459.67).toFixed(0)}° F`;
    feelsLikeDisplay.textContent = `Feels like: ${feelsLike}° F ${feelsEmoji(feelsLike)}`
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    feelsLikeDisplay.classList.add("feelsLikeDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(feelsLikeDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

}

function feelsEmoji(feels_temp) {
    switch(true) {
        case (feels_temp > 89):
            return "🥵";
        case (feels_temp <= 89 && feels_temp >= 70 ):
            return "😎";
        case (feels_temp <=69  && feels_temp >= 50 ):
                return "😁";
        case (feels_temp <= 49):
            return "🥶";
        default: 
            return "😶‍🌫️";
    }
}

function getWeatherEmoji(weatherId) {
    
    switch(true) {
        case(weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case(weatherId >= 300 && weatherId <400):
            return "🌧️";            
        case(weatherId >= 500 && weatherId < 600):
            return "☔️";
        case(weatherId >= 600 && weatherId < 700):
            return "❄️";            
        case(weatherId >= 700 && weatherId < 800):
            return "🍃";
        case(weatherId === 800):
            return "☀️";      
        case(weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "🛸";
    }

}

function displayError(message) {
    
    //create a spot for the error message
    const errorDisplay = document.createElement("p"); 
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

};