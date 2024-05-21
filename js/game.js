let canvas;
let world;
let keyboard = new Keyboard();
let songSound = setMutableAudio('./audio/song.mp3');


/**
 * Initializes the code when the page loads. Async function
 */
function init() {
    canvas = document.getElementById('canvas');
    intervalIDs = [];
    world = new World(canvas, keyboard);
    hideGameResult();
    showMobileControlPad();
    showInfo();
}

function startGame() {
    hideStartScreen();
    playBackgroundSound();
}

function resetGame() {
    canvas = document.getElementById('canvas');
    intervalIDs = [];
    world = new World(canvas, keyboard);
    unmuteAudio();
    resetGameResult();
    hideGameResult();
    playBackgroundSound();
}

function playBackgroundSound() {
    songSound.loop = true;
    songSound.play();
}

function stopBackgroundSound() {
    songSound.pause();   
    songSound.currentTime = 0;
}

/**
* Hides the start screen and displays the game screen.
* @function
* @name hideStartScreen
*/
function hideStartScreen() {
    document.getElementById('startscreen').classList.add('d-none');
    document.getElementById('startscreen').classList.remove('d-flex');
    document.getElementById('game').classList.remove('d-none');
    document.getElementById('game').classList.add('d-flex');
}

/**
* Hides the game result screen.
* @function
* @name hideGameResult
*/
function hideGameResult() {
    document.getElementById('gameResult').classList.remove('d-flex');
    document.getElementById('gameResult').classList.add('d-none');
}

/**
* Displays the game result screen.
* @function
* @name showGameResult
*/
function showGameResult() {
    document.getElementById('gameResult').classList.add('d-flex');
    document.getElementById('gameResult').classList.remove('d-none');
}

/**
* Changes the game result display based on the result parameter.
* @function
* @name changeGameResult
* @param {string} result - The result of the game ('win' or 'lost').
*/
function changeGameResult(result) {
    if (result === 'win') {
        document.getElementById('gameResult').classList.add('game_result_win');
        document.getElementById('gameResultWin').classList.remove('d-none');

    } else if (result === 'lost') {
        document.getElementById('gameResult').classList.add('game_result_lost');
    }
}

/**
* Resets the game result display.
* @function
* @name resetGameResult
*/
function resetGameResult() {
    document.getElementById('gameResult').classList.remove('game_result_win');
    document.getElementById('gameResult').classList.remove('game_result_lost');
    document.getElementById('gameResultWin').classList.add('d-none');
}