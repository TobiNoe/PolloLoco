let canvas;
let world;
let keyboard = new Keyboard();


/**
 * Initializes the code when the page loads.
 */
function init() {
    // Get the canvas element with id 'canvas' and assign it to the variable 'canvas'
    canvas = document.getElementById('canvas');
    // Create a new instance of the World class, passing in the canvas and keyboard objects, and assign it to the variable 'world'
    world = new World(canvas, keyboard);
    showMobileControlPad();
    setTimeout(() => {
        hideStartScreen();
        showHideGameResultLost();   
    }, 100);
    
    // Print the character property of the world object to the console
    /* console.log('My character is', world.character); */
}

function hideStartScreen() {
    document.getElementById('startscreen').classList.add('d-none');
    document.getElementById('startscreen').classList.remove('d-flex');
    document.getElementById('game').classList.remove('d-none');
    document.getElementById('game').classList.add('d-flex');
}

/**
 * Shows the game result as lost
 */
function showHideGameResultLost() {
    document.getElementById('gameResult').classList.toggle('d-flex');
    document.getElementById('gameResult').classList.toggle('d-none');
}