async function startWeatherAPI() {
    const apiKey = '55d9f330a8bbf72b284138c07f5e7885';
    const city = 'Aalborg';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const weatherInfo = document.getElementById('weather_api');
            const temperature = data.main.temp;
            const description = translateWeatherToDanish(data.weather[0].description); // Translate weather description to Danish
            const icon = data.weather[0].icon;
            const roundedTemp = Math.ceil(temperature);
            const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;

            weatherInfo.innerHTML = `
                <p>Vejr:</p>
                <p class="weather_temp">${roundedTemp} °C</p>
                <p class="weather_cond">${description}</p>
                <img src="${iconUrl}" alt="" class="weather_cond_icon">`;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Function to translate weather conditions to Danish
function translateWeatherToDanish(weatherDescription) {
    switch (weatherDescription) {
        case 'Clear':
            return 'Klart';
        case 'Clouds':
            return 'Skyer';
        case 'Rain':
            return 'Regn';
        case 'Drizzle':
            return 'Dis';
        case 'Thunderstorm':
            return 'Tordenvejr';
        default:
            return weatherDescription;
    }
}

startWeatherAPI();

setInterval(startWeatherAPI, 60000);
