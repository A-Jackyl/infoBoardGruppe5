fetch('https://iws.itcn.dk/techcollege/schedules?departmentcode=smed')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const container = document.getElementById('schedule');
        if (data && data.value) {
            data.value.forEach(item => {
                const activityItemElement = document.createElement('li');
                activityItemElement.classList.add('schedule_list_item');
                activityItemElement.innerHTML = `
                    <div class="abbr_folder">
                    <div class="abbr_folder_icon">
                        <img class="folder_icon" src="assets/img/folder.svg" alt="">
                        <p class="abbr_folder_name">WU</p>
                    </div>
                        <p class="folder_icon_class_location">${item.Room}</p>
                    </div>
                    <div class="schedule_text">
                        <p class="full_course_name">WU10102</p>
                        <p class="subject_name">${item.Subject}</p>
                        <div class="schedule_line"></div>
                        <p class="schedule_time">${item.StartDate}</p>
                    </div>
                `;
                container.appendChild(activityItemElement);
            });
        } else {
            container.innerHTML = '<p>No data available</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('activity').innerHTML = '<p>Error fetching data. Please try again later.</p>';
    });