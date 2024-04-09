async function fetchDataAndRender() {fetch('https://iws.itcn.dk/techcollege/schedules?departmentcode=smed')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('schedule');
        let sortedDates = data.value   
          function compareDates(a, b) {
            const dateA = new Date(a.StartDate);
            const dateB = new Date(b.StartDate);
            return dateA - dateB;
          }          
            sortedDates.sort(compareDates);
        
            function removePassedItems() {
                const currentDate = new Date();
                passedDates = data.value.filter(item => {
                    const classDate = new Date(item.StartDate);
                    return classDate > currentDate;
                });

                /* console.log('Filtered data after removing passed items:', passedDates); */
            }

        removePassedItems()
        setInterval(removePassedItems, 60000)
        
        //Kan bruges til at filtrere efter uddanelse.
        /* try {
            filteredEducations = ['Webudvikler', 'Mediegrafiker', 'Datamatiker', 'Grafisk teknik.'];

            const unfilteredData = data.value
            
            const filteredData = unfilteredData.filter(item => filteredEducations.includes(item.Education))
            console.log(filteredData);
        } catch (error) {
            console.error('Error fetching or filtering data:', error);
          } */


          if (data && data.value) {
            let counter = 0;

            passedDates.forEach(item => {
                if (counter >= 9) return;
        
                function convertToTimeString(dateTimeString) {
                    const date = new Date(dateTimeString);
                    const hours = date.getHours();
                    const minutes = date.getMinutes();
                    return `${hours}.${minutes}`;
                }
                const shortTime = convertToTimeString(item.StartDate);

                let imagePath
                let abbrFolderName
                switch (item.Education) {
                    case 'Webudvikler':
                        imagePath = 'assets/img/folder_green.svg';
                        abbrFolderName = 'WU';
                        break;
                        case 'Mediegrafiker':
                        imagePath = 'assets/img/folder_pink.svg';
                        abbrFolderName = 'MG';
                        break;
                        case 'Datamatiker':
                        imagePath = 'assets/img/folder_cyan.svg';
                        abbrFolderName = 'DM';
                        break;
                        case 'Grafisk teknik.':
                        imagePath = 'assets/img/folder_blue.svg';
                        abbrFolderName = 'GT';
                        break;
                        default:
                        imagePath = 'assets/img/folder.svg';
                        abbrFolderName = '';
                        break;
                }

                const activityItemElement = document.createElement('li');
                activityItemElement.classList.add('schedule_list_item');
                activityItemElement.innerHTML = `
                    <div class="abbr_folder">
                    <div class="abbr_folder_icon">
                        <img class="folder_icon" src="${imagePath}" alt="">
                        <p class="abbr_folder_name">${abbrFolderName}</p>
                    </div>
                        <p class="folder_icon_class_location">${item.Room}</p>
                    </div>
                    <div class="schedule_text">
                        <p class="full_course_name">WU10102</p>
                        <p class="subject_name">${item.Education}</p>
                        <div class="schedule_line"></div>
                        <p class="schedule_time">${shortTime}</p>
                    </div>
                `;
                container.appendChild(activityItemElement);
                counter++;
            });
        
            if (counter === 0) {
                container.innerHTML = '<p>No data available</p>';
            }
        } else {
            container.innerHTML = '<p>No data available</p>';
        }
        setInterval(removePassedItems, 2000);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('activity').innerHTML = '<p>Error fetching data. Please try again later.</p>';
    });
}

fetchDataAndRender();

setInterval(fetchDataAndRender, 60000);
