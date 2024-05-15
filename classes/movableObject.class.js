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
    timerEndScreen = 0;
    /* jumpingSound = setMutableAudio('./audio/jump.mp3'); */

    /**
     * Simulates gravity by applying a downward force to the object.
     */
    applyGravity() {
        setStoppableInterval(() => {
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
            return this.y < 178;
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
                this.jumpingSound.play();
            } else if (i === 8) {
                this.y = 178;
                this.noMove = true;
            }
        } else if (this.currentImage = images.length) {
            this.isJump = false;
            this.noMove = false;
            this.resetCurrentImage = true;
        }
    }

    jump() {
        this.isJump = true;
    }

    isColliding(obj) {
        // R -> L check collision Charater right side with obj left side //korrektur da Offset-Links addiert werden musste!!! und nicht Offset-Rechts
        // L -> R check collision Charater left side with obj right side side
        // T -> B check collision Charater ontop with obj
        // B -> T check collision Charater bottom the obj
        return this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
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