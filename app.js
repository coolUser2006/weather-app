const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");

// OpenWeather API Key
const apiKey = "a1be4993f09f27ee845a6c0e2a5f6066";

async function getWeather() {
    const city = cityInput.value.trim();

    if (city === "") {
        weatherResult.innerHTML =
            '<p class="error">Please enter a city name.</p>';
        return;
    }

    weatherResult.innerHTML =
        '<p class="loading">Loading weather data...</p>';

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        const cityName = data.name;
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        weatherResult.innerHTML = `
            <div class="weather-card">
                <h2>${cityName}</h2>

                <img 
                    src="https://openweathermap.org/img/wn/${icon}@2x.png"
                    alt="${description}"
                >

                <h1>${temperature}°C</h1>

                <p class="description">${description}</p>

                <div class="weather-details">
                    <div>
                        <span>💧</span>
                        <p>Humidity</p>
                        <strong>${humidity}%</strong>
                    </div>

                    <div>
                        <span>💨</span>
                        <p>Wind Speed</p>
                        <strong>${windSpeed} m/s</strong>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Weather API Error:", error);

        weatherResult.innerHTML =
            '<p class="error">Unable to fetch weather data. Please try again.</p>';
    }
}

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});