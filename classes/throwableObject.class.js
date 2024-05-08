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
    throwSound = new Audio('./audio/throw.mp3');
    bottleBreakSound = new Audio('./audio/bottleBreak.mp3');

    constructor(x, y) {
        super().loadImage('./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.bottleRotation);
        this.loadImages(this.bottleSplash);
        this.height = 75;
        this.width = 75;
        this.throw(x, y);
        this.animation();
    }

    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 10;
        this.applyGravity();
        setStoppableInterval(() => {
            if (this.notOnGround()) {
                this.x += 5;
            } else {
                this.y = 360;
                this.speedY = 0;
                /* this.bottleBreakSound.play(); */
            }
        }, 25);
    }

    animation() {
        setStoppableInterval(() => {
            if (this.notOnGround() && !this.isBroken) {
                this.playAnimation(this.bottleRotation);
            } else if (!this.notOnGround() || this.isBroken) {
                this.playAnimationIsBroken(this.bottleSplash);
            }

        }, 100);
    }

    notOnGround() {
        return this.y < 360;
    }

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