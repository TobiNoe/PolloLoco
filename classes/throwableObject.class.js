class ThrowableObject extends MovableObject {
    throwing = true;
    acceleration = 1;
    bottleRotation = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    bottleSplash = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    isBroken = false;
    hitEnemy = false;
    throwSound = setMutableAudio('./audio/throw.mp3');
    bottleBreakSound = setMutableAudio('./audio/bottleBreak.mp3');

    /**
     * Creates a new throwable bottle object.
     * @param {number} x - The initial x-coordinate of the bottle.
     * @param {number} y - The initial y-coordinate of the bottle.
     */
    constructor(x, y) {
        super().loadImage('./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.bottleRotation);
        this.loadImages(this.bottleSplash);
        this.height = 75;
        this.width = 75;
        this.throw(x, y);
        this.animation();
    }

    /**
     * Initializes the bottle's position and starts the throwing action.
     * @param {number} x - The initial x-coordinate of the bottle.
     * @param {number} y - The initial y-coordinate of the bottle.
     */
    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 10;
        this.applyGravity();
        setStoppableInterval(() => this.throwBottle(), 25);
    }

    /**
     * Updates the bottle's position while it is being thrown.
     * Moves the bottle to the right if it is not on the ground; otherwise, stops its vertical movement.
     */
    throwBottle() {
        if (this.notOnGround()) {
            this.x += 5;
        } else {
            this.y = 360;
            this.speedY = 0;
        }
    }

    /**
     * Starts the bottle's animation.
     * Sets an interval to animate the bottle flying.
     */
    animation() {
        setStoppableInterval(() => this.animateBottleFlying(), 100);
    }

    /**
     * Checks if the bottle is not broken.
     * @returns {boolean} True if the bottle is not broken, otherwise false.
     */
    isNotBroken() {
        return !this.isBroken;
    }

    /**
     * Checks if the bottle is not on the ground.
     * @returns {boolean} True if the bottle is not on the ground, otherwise false.
     */
    notOnGround() {
        return this.y < 360;
    }

    /**
     * Animates the bottle while it is flying.
     * Plays the flying animation if the bottle is not on the ground and not broken,
     * otherwise plays the broken animation.
     */
    animateBottleFlying() {
        if (this.notOnGround() && this.isNotBroken()) this.playAnimation(this.bottleRotation);
        else if (!this.notOnGround() || !this.isNotBroken()) this.playAnimationIsBroken(this.bottleSplash);
    }

    /**
     * Plays the animation for the broken bottle.
     * Resets the current image if needed and plays the broken animation sequence.
     * @param {Array} images - The array of images to be used for the broken animation.
     */
    playAnimationIsBroken(images) {
        if (this.resetCurrentImage) {
            this.currentImage = 0;
            this.resetCurrentImage = false;
        } else if (this.currentImage < images.length) {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imgCache[path];
            this.currentImage++;
        } else {
            this.throwing = false;
        }
    }
}