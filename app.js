// Your OpenWeatherMap API Key (ONLY KEY, not full URL)
const API_KEY = 'e1742fafdafdb55012663a23ff9afa1f';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';


// 🔄 Show Loading Spinner
function showLoading() {
    const loadingHTML = `
        <div class="loading-container">
            <div class="spinner"></div>
            <p>Loading weather data...</p>
        </div>
    `;
    document.getElementById('weather-display').innerHTML = loadingHTML;
}


// ❌ Show Error Message
function showError(message) {
    const errorHTML = `
        <div class="loading-container">
            <p style="color:red;">${message}</p>
        </div>
    `;
    document.getElementById('weather-display').innerHTML = errorHTML;
}


// 🌤️ Fetch Weather Data (Async Version)
async function getWeather(city) {
    showLoading();   // ⭐ show loading at start

    const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await axios.get(url);
        displayWeather(response.data);
    } 
    catch (error) {
        console.error('Error:', error);

        if (error.response && error.response.status === 404) {
            showError('City not found. Please check spelling.');
        } else {
            showError('Something went wrong. Try again later.');
        }
    }
}


// 🌍 Display Weather
function displayWeather(data) {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    const weatherHTML = `
        <div class="weather-info">
            <h2 class="city-name">${cityName}</h2>
            <img src="${iconUrl}" alt="${description}" class="weather-icon">
            <div class="temperature">${temperature}°C</div>
            <p class="description">${description}</p>
        </div>
    `;

    document.getElementById('weather-display').innerHTML = weatherHTML;
}


// Call on page load
getWeather('London');
