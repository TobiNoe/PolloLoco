class MovableObject extends DrawableObject {
    speed;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;

    /**
    * Offset object with initial values set to 0.
    * @type {Offset}
    */
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
    offsetJumpOn = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };


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
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 173;
        }

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

    playAnimationOnTime(images) {
        for (let i = 0; i < images.length; i++) {
            const path = images[i];
            this.img = this.imgCache[path];
        }
    }

    jump() {
        this.speedY = 18;
    }

    /* draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } */

    /*  drawFrame(ctx) {
         if (this instanceof Character || this instanceof Chick || this instanceof Chicken) {
             ctx.beginPath();
             ctx.lineWidth = '4';
             ctx.strokeStyle = 'green';
             ctx.rect(this.x, this.y, this.width, this.height);
             ctx.stroke();
         }
     } */


    isColliding(obj) {
        // R -> L check collision Charater right side with obj left side
        // L -> R check collision Charater left side with obj right side side
        // T -> B check collision Charater ontop with obj
        // B -> T check collision Charater bottom the obj
        return this.x + this.width - this.offset.right > obj.x + obj.offset.right &&
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom
    }
    isJumpOn(obj) {
        // R -> L check collision Charater right side with obj left side
        // L -> R check collision Charater left side with obj right side side
        // T -> B check collision Charater ontop with obj
        // B -> T check collision Charater bottom the obj
        return this.x + this.width - this.offsetJumpOn.right > obj.x + obj.offset.right &&
            this.x + this.offsetJumpOn.left < obj.x + obj.width - obj.offset.right &&
            this.y + this.height - this.offsetJumpOn.bottom > obj.y + obj.offset.top &&
            this.y + this.offsetJumpOn.top < obj.y + obj.height - obj.offset.bottom
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