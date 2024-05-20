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
        setStoppableInterval(() => this.jumpingFly(), 1000 / 30);
    }

    /**
     * Makes the object fly upwards if it is above the ground or currently flying.
     * Updates the y-coordinate and speed of the object based on its acceleration.
     */
    jumpingFly() {
        if (this.isAboveGround() || this.isFlying()) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    }

    /**
     * Checks if the object is flying.
     * @returns {boolean} True if the object's vertical speed (speedY) is greater than 0, otherwise false.
     */
    isFlying() {
        return this.speedY > 0;
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above the ground; always true for throwable objects, or if the y-coordinate is less than 178 for other objects.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else if (this instanceof Chick) {
            return this.y < 370;
        } else {
            return this.y < 178;
        }
    }

    /**
     * Moves the object to the right if it is not dead.
     * Updates the x-coordinate of the object and sets the direction flag.
     */
    moveRight() {
        if (!this.isDead()) {
            this.x += this.speed;
            this.otherDirection = false;
        }
    }

    /**
     * Moves the object to the left if it is not dead.
     * Updates the x-coordinate of the object.
     */
    moveLeft() {
        if (!this.isDead()) {
            this.x -= this.speed;
        }
    }

    /**
     * Plays the specified animation for the object.
     * Cycles through the provided images and updates the object's image.
     * @param {Array} images - An array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    /**
     * Plays the death animation for the object.
     * Resets the current image if needed and plays the death animation sequence.
     * @param {Array} images - An array of image paths for the death animation.
     */
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

    /**
     * Plays the jump animation for the object.
     * Resets the current image if needed and plays the jump animation sequence.
     * @param {Array} images - An array of image paths for the jump animation.
     */
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
            this.checkJumpAnimationMovement(i);
        } else if (this.currentImage === images.length) {
            this.isJump = false;
            this.noMove = false;
            this.resetCurrentImage = true;
        }
    }

    /**
     * Checks and updates the movement of the object during the jump animation.
     * @param {number} i - The current index of the jump animation.
     */
    checkJumpAnimationMovement(i) {
        if (i === 3) {
            this.speedY = 20;
            this.noMove = false;
            this.jumpingSound.play();
        } else if (i === 8) {
            this.y = 178;
            this.noMove = true;
        }
    }

    /**
     * Initiates the jump action for the object.
     */
    jump() {
        this.isJump = true;
    }

    /**
     * Checks if the object is colliding with another object.
     * @param {Object} obj - The other object to check collision with.
     * @returns {boolean} True if the object is colliding with the other object, otherwise false.
     */
    isColliding(obj) {
        return this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom;
    }

    /**
     * Checks if the object is jumping on top of another object.
     * @param {Object} obj - The other object to check for a jump on.
     * @returns {boolean} True if the object is jumping on the other object, otherwise false.
     */
    isJumpOn(obj) {
        return this.x + this.width - this.offsetJumpOn.right > obj.x + obj.offset.right &&
            this.x + this.offsetJumpOn.left < obj.x + obj.width - obj.offset.right &&
            this.y + this.height - this.offsetJumpOn.bottom > obj.y + obj.offset.top &&
            this.y + this.offsetJumpOn.top < obj.y + obj.height - obj.offset.bottom;
    }

    /**
     * Reduces the object's energy when it is hit.
     * If the energy drops below zero, it is set to zero. Updates the last hit time.
     */
    hit() {
        this.energy -= 0.5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is currently hurt.
     * @returns {boolean} True if the object was hit within the last 0.5 seconds, otherwise false.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.5;
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} True if the object's energy is zero, otherwise false.
     */
    isDead() {
        return this.energy === 0;
    }

}