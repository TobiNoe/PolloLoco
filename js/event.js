window.addEventListener('keydown', (e) => {
    /**
     * Handles keydown events
     * @param {object} e - The keydown event object
     */
    if (e.code === 'Space') {
        keyboard.space = true;
    }

    if (e.code === 'ArrowRight') {
        keyboard.right = true;
    }

    if (e.code === 'ArrowLeft') {
        keyboard.left = true;
    }

    if (e.code === 'KeyW') {
        keyboard.w = true;
    }
});

window.addEventListener('keyup', (e) => {
    /**
     * Handles keyup events
     * @param {object} e - The keyup event object
     */
    if (e.code === 'Space') {
        keyboard.space = false;
    }

    if (e.code === 'ArrowRight') {
        keyboard.right = false;
    }

    if (e.code === 'ArrowLeft') {
        keyboard.left = false;
    }

    if (e.code === 'KeyW') {
        keyboard.w = false;
    }
});

/**
 * Add touch event listeners to handle touchstart and touchend events on buttons.
 */
document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.left = true;
});

document.getElementById('btnLeft').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.left = false;
});

document.getElementById('btnRight').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.right = true;
});

document.getElementById('btnRight').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.right = false;
});

document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.w = true;
});

document.getElementById('btnThrow').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.w = false;
});

document.getElementById('btnJump').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.space = true;
});

document.getElementById('btnJump').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.space = false;
});

/**
 * Event listener for the fullscreenchange event.
 * When the fullscreen mode is exited, it calls the toggleIcons function to toggle the icons for button elements.
 *
 * @param {Event} event - The fullscreenchange event object.
 */
document.addEventListener('fullscreenchange', function (event) {
    if (!document.fullscreenElement) {
        toggleIcons('btnNoFullScreen', 'btnFullScreen');
    }
});

/**
 * Event listener for the msfullscreenchange event.
 * When the fullscreen mode is exited (in Microsoft browsers), it calls the toggleIcons function to toggle the icons for button elements.
 *
 * @param {Event} event - The msfullscreenchange event object.
 */
document.addEventListener('msfullscreenchange', function (event) {
    if (!document.msFullscreenElement) {
        toggleIcons('btnNoFullScreen', 'btnFullScreen');
    }
});
