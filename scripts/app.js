
const API_KEY = "434110ce1942fd6cc422cd0f365d7d7e";
const weatherCardsDiv = document.querySelector(".weather-cards");

// Function to fetch current weather data
const getCurrentWeather = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    return data;
}

// Function to fetch 5-day forecast
const getFiveDayForecast = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    return data;
}

// Function to update current weather UI
const updateCurrentWeatherUI = (weatherData) => {
    const currentWeather = document.querySelector('.current-weather');
    currentWeather.querySelector('h2').textContent = `${weatherData.name} (${new Date().toLocaleDateString()})`;
    currentWeather.querySelector('h4:nth-of-type(1)').textContent = `Temperature: ${weatherData.main.temp}°C`;
    currentWeather.querySelector('h4:nth-of-type(2)').textContent = `Wind: ${weatherData.wind.speed} M/S`;
    currentWeather.querySelector('h4:nth-of-type(3)').textContent = `Humidity: ${weatherData.main.humidity}%`;
    const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
    currentWeather.querySelector('.icon img').src = iconUrl;
    currentWeather.querySelector('.icon h4').textContent = weatherData.weather[0].description;
}

// Function to update 5-day forecast UI
const updateFiveDayForecastUI = (forecastData) => {
    const forecastCards = document.querySelectorAll('.weather-cards .card');
    for (let i = 0; i < forecastCards.length; i++) {
        const forecast = forecastData.list[i * 8]; // Get weather data for every 24 hours
        forecastCards[i].querySelector('h3').textContent = new Date(forecast.dt * 1000).toLocaleDateString();
        forecastCards[i].querySelector('h4:nth-of-type(1)').textContent = `Temperature: ${forecast.main.temp}°C`;
        forecastCards[i].querySelector('h4:nth-of-type(2)').textContent = `Wind: ${forecast.wind.speed} M/S`;
        forecastCards[i].querySelector('h4:nth-of-type(3)').textContent = `Humidity: ${forecast.main.humidity}%`;
        const forecastIconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
        forecastCards[i].querySelector('img').src = forecastIconUrl;
    }
}

// Function to initialize weather data
const initWeather = async () => {
    try {
        const city = 'Malaysia';
        // Fetch current weather
        const currentWeatherData = await getCurrentWeather(city);
        updateCurrentWeatherUI(currentWeatherData);
        // Fetch 5-day forecast
        const fiveDayForecastData = await getFiveDayForecast(city);
        updateFiveDayForecastUI(fiveDayForecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert("An error occurred while fetching weather data!");
    }
}

// Call initWeather function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initWeather();
});

