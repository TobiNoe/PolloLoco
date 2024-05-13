class Character extends MovableObject {
    x = 20;
    y = 178;
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
    walkingSound = setMutableAudio('./audio/walking.mp3');
    lostSound = setMutableAudio('./audio/lost2.mp3');

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

    animate() {
        setStoppableInterval(() => this.playCharacter(), 1000 / 60);
        setStoppableInterval(() => this.animateCharacter(), 200);
        setStoppableInterval(() => this.animateDeadCharacter(), 300);
    }

    playCharacter() {
        this.sleepTimer++;
        if (!this.isDead()) {
            if (!this.noMove) {
                if (this.isMoveRight()) {
                    this.moveRight();
                } else if (this.isMoveLeft()) {
                    this.moveLeft();
                }
            }

            if (this.isJumping()) {
                this.jump(); 
            }
        }
        //Layer move with Character
        this.world.cameraX = -this.x + 50;
    }

    isMoveRight() {
        return this.world.keyboard.right && this.x < this.world.level.levelEndX;
    }

    moveRight() {
        super.moveRight();
        this.sleepTimer = 0;
    }

    isMoveLeft() {
        return this.world.keyboard.left && this.x > -250;
    }

    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        this.sleepTimer = 0;
    }

    isJumping() {
        return this.world.keyboard.space && !this.isAboveGround();
    }

    jump() {
        super.jump();
        this.sleepTimer = -100;
    }

    animateCharacter() {
        if (!this.isDead()) {
            if (this.isHurt()) {
                this.playAnimation(this.imagesHurt);
            } else if (this.isJump) {
                this.playAnimationJump(this.imagesJumping);
            } else {
                if (this.isWalking()) {
                    this.walking();
                } else if (this.isIdle()) {
                    if (this.isDozing()) {
                        this.playAnimation(this.imagesIdle);
                    } else if (this.isSleeping()) {
                        this.playAnimation(this.imagesSleep);
                    }
                } else {
                    this.loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
                }
            }
        }
    }

    isHurt() {
        return super.isHurt() && !this.isJump;
    }

    isWalking() {
        return (this.world.keyboard.right || this.world.keyboard.left) && !this.isAboveGround() && !this.isJump;
    }

    walking() {
        this.characterIdle = false;
        this.characterSleeping = false;
        this.playAnimation(this.imagesWalking);
        this.walkingSound.play();
    }

    isIdle() {
        return this.sleepTimer > 200;
    }

    isDozing() {
        return this.sleepTimer > 200 && this.sleepTimer <= 300;
    }

    isSleeping() {
        return this.sleepTimer > 300;
    }

    animateDeadCharacter() {
        if (this.isDead()) {
            if (this.timerEndScreen < 10) {
                this.animateDeath();
            } else {
                this.animateEndScreen();
            }
        }
    }

    animateDeath() {
        this.timerEndScreen++;
        this.playAnimationIsDead(this.imagesDead);
    }

    animateEndScreen() {
        stopGame();
        changeGameResult('lost');
        showGameResult();
        this.lostSound.play();
    }
}