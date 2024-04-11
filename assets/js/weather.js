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
            const description = translateWeatherToDanish(data.weather[0].main); // Translate weather description to Danish
            const icon = data.weather[0].icon;
            const newIcon = translateWeatherIcon(data.weather[0].icon)
            console.log(icon);
            const roundedTemp = Math.ceil(temperature);
            /* const iconUrl = `http://openweathermap.org/img/w/${icon}.png`; */
            const iconUrl = `assets/img/${newIcon}`;

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
        case 'Thunderstorm':
            return 'Tordenvejr';
        case 'Drizzle':
            return 'Dis';
        case 'Rain':
            return 'Regn';
        case 'Snow':
            return 'Sne';
        case 'Clear':
            return 'Klart';
        case 'Clouds':
            return 'Skyer';
        case 'Mist':
            return 'Tåge';
        case 'Smoke':
            return 'Røg';
        case 'Haze':
            return 'Dis';
        case 'Dust':
            return 'Støv';
        case 'Ash':
            return 'Aske';
        case 'Squall':
            return 'Vindstød';
        case 'Tornado':
            return 'Tornado';
        default:
            return '';
    }
}

function translateWeatherIcon(weatherIcon) {
    switch (weatherIcon) {
        case '01d':
            return '01d.svg';
        case '02d':
            return '02d.svg';
        case '03d':
            return '03d.svg';
        case '04d':
            return '04d.svg';
        case '04d':
            return '04d.svg';
        case '04d':
            return '04d.svg';
        default:
            return '';
    }
}

startWeatherAPI();

setInterval(startWeatherAPI, 60000);
