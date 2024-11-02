let intervalIDs = [];
let intervalFN = [];
let audioElements = [];
let mute = false;

/**
* Sets up a stoppable interval.
* @param {Function} fn - The function to execute at each interval.
* @param {number} time - The interval time in milliseconds.
*/
function setStoppableInterval(fn, time) {
    let options = {
        fnName: fn,
        interval: time
    };
    let id = setInterval(fn, time);
    intervalIDs.push(id);
    intervalFN.push(options);
}

/**
* @param {string} audioPath
* @returns {Audio} The Audio object added to the audio elements.
* @description Creates a mutable Audio object and adds it to the audio elements.
*/
function setMutableAudio(audioPath) {
    let audio = new Audio(audioPath);
    audioElements.push(audio);
    return audio;
}

/**
* @returns {void}
* @description Mutes all the audio elements.
*/
function stopAudio() {
    mute = true;
    audioElements.forEach(audio => {
        audio.volume = 0;
    });
}

/**
* @returns {void}
* @description Unmutes all the audio elements.
*/
function startAudio() {
    mute = false;
    audioElements.forEach(audio => {
        audio.volume = 1;
    });
}

/**
* @returns {void}
* @description Mutes the audio and changes the sound button icon.
*/
function muteAudio() {
    toggleIcons('btnSoundOn', 'btnSoundOff');
    stopAudio();
}

/**
* @returns {void}
* @description Unmutes the audio and changes the sound button icon.
*/
function unmuteAudio() {
    toggleIcons('btnSoundOff', 'btnSoundOn');
    startAudio();
}

/**
* @param {Audio} soundFile
* @returns {Audio} The provided Audio object if it is muted.
* @description Checks if the audio is muted and returns the sound file.
*/
function checkMuteOn(soundFile) {
    if (audioElements[0].volume === 0) {
        soundFile.volume = 0;
        return soundFile;
    }
}

/**
* Stops all running intervals.
*/
function stopGame() {
    intervalIDs.forEach(clearInterval);
}

/**
* Restarts all intervals that were previously stopped.
*/
/* TODO: untersuchen Warum die Intervalle doppelt im Array landen ggf. die IntervallFN splicen wie die IntervallIDs */
function restartGame() {
    let count = intervalIDs.length;
    intervalIDs.forEach(index => {
        setStoppableInterval(intervalFN[intervalIDs.indexOf(index)].fnName, intervalFN[intervalIDs.indexOf(index)].interval);
    });
    intervalIDs.splice(0, count);
    intervalFN.splice(0, count);
    console.log('intervallIDs :>> ', intervalIDs);
    console.log('intervallFN :>> ', intervalFN);
}

/**
* The element to be set to full screen mode.
*/
function fullScreen() {
    let fullscreen = document.getElementById('game');
    enterFullscreen(fullscreen);
    toggleIcons('btnFullScreen', 'btnNoFullScreen');
}

/**
 * Requests the specified element to enter full screen mode.
 * .msRequestFullscreen() for IE11 (remove June 15, 2022)
 * element.webkitRequestFullscreen for iOS Safari
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

/**
* Exits full screen mode.
*/
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
* Toggles the icons of two elements.
* @param {string} icon1 - The id of the first icon element.
* @param {string} icon2 - The id of the second icon element.
*/
function toggleIcons(icon1, icon2) {
    document.getElementById(icon1).classList.add('d-none');
    document.getElementById(icon1).classList.remove('d-flex');
    document.getElementById(icon2).classList.remove('d-none');
    document.getElementById(icon2).classList.add('d-flex');
}

/**
* Shows or hides the mobile control pad based on the user agent.
*/
function showMobileControlPad() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.getElementById('mobileControl').classList.add('d-flex');
    } else {
        document.getElementById('mobileControl').classList.add('d-none');
    }
}

/**
* Shows the information element and stops the game.
*/
function showInfo() {
    document.getElementById('info').classList.remove('d-none');
    document.getElementById('info').classList.add('d-flex');
    stopGame();
}

/**
* Hides the information panel.
*/
function hideInfo() {
    document.getElementById('info').classList.add('d-none');
    document.getElementById('info').classList.remove('d-flex');
    restartGame();
}