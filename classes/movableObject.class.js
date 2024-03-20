class MovableObject {
    x = 100;
    y = 120;
    img;
    width = 100;
    height = 250;


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