class Character extends MovableObject {
    y = 178;
    width = 100;
    height = 250;
    imagesWalking = [
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png',
        './img/2_character_pepe/2_walk/W-21.png'
    ];
    world;
    speed = 1;
    walkingSound = new Audio('../audio/walking.mp3');

    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.imagesWalking);
        this.x = 20;
        this.animate();
    }

    animate() {

        setInterval(() => {
            this.walkingSound.pause();
            if (this.world.keyboard.right && this.x < this.world.level.levelEndX) {
                this.x += this.speed;
                this.otherDirection = false;
                console.log(this.x);
                console.log(this.world.level.levelEndX);
                /* this.walkingSound.play(); */
            }

            if (this.world.keyboard.left && this.x > -250) {
                this.x -= this.speed;
                this.otherDirection = true;
                /* this.walkingSound.play(); */
                
            }

            //Layer move with Character
            this.world.cameraX = -this.x + 50;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.right || this.world.keyboard.left) {
                this.playAnimation(this.imagesWalking);
            }
        }, 100);
    }

    jump() {


    }
}