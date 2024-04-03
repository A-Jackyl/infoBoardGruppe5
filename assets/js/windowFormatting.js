        var windowTop = document.getElementsByClassName('window_top');
        var noteFlip = document.getElementsByClassName('note_content_wds')

        for (var i = 0; i < windowTop.length; i++) {
            // Set the innerHTML of each element
            windowTop[i].innerHTML += `<div class="window_buttons">
            <img src="assets/img/minimize.svg" alt="minimize.svg">
            <img src="assets/img/Windowed.svg" alt="Windowed.svg">
            <img src="assets/img/cross.svg" alt="cross.svg">
        </div>`;
        };

        for (var i = 0; i < noteFlip.length; i++) {
            // Set the innerHTML of each element
            noteFlip[i].innerHTML += 
            `<div class="note_flip"></div>`;
        };