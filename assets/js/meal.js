async function getMeal() {fetch('https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json')
    .then(response => response.json())
    .then(data => {
        const menuItemsContainer = document.getElementById('meal_list');
        const currentDay = new Date().getDay();
        menuItemsContainer.innerHTML = ''
        
        if (data && data.Days) {
            data.Days.forEach(item => {
                const menuItemElement = document.createElement('li');
                menuItemElement.classList.add('meal_list_item');
                const dayIndex = getDanishDayOfWeek(item.DayName);
                
                if (dayIndex === currentDay) {
                    menuItemElement.classList.add('current_day');
                } else if (dayIndex < currentDay) {
                    menuItemElement.classList.add('past_day');
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
        const menuItemsContainer = document.getElementById('meal_list');
        menuItemsContainer.innerHTML = ''
        const menuItemElement = document.createElement('li');
        menuItemElement.style.gridColumn = "span 2"
        menuItemElement.classList.add('meal_list_item');
        menuItemElement.innerHTML = `
        <p class="meal_name">Frokost kan ikke hentes. Indlæs venligst siden på skolens internet.</p>
        `;
        menuItemsContainer.appendChild(menuItemElement);
    });

function getDanishDayOfWeek(dayName) {
    const daysOfWeek = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'];
    return daysOfWeek.indexOf(dayName.toLowerCase());
}
}

getMeal()

setInterval(getMeal, 60000)