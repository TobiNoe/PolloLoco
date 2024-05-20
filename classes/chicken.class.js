class Chicken extends MovableObject {
    y = 350;
    height = 75;
    width = 75;
    energy = 0.5;
    jumpTimer = 0;
    acceleration = 1;
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
        this.applyGravity();
    }

    /**
     * Animate the chicken object.
     */
    animate() {
        setStoppableInterval(() => this.moveLeft(this.speed), 25);
        setStoppableInterval(() => this.animateChicken(), 200);
        setStoppableInterval(() => this.chickJump(), 100);
    }

    /**
    * Plays the appropriate animation for a chicken based on its state.
    * If the chicken is dead, it loads the image of a dead chicken.
    * If the chicken is alive, it plays the walking animation.
    */
    animateChicken() {
        if (this.isDead()) {
            this.loadImage(this.imageDead);
        } else {
            this.playAnimation(this.imagesWalking);
        }
    }

    /**
     * Controls the jump behavior of a chick character in the game.
     * The chick jumps if the jumpTimer exceeds a certain threshold, 
     * and resets the timer after jumping. Ensures the chick doesn't
     * exceed a specific height after jumping.
     * 
     * @method
     */
    chickJump() {
        this.jumpTimer++;
        if (this.jumpTimer > 50 && this instanceof Chick && !this.isDead()) {
            this.speedY = 15;
            this.jumpTimer = 0;
            if (this.y > 370) {
                this.y = 370;
            }
        }
    }
}