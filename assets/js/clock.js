function updateClockAndDate() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let day = now.getDate();
    let month = now.getMonth() + 1; // Months are zero-indexed, so we add 1
    let year = now.getFullYear();

    // Add leading zero if necessary
    hours = (hours < 10 ? '0' : '') + hours;
    minutes = (minutes < 10 ? '0' : '') + minutes;
    day = (day < 10 ? '0' : '') + day;
    month = (month < 10 ? '0' : '') + month;

    // Update the date display
    const dateElements = document.querySelectorAll('.date');
    dateElements.forEach(dateElements => {
        dateElements.innerText = `${day}/${month}/${year}`;
    });
    
    // Update the clock display
    const clockElements = document.querySelectorAll('.clock');
    clockElements.forEach(clockElement => {
        const hoursElement = clockElement.querySelector('.hours');
        const minutesElement = clockElement.querySelector('.minutes');
        hoursElement.innerText = hours;
        minutesElement.innerText = minutes;
    });



}

updateClockAndDate()

// Call updateClockAndDate every second to update the time and date
setInterval(updateClockAndDate, 1000);
