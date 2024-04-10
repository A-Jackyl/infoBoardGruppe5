async function startWeatherAPI() {
    const apiKey = '55d9f330a8bbf72b284138c07f5e7885';
    const city = 'Aalborg';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    // MODAL KODE
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
            const description = data.weather[0].description;
            const icon = data.weather[0].icon;
            const roundedTemp = Math.ceil(temperature);
            
            const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;

            //    VIEW KODE
            weatherInfo.innerHTML = `
                <p>Vejr:</p>
                <p class="weather_temp">${roundedTemp} °C</p>
                <p class="weather_cond">${description}</p>
                <img src="${iconUrl}" alt="" class="weather_cond_icon">`;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
};

startWeatherAPI()

setInterval(startWeatherAPI, 60000)