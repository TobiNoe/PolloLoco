class Character extends MovableObject {
    x = 20;
    y = 178;
    width = 100;
    height = 250;
    color = 'red'
    imagesWalking = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];
    imagesJumping = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];
    world;
    speed = 1; // speed default 1
    walkingSound = new Audio('../audio/walking.mp3');

    constructor() {
        super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesJumping);
        this.applyGravity();
        this.animate();
    }

    animate() {

        setInterval(() => {
            this.walkingSound.pause();
            if (this.world.keyboard.right && this.x < this.world.level.levelEndX) {
                this.moveRight();
                /* this.walkingSound.play(); */
            }

            if (this.world.keyboard.left && this.x > -250) {
                this.moveLeft();
                this.otherDirection = true;
                /* this.walkingSound.play(); */

            }

            if (this.world.keyboard.space && !this.isAboveGround()) {
                this.jump();
            }

            //Layer move with Character
            this.world.cameraX = -this.x + 50;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.imagesJumping);
            }
        }, 200);

        setInterval(() => {
            if ((this.world.keyboard.right || this.world.keyboard.left) && !this.isAboveGround()) {
                this.playAnimation(this.imagesWalking);
            }
        }, 100);
    }
}