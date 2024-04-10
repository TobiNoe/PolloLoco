class MovableObject extends DrawableObject{
    /* x = 100;
    y = 120;
    width = 100;
    height = 250;
    img;
    imgCache = {}; */
    currentImage = 0;
    speed;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;


    //jump() into character
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 30);
    }

    isAboveGround() {
        return this.y < 178;
    }


    /* loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    } */

    moveRight() {
        if (!this.isDead()) {
            this.x += this.speed;
            this.otherDirection = false;   
        } 
    }


    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        // Modulo Operation speichert immer den rest 0,1,2,3,4,5,0,1....
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 16;
    }

    /* draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } */

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chick || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '4';
            ctx.strokeStyle = 'green';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    // Bessere Formel zur Kollisionsberechnung (Genauer)
    isColliding(obj) {
        return this.x + this.width > obj.x &&
            this.y + this.height > obj.y &&
            this.x < obj.x &&
            this.y < obj.y + obj.height;

        /*return (this.x + this.width) >= obj.X && this.x <= (obj.X + obj.width) &&
            (this.y + this.offsetY + this.height) >= obj.Y &&
            (this.y + this.offsetY) <= (obj.Y + obj.height) &&
            obj.onCollisionCourse; */
    }

    hit() {
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
        timePassed = timePassed / 1000;
        return timePassed < 0.5; 
    }

    isDead() {
        return this.energy === 0;
    }
}