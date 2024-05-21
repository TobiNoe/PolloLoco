class Chicken extends Enemy {
    /* y = 350;
    height = 75;
    width = 75;
    energy = 0.5;
    jumpTimer = 0;
    acceleration = 1; */
    imagesWalking = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    imageDead = './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'

    /**
     * Create a Chicken instance.
     */
    constructor(min, max) {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = Math.random() * (max - min) + min;
        this.loadImages(this.imagesWalking);
        this.speed = 0.10 + Math.random() * 0.25;
        this.animate();
    }

    /**
     * Animate the chicken object.
     */
    animate() {
        setStoppableInterval(() => this.moveLeft(this.speed), 25);
        setStoppableInterval(() => this.animateChicken(), 200);
    }
}