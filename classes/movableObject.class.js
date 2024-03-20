class MovableObject {
    x = 400;
    y = 120;
    img;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');
    }


    moveLeft() {

    }
}