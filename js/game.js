let canvas;
let world;
let keyboard = new Keyboard();


function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

   console.log('My character is', world.character);
}

window.addEventListener('keydown', (e) => {
    /* console.log(e); */
    if (e.code === 'Space'){
        keyboard.space = true;
        console.log(keyboard.space);
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
        console.log(keyboard.space);
    } 

    if (e.code === 'ArrowRight'){
        keyboard.right = false;
    } 

    if (e.code === 'ArrowLeft'){
        keyboard.left = false;
    } 
});