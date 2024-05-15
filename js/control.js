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

function setMutableAudio(audioPath) {
    let audio = new Audio(audioPath);
    audioElements.push(audio);
    return audio;
}

function stopAudio() {
    mute = true;
    audioElements.forEach(audio => {
        audio.volume = 0;
    });
}

function startAudio() {
    mute = false;
    audioElements.forEach(audio => {
        audio.volume = 1;
    });
}

function muteAudio() {
    toggleIcons('btnSoundOn', 'btnSoundOff');
    stopAudio();
}

function unmuteAudio() {
    toggleIcons('btnSoundOff', 'btnSoundOn');
    startAudio();
}

function checkMuteOn(soundFile) {
    if (audioElements[0].volume === 0) {
        soundFile.volume = 0;
        console.log(soundFile);
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
function restartGame() {
    let count = intervalIDs.length;
    intervalIDs.forEach(index => {
        /* console.log(index); */
        setStoppableInterval(intervalFN[index - 1].fnName, intervalFN[index - 1].interval);
        /* intervalIDs.splice() */
    });
    intervalIDs.splice(0, count);
}

function fullScreen() {
    let fullscreen = document.getElementById('game');
    enterFullscreen(fullscreen);
    toggleIcons('btnFullScreen', 'btnNoFullScreen');
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function toggleIcons(icon1, icon2) {
    document.getElementById(icon1).classList.add('d-none');
    document.getElementById(icon1).classList.remove('d-flex');
    document.getElementById(icon2).classList.remove('d-none');
    document.getElementById(icon2).classList.add('d-flex');
}

function showMobileControlPad() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.getElementById('mobileControl').classList.add('d-flex');
    } else {
        document.getElementById('mobileControl').classList.add('d-none');
    }
}

function showInfo() {
    document.getElementById('info').classList.remove('d-none');
    document.getElementById('info').classList.add('d-flex');
    stopGame();
}

function hideInfo() {
    document.getElementById('info').classList.add('d-none');
    document.getElementById('info').classList.remove('d-flex');
    restartGame();
}