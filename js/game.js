let canvas;
let world;
let keyboard = new Keyboard();


/**
 * Initializes the code when the page loads.
 */
async function init() {
    // Get the canvas element with id 'canvas' and assign it to the variable 'canvas'
    canvas = document.getElementById('canvas');
    intervalIDs = [];
    // Create a new instance of the World class, passing in the canvas and keyboard objects, and assign it to the variable 'world'
    world = new World(canvas, keyboard);
    unmuteAudio();
    showMobileControlPad();
    resetGameResult();
    hideStartScreen();
    hideGameResult();
    /* setTimeout(() => {
        hideStartScreen();
        hideGameResult();
    }, 100); */

    // Print the character property of the world object to the console
    /* console.log('My character is', world.character); */
}

function hideStartScreen() {
    document.getElementById('startscreen').classList.add('d-none');
    document.getElementById('startscreen').classList.remove('d-flex');
    document.getElementById('game').classList.remove('d-none');
    document.getElementById('game').classList.add('d-flex');
}

function hideGameResult() {
    document.getElementById('gameResult').classList.remove('d-flex');
    document.getElementById('gameResult').classList.add('d-none');
}

function showGameResult() {
    document.getElementById('gameResult').classList.add('d-flex');
    document.getElementById('gameResult').classList.remove('d-none');
}

function changeGameResult(result) {
    if (result === 'win') {
        document.getElementById('gameResult').classList.add('game_result_win');
        document.getElementById('gameResultWin').classList.remove('d-none');
        
    } else if (result === 'lost') {
        document.getElementById('gameResult').classList.add('game_result_lost');
    }
}

function resetGameResult() {
    document.getElementById('gameResult').classList.remove('game_result_win');
    document.getElementById('gameResult').classList.remove('game_result_lost');
    document.getElementById('gameResultWin').classList.add('d-none');    
}