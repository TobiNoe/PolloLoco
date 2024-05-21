/**
 * Handles keydown events.
 * @param {KeyboardEvent} e - The keydown event object.
 */
window.addEventListener('keydown', (e) => {
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

/**
 * Handles keyup events.
 * @param {KeyboardEvent} e - The keyup event object.
 */
window.addEventListener('keyup', (e) => {
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
 * Handles touchstart event for the left button.
 * @param {TouchEvent} e - The touchstart event object.
 */
document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.left = true;
});

/**
 * Handles touchend event for the left button.
 * @param {TouchEvent} e - The touchend event object.
 */
document.getElementById('btnLeft').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.left = false;
});

/**
 * Handles touchstart event for the right button.
 * @param {TouchEvent} e - The touchstart event object.
 */
document.getElementById('btnRight').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.right = true;
});

/**
 * Handles touchend event for the right button.
 * @param {TouchEvent} e - The touchend event object.
 */
document.getElementById('btnRight').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.right = false;
});

/**
 * Handles touchstart event for the throw button.
 * @param {TouchEvent} e - The touchstart event object.
 */
document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.w = true;
});

/**
 * Handles touchend event for the throw button.
 * @param {TouchEvent} e - The touchend event object.
 */
document.getElementById('btnThrow').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.w = false;
});

/**
 * Handles touchstart event for the jump button.
 * @param {TouchEvent} e - The touchstart event object.
 */
document.getElementById('btnJump').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.space = true;
});

/**
 * Handles touchend event for the jump button.
 * @param {TouchEvent} e - The touchend event object.
 */
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