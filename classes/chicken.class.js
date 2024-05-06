class Chicken extends MovableObject {
    y = 350;
    height = 75;
    width = 75;
    energy = 0.5;
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
        this.speed = 0.10 + Math.random() * 0.25;
        this.animate();
    }

    /**
     * Animate the chicken object.
     */
    animate() {
        
        setStoppableInterval(() => this.moveLeft(this.speed), 25);


        setStoppableInterval(() => {
            if (this.isDead()) {
                this.loadImage(this.imageDead);
            } else {
                this.playAnimation(this.imagesWalking);
            }
        }, 200);
    }
}