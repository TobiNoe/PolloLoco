class Endboss extends MovableObject {
    y = 145;
    height = 300;
    width = 300;
    offset = {
        top: 45,
        bottom: 0,
        left: 15,
        right: 0
    };
    imagesWalking = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    imagesAlert = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    imagesHurt = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    imagesDead = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    imagesAttack = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    isAlert = false;
    isAttack = false;
    wonSound = setMutableAudio('./audio/win.mp3');

    /**
    * Represents a endboss in the game.
    */
    constructor() {
        super().loadImage('./img/4_enemie_boss_chicken/2_alert/G5.png');
        this.x = 2550;
        this.speed = 0;
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesAlert);
        this.loadImages(this.imagesAttack);
        this.loadImages(this.imagesDead);
        this.animate();
    }

    /**
    * Sets up the animation cycles.
    */
    animate() {
        setStoppableInterval(() => this.moveLeft(this.speed), 25);
        setStoppableInterval(() => this.animateEndbossMove(), 200);
        setStoppableInterval(() => this.animateEndbossDead(), 300);
    }

    /**
    * Animates the boss chicken when it is not dead.
    */
    animateEndbossMove() {
        if (!this.isDead()) {
            if (this.isHurt()) {
                this.playHurtAnimation();
            } else {
                if (this.isWalking()) {
                    this.playWalkAnimation();
                } else if (this.isAttacking()) {
                    this.playAttackAnimation();
                } else if (this.isEndbossAlert()) {
                    this.playAlertAnimation();
                } else {
                    this.playStandAnimation();
                }
            }
        }
    }

    /**
    * Animates the boss chicken when it is dead.
    */
    animateEndbossDead() {
        if (this.isDead()) {
            if (this.timerEndScreen < 8) {
                this.playDeadAnimation();
            } else {
                this.playEndScreenAnimation();
            }
        }
    }

    /**
    * Plays the hurt animation.
    */
    playHurtAnimation() {
        this.playAnimation(this.imagesHurt);
    }

    /**
    * Checks if the boss chicken is walking.
    * @returns {boolean} True if the boss chicken is walking, false otherwise.
    */
    isWalking() {
        return this.speed > 0 && !this.isAttack;
    }

    /**
    * Plays the walk animation.
    */
    playWalkAnimation() {
        this.playAnimation(this.imagesWalking);
    }

    /**
    * Checks if the boss chicken is attacking.
    * @returns {boolean} True if the boss chicken is attacking, false otherwise.
    */
    isAttacking() {
        return this.speed > 0 && this.isAttack;
    }

    /**
     * Plays the attack animation.
     */
    playAttackAnimation() {
        this.playAnimation(this.imagesAttack);
    }

    /**
     * Checks if the boss chicken is in alert mode.
     * @returns {boolean} True if the boss chicken is in alert mode, false otherwise.
     */
    isEndbossAlert() {
        return this.speed === 0 && this.isAlert;
    }

    /**
     * Plays the alert animation.
     */
    playAlertAnimation() {
        this.playAnimation(this.imagesAlert);
    }

    /**
     * Plays the stand animation.
     */
    playStandAnimation() {
        this.loadImage('./img/4_enemie_boss_chicken/1_walk/G1.png');
    }

    /**
     * Plays the dead animation.
     */
    playDeadAnimation() {
        this.timerEndScreen++;
        this.playAnimationIsDead(this.imagesDead);
    }

    /**
     * Plays the end screen animation and performs game-related actions.
     */
    playEndScreenAnimation() {
        stopGame();
        changeGameResult('win');
        showGameResult();
        this.wonSound.play();
    }

    /**
     * Decreases the boss chicken's energy by 20 and updates the last hit time.
     */
    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
}