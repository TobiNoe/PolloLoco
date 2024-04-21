class ThrowableObject extends MovableObject {
    throwing = true;
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
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

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
        setInterval(() => {
            if (this.onGround()) {
                this.x += 5;
            } else {
                this.y = 360;
                this.speedY = 0;
            }
        }, 25);
    }

    animation() {
        setInterval(() => {
            if (this.onGround()) {
                this.playAnimation(this.bottleRotation);
            }

        }, 100);

        setInterval(() => {
            if (!this.onGround() && this.throwing) {
                this.playAnimationOnTime(this.bottleSplash);
                this.throwing = false;
            }
        }, 250);
    }

    onGround() {
        return this.y < 360;
    }
}