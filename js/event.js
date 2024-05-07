

document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.left = true;
    console.log(keyboard.left);
});

document.getElementById('btnLeft').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.left = false;
    console.log(keyboard.left);
});

document.getElementById('btnRight').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.right = true;
    console.log(keyboard.right);
});

document.getElementById('btnRight').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.right = false;
    console.log(keyboard.right);
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

document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement) { // Wenn es kein fullscreenElement gibt, dann ist der Vollbildmodus deaktiviert
        toggleIcons('btnNoFullScreen', 'btnFullScreen'); // Toggle Icons, um den Vollbildmodus-Status zu aktualisieren
    }
});

document.addEventListener('webkitfullscreenchange', function () {
    if (!document.webkitFullscreenElement) {
        toggleIcons('btnNoFullScreen', 'btnFullScreen');
    }
});

document.addEventListener('msfullscreenchange', function () {
    if (!document.msFullscreenElement) {
        toggleIcons('btnNoFullScreen', 'btnFullScreen');
    }
});
