/**
 * Class representing a Chicken object.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    /**
     * Create a Chicken instance.
     */
    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.y = 350;
        this.height = 75;
        this.width = 75;
        this.imagesWalking = [
            './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
            './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
            './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
        ];
        this.x = 200 + Math.random() * 2400;
        this.loadImages(this.imagesWalking);
        this.animate();
        this.speed = 0.10 + Math.random() * 0.25;
    }

    /**
     * Animate the chicken object.
     */
    animate() {
        this.moveLeft(this.speed);
        setInterval(() => {
            this.playAnimation(this.imagesWalking);
        }, 200);
    }
}