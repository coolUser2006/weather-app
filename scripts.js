const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");

// Add your OpenWeather API key here
const apiKey = "PASTE_YOUR_API_KEY_HERE";

async function getWeather() {
    const city = cityInput.value.trim();

    // Check if input is empty
    if (city === "") {
        weatherResult.innerHTML =
            '<p class="error">Please enter a city name.</p>';
        return;
    }

    // Loading message
    weatherResult.innerHTML =
        '<p class="loading">Loading weather data...</p>';

    try {
        // Fetch weather data from API
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        // Check if city exists
        if (!response.ok) {
            throw new Error("City not found");
        }

        // Convert response to JSON
        const data = await response.json();

        // Extract required weather information
        const cityName = data.name;
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        // Display weather information
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
        // Display error message
        weatherResult.innerHTML =
            '<p class="error">City not found. Please enter a valid city name.</p>';
    }
}

// Search weather when button is clicked
searchBtn.addEventListener("click", getWeather);

// Search weather when Enter key is pressed
cityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

