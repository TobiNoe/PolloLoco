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

    // Print the character property of the world object to the console
    console.log('My character is', world.character);
}

window.addEventListener('keydown', (e) => {
    /* console.log(e); */
    if (e.code === 'Space'){
        keyboard.space = true;
    } 

    if (e.code === 'ArrowRight'){
        keyboard.right = true;
    } 

    if (e.code === 'ArrowLeft'){
        keyboard.left = true;
    } 
});


window.addEventListener('keyup', (e) => {
    if (e.code === 'Space'){
        keyboard.space = false;
    } 

    if (e.code === 'ArrowRight'){
        keyboard.right = false;
    } 

    if (e.code === 'ArrowLeft'){
        keyboard.left = false;
    } 
});