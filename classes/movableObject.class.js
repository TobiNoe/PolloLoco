class MovableObject extends DrawableObject {
    speed;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    energy = 100;
    lastHit = 0;
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
    isJump = false;
    noMove = false;

    /**
     * Simulates gravity by applying a downward force to the object.
     */
    applyGravity() {
        /**
         * Applies gravity at a fixed interval of 30 frames per second.
         * The object's Y position and vertical speed are updated accordingly.
         * If the object is above the ground or has positive vertical speed,
         * the Y position and speed are adjusted based on the object's acceleration.
         */
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

    moveRight() {
        if (!this.isDead()) {
            this.x += this.speed;
            this.otherDirection = false;
        }
    }

    moveLeft() {
        if (!this.isDead()) {
            this.x -= this.speed;
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        // Modulo Operation speichert immer den rest 0,1,2,3,4,5,0,1....
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    playAnimationIsDead(images) {
        if (this.resetCurrentImage) {
            this.currentImage = 0;
            this.resetCurrentImage = false;
        } else if (this.currentImage < images.length) {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imgCache[path];
            this.currentImage++;
            if (i > 1) {
                this.y += 30;
            }
        }
    }

    playAnimationJump(images) {
        if (this.resetCurrentImage) {
            this.currentImage = 0;
            this.resetCurrentImage = false;
            this.noMove = true;
        } else if (this.currentImage < images.length) {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imgCache[path];
            this.currentImage++;
            if (i === 3) {
                this.speedY = 20;
                this.noMove = false;
            } else if (i === 8) {
                this.noMove = true;
            }
        } else if (this.currentImage = images.length) {
            this.isJump = false;
            this.noMove = false;
            this.resetCurrentImage = true;
            /*  console.log(this.currentImage);
             console.log(this.resetCurrentImage);
             console.log(this.isJump); */
        }
    }

    jump() {
        this.isJump = true;
    }

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
        this.energy -= 0.5;
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