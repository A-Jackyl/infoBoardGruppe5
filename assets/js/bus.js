async function fetchDepartureBoard() {
    const apiUrl = 'https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const departureBoardElement = document.getElementById('bus_times');
        departureBoardElement.innerHTML = '';

        let counter = 0;

        data.MultiDepartureBoard.Departure.forEach(departure => {
            if (counter < 6) { // Limit to 6 departures
                const departureElement = document.createElement('li');
                departureElement.classList.add('bus_time_item');
                const line = departure.line || departure.sname;
                const direction = departure.direction;
                
                // Extract hour and minute components from the departure time
                const [hour, minute] = departure.time.split(':');
                
                // Construct a new Date object with the current date and departure time
                const currentTime = new Date();
                const departureTime = new Date();
                departureTime.setHours(parseInt(hour, 10));
                departureTime.setMinutes(parseInt(minute, 10));

                // Calculate time difference in minutes
                const timeDifference = Math.max(Math.ceil((departureTime - currentTime) / 1000 / 60), 0); // in minutes

                departureElement.innerHTML = `
                    <p class="bus_number">${line}</p>
                    <p class="bus_dest">${direction}</p>
                    <p class="bus_arrival">${timeDifference} min</p>`;
                departureBoardElement.appendChild(departureElement);

                counter++;
            } else {
                return;
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

setInterval(fetchDepartureBoard, 1000)
