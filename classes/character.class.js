class Character extends MovableObject {
    x = 20; // default 20
    y = 175;
    width = 100;
    height = 250;
    offset = {
        top: 100,
        bottom: 25,
        left: 15,
        right: 25
    };
    offsetJumpOn = {
        top: 225,
        bottom: 5,
        left: 25,
        right: 30
    };
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
    imagesDead = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];
    imagesHurt = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];
    imagesIdle = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    imagesSleep = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]
    world;
    speed = 1; // speed default 1
    sleepTimer = 0;
    timerEndScreen = 0;
    walkingSound = new Audio('../audio/walking.mp3');

    constructor() {
        super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.imagesIdle);
        this.loadImages(this.imagesSleep);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesJumping);
        this.loadImages(this.imagesDead);
        this.loadImages(this.imagesHurt);
        this.applyGravity();
        this.animate();
    }

    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '4';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.top - this.offset.bottom);
        ctx.stroke();
    }

    drawFrameRed(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '4';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x + this.offsetJumpOn.left, this.y + this.offsetJumpOn.top, this.width - this.offsetJumpOn.right - this.offsetJumpOn.left, this.height - this.offsetJumpOn.top - this.offsetJumpOn.bottom);
        ctx.stroke();
    }

    animate() {

        setInterval(() => {
            this.sleepTimer++;
            this.walkingSound.pause();
            if (this.world.keyboard.right && this.x < this.world.level.levelEndX && !this.noMove) {
                this.moveRight();
                this.sleepTimer = 0;
                /* this.walkingSound.play(); */
            }

            if (this.world.keyboard.left && this.x > -250 && !this.isDead() && !this.noMove) {
                this.moveLeft();
                this.otherDirection = true;
                this.sleepTimer = 0;
                /* this.walkingSound.play(); */

            }

            if (this.world.keyboard.space && !this.isAboveGround() && !this.isDead()) {
                this.jump();
                this.sleepTimer = -100;
            }

            //Layer move with Character
            this.world.cameraX = -this.x + 50;

        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead()) {
                if (this.isHurt() && !this.isJump) {
                    this.playAnimation(this.imagesHurt);
                } else if (this.isJump) {
                    this.playAnimationJump(this.imagesJumping);
                } else {
                    if ((this.world.keyboard.right || this.world.keyboard.left) && !this.isAboveGround() && !this.isJump) {
                        this.characterIdle = false;
                        this.characterSleeping = false;
                        this.playAnimation(this.imagesWalking);
                    } else if (this.sleepTimer > 200) {
                        if (this.sleepTimer > 200 && this.sleepTimer <= 300) {
                            this.playAnimation(this.imagesIdle);
                        } else if (this.sleepTimer > 300) {
                            this.playAnimation(this.imagesSleep);
                        }
                    } else {
                        this.loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
                    }
                }
            }
        }, 200);

        /* setInterval(() => {
            if (!this.isDead()) {
                if (this.isJump) {
                    this.playAnimationJump(this.imagesJumping);
                }
            }
        }, 200); */

        setInterval(() => {
            if (this.isDead()) {
                if (this.timerEndScreen < 10) {
                    this.timerEndScreen++;
                    console.log(this.timerEndScreen);
                    this.playAnimationIsDead(this.imagesDead);  
                } else {
                    showGameResultLost();
                }
            }
        }, 300);
    }
}