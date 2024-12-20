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
    ];
    imagesStand = [
        './img/2_character_pepe/1_idle/idle/I-1.png'
    ];
    world;
    /* TODO: speed 1.0  */
    speed = 2.0;
    sleepTimer = 0;
    walkingSound = setMutableAudio('./audio/walking.mp3');
    snoringSound = setMutableAudio('./audio/snoring.mp3');
    lostSound = setMutableAudio('./audio/lost2.mp3');
    jumpingSound = setMutableAudio('./audio/jump.mp3');
    fallingSound = setMutableAudio('./audio/falling.mp3')

    /**
    * Represents a character in the game.
    */
    constructor() {
        super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.imagesStand);
        this.loadImages(this.imagesIdle);
        this.loadImages(this.imagesSleep);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesJumping);
        this.loadImages(this.imagesDead);
        this.loadImages(this.imagesHurt);
        this.applyGravity();
        this.animate();
    }

    /**
    * Starts the character animation loops.
    */
    animate() {
        setStoppableInterval(() => this.playCharacter(), 1000 / 60);
        setStoppableInterval(() => this.animateCharacter(), 180);
        setStoppableInterval(() => this.animateDeadCharacter(), 300);
    }

    /**
    * Plays character actions and handles movement.
    */
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
        this.world.cameraX = -this.x + 50;
    }

    /**
    * Animates the character based on its state.
    */
    animateCharacter() {
        if (!this.isDead()) {
            if (this.isHurt()) {
                this.playHurtAnimation();
            } else if (this.isJump) {
                this.playJumpAnimation();
            } else {
                if (this.isWalking()) {
                    this.walking();
                } else if (this.isIdle()) {
                    if (this.isDozing()) {
                        this.playIdleAnimation();
                    } else if (this.isSleeping()) {
                        this.playSleepAnimation();
                    }
                } else {
                    this.playStandAnimation();
                }
            }
        }
    }

    /**
    * Animates the dead character.
    */
    animateDeadCharacter() {
        if (this.isDead()) {
            if (this.timerEndScreen < 10) {
                this.animateDeath();
            } else {
                this.animateEndScreen();
            }
        }
    }

    /**
    * Plays the death animation for the character.
    */
    animateDeath() {
        this.timerEndScreen++;
        this.playAnimationIsDead(this.imagesDead);
        this.fallingSound.play();
    }

    /**
    * Animates the end screen when the character is dead.
    */
    animateEndScreen() {
        stopGame();
        changeGameResult('lost');
        showGameResult();
        this.lostSound.play();
    }

    /**
    * Stops the snoring sound if the sleepTimer is greater than or equal to 300.
    * @param {object} sleepTimer - The timer used to control the snoring sound.
    */
    stopSnoringSound(sleepTimer) {
        if (sleepTimer >= 300) {
            this.snoringSound.pause();
        }
    }

    /**
    * Checks if the character should move right.
    * @returns {boolean} True if character should move right, false otherwise.
    */
    isMoveRight() {
        return this.world.keyboard.right && this.x < this.world.level.levelEndX;
    }

    /**
    * Moves the character to the right.
    */
    moveRight() {
        this.stopSnoringSound(this.sleepTimer);
        super.moveRight();
        this.sleepTimer = 0;
    }

    /**
    * Checks if the character should move left.
    * @returns {boolean} True if character should move left, false otherwise.
    */
    isMoveLeft() {
        return this.world.keyboard.left && this.x > -250;
    }

    /**
    * Moves the character to the left.
    */
    moveLeft() {
        this.stopSnoringSound(this.sleepTimer);
        super.moveLeft();
        this.otherDirection = true;
        this.sleepTimer = 0;
    }

    /**
    * Checks if the character should jump.
    * @returns {boolean} True if character should jump, false otherwise.
    */
    isJumping() {
        return this.world.keyboard.space && !this.isAboveGround();
    }

    /**
    * Makes the character jump.
    */
    jump() {
        this.stopSnoringSound(this.sleepTimer);
        super.jump();
        this.sleepTimer = -100;
    }

    /**
    * Play the hurt animation.
    */
    playHurtAnimation() {
        this.playAnimation(this.imagesHurt);
        this.stopSnoringSound(this.sleepTimer);
    }

    /**
    * Play the sleep animation.
    */
    playSleepAnimation() {
        this.playAnimation(this.imagesSleep);
        this.snoringSound.play();
    }

    /**
    * Play the stand animation.
    */
    playStandAnimation() {
        this.playAnimation(this.imagesStand);
    }

    /**
    * Play the idle animation.
    */
    playIdleAnimation() {
        this.playAnimation(this.imagesIdle);
    }

    /**
    * Play the jump animation.
    */
    playJumpAnimation() {
        this.playAnimationJump(this.imagesJumping);
    }

    /**
    * Checks if the character is hurt.
    * @returns {boolean} True if character is hurt, false otherwise.
    */
    isHurt() {
        return super.isHurt() && !this.isJump;
    }

    /**
    * Checks if the character is walking.
    * @returns {boolean} True if character is walking, false otherwise.
    */
    isWalking() {
        return (
            (this.world.keyboard.right || this.world.keyboard.left) &&
            !this.isAboveGround() &&
            !this.isJump
        );
    }

    /**
    * Plays the walking animation and sound.
    */
    walking() {
        this.characterIdle = false;
        this.characterSleeping = false;
        this.playAnimation(this.imagesWalking);
        this.walkingSound.play();
    }

    /**
    * Checks if the character is idle.
    * @returns {boolean} True if character is idle, false otherwise.
    */
    isIdle() {
        return this.sleepTimer > 200;
    }

    /**
    * Checks if the character is dozing.
    * @returns {boolean} True if character is dozing, false otherwise.
    */
    isDozing() {
        return this.sleepTimer > 200 && this.sleepTimer <= 300;
    }

    /**
    * Checks if the character is sleeping.
    * @returns {boolean} True if character is sleeping, false otherwise.
    */
    isSleeping() {
        return this.sleepTimer > 300;
    }
}