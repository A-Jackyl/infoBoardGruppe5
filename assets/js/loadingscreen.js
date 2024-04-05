CreateClockLoadingScreen();

CreateBusLoadingScreen();

CreateScheduleLoadingScreen();

CreateMealsLoadingScreen();

CreateWeatherLoadingScreen()

function CreateClockLoadingScreen() {
    // Check if the loading screen already exists
    if (!document.getElementById("clockLoading")) {
        // Create the loading screen div
        const loadingDiv = document.createElement("div");
        loadingDiv.id = "clockLoading";

        // Create and append the text element
        const loadingText = document.createElement("p");
        loadingText.textContent = "Please wait...";
        loadingDiv.appendChild(loadingText);

        // Get the reference to the window container
        const windowContainer = document.querySelector('.clock_window_container');

        // Insert the loading screen div as a sibling after the window container
        windowContainer.parentNode.insertBefore(loadingDiv, windowContainer.nextSibling);

        // Hide the window container
        windowContainer.style.opacity = "0";
    }
}


function CreateBusLoadingScreen() {
    // Check if the loading screen already exists
    if (!document.getElementById("busLoading")) {
        // Create the loading screen div
        const loadingDiv = document.createElement("div");
        loadingDiv.id = "busLoading";

        // Create and append the text element
        const loadingText = document.createElement("p");
        loadingText.textContent = "Please wait...";
        loadingDiv.appendChild(loadingText);

        // Get the reference to the window container
        const windowContainer = document.querySelector('.bus_window_container');

        // Insert the loading screen div as a sibling after the window container
        windowContainer.parentNode.insertBefore(loadingDiv, windowContainer.nextSibling);

        // Hide the window container
        windowContainer.style.opacity = "0";
    }
}


function CreateScheduleLoadingScreen() {
    // Check if the loading screen already exists
    if (!document.getElementById("scheduleLoading")) {
        // Create the loading screen div
        const loadingDiv = document.createElement("div");
        loadingDiv.id = "scheduleLoading";

        // Create and append the text element
        const loadingText = document.createElement("p");
        loadingText.textContent = "Please wait...";
        loadingDiv.appendChild(loadingText);

        // Get the reference to the window container
        const windowContainer = document.querySelector('.schedule_window_container');

        // Insert the loading screen div as a sibling after the window container
        windowContainer.parentNode.insertBefore(loadingDiv, windowContainer.nextSibling);

        // Hide the window container
        windowContainer.style.display = "none";
    }
}


function CreateMealsLoadingScreen() {
    // Check if the loading screen already exists
    if (!document.getElementById("mealsLoading")) {
        // Create the loading screen div
        const loadingDiv = document.createElement("div");
        loadingDiv.id = "mealsLoading";

        // Create and append the text element
        const loadingText = document.createElement("p");
        loadingText.textContent = "Please wait...";
        loadingDiv.appendChild(loadingText);

        // Get the reference to the window container
        const windowContainer = document.querySelector('.meals_window_container');

        // Insert the loading screen div as a sibling after the window container
        windowContainer.parentNode.insertBefore(loadingDiv, windowContainer.nextSibling);

        // Hide the window container
        windowContainer.style.opacity = "0";
    }
}

function CreateWeatherLoadingScreen() {
    // Check if the loading screen already exists
    if (!document.getElementById("weatherLoading")) {
        // Create the loading screen div
        const loadingDiv = document.createElement("div");
        loadingDiv.id = "weatherLoading";

        // Create and append the text element
        const loadingText = document.createElement("p");
        loadingText.textContent = "Please wait...";
        loadingDiv.appendChild(loadingText);

        // Get the reference to the window container
        const windowContainer = document.querySelector('.weather_window_container');

        // Insert the loading screen div as a sibling after the window container
        windowContainer.parentNode.insertBefore(loadingDiv, windowContainer.nextSibling);

        // Hide the window container
        windowContainer.style.opacity = "0";
    }
}





