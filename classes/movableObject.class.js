class MovableObject {
    x = 100;
    y = 120;
    width = 100;
    height = 250;
    img;
    imgCache = {};
    


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

    moveRight() {
        console.log('Moving right');
    }


    moveLeft() {
        console.log('Moving left');
    }
}