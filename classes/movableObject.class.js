class MovableObject {
    x = 100;
    y = 120;
    width = 100;
    height = 250;
    img;
    imgCache = {};
    currentImage = 0;
    speed;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.y -= this.speedY;
                console.log(this.speedY);
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 178;
    }


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
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
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    playAnimation(images) {
        let i = this.currentImage % this.imagesWalking.length;
        // Modulo Operation speichert immer den rest 0,1,2,3,4,5,0,1....
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }
}