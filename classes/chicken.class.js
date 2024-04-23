class Chicken extends MovableObject {
    y = 350;
    height = 75;
    width = 75;
    energy = 2;
    imagesWalking = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    imageDead = './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    /**
     * Create a Chicken instance.
     */
    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 2400;
        this.loadImages(this.imagesWalking);
        this.animate();
        this.speed = 0.10 + Math.random() * 0.25;
    }

    /**
     * Animate the chicken object.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft(this.speed);
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.loadImage(this.imageDead);
            } else {
                this.playAnimation(this.imagesWalking);
            }
        }, 200);
    }
}