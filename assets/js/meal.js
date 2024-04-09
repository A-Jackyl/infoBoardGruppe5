fetch('https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json')
    .then(response => response.json())
    .then(data => {
        const menuItemsContainer = document.getElementById('meal_list');
        const currentDay = new Date().getDay();

        if (data && data.Days) {
            data.Days.forEach(item => {
                const menuItemElement = document.createElement('li');
                menuItemElement.classList.add('meal_list_item');
                if (currentDay === getDanishDayOfWeek(item.DayName)) {
                    menuItemElement.classList.add('current_day');
                }

                menuItemElement.innerHTML = `
                    <h3 class="meal_day">${item.DayName}</h3>
                    <p class="meal_name">${item.Dish}</p>
                `;
                menuItemsContainer.appendChild(menuItemElement);
            });
        } else {
            menuItemsContainer.innerHTML = '<p>No menu items available</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('menu-items').innerHTML = '<p>Error fetching data. Please try again later.</p>';
    });

function getDanishDayOfWeek(dayName) {
    const daysOfWeek = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'];
    return daysOfWeek.indexOf(dayName.toLowerCase());
}