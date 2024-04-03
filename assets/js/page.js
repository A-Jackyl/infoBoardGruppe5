document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '4d58d6f0a435bf7c5a52e2030f17682d';
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
            const weatherInfo = document.getElementById('weather-info');
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const icon = data.weather[0].icon;
            
            const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
        
            //    VIEW KODE
            weatherInfo.innerHTML = `
                <p>Temperature: ${temperature}°C</p>
                <p>Description: ${description}</p>
                <img src="${iconUrl}" alt="Weather Icon">
            `;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});
