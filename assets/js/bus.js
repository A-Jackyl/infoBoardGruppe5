async function fetchDepartureBoard() {
    const apiUrl = 'https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const departureBoardElement = document.getElementById('bus_times');
        departureBoardElement.innerHTML = '';

        let counter = 0;

        data.MultiDepartureBoard.Departure.forEach(departure => {
            if (counter < 4) { // Limit to 6 departures
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
                console.log(departureTime);

                // Calculate time difference in minutes
                const timeDifference = Math.max(Math.ceil((departureTime - currentTime) / 1000 / 60), 0); // in minutes
                console.log(timeDifference);

                const busDistance = 238-(-19.866*timeDifference)


                departureElement.innerHTML = `
                    <p class="bus_number">${line}</p>
                    <p class="bus_dest">${direction}</p>
                    <p class="bus_arrival">${timeDifference} min</p>
                    <div class="bus_animation">
                        <img class="school_icon" src="assets/img/school.svg" alt="">
                        <img style="left: ${busDistance}px;" class="bus_icon" src="assets/img/bus.svg" alt="">
                        <div class="bus_line"></div>
                    </div>
                    `;
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

fetchDepartureBoard()

/* setInterval(fetchDepartureBoard, 20000) */