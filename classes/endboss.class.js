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

    constructor() {
        super().loadImage('./img/4_enemie_boss_chicken/2_alert/G5.png');
        this.x = 2550;
        this.speed = 0;
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesAlert);
        this.animate();
    }

    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '4';
        ctx.strokeStyle = 'yellow';
        ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.top - this.offset.bottom);
        ctx.stroke();
    }

    animate() {
        setStoppableInterval(() => this.moveLeft(this.speed), 25);

        setInterval(() => {
            if (!this.isDead()) {
                if (this.isHurt()) {
                    this.playAnimation(this.imagesHurt);
                    console.log('hurt');
                } else {
                    this.playAnimation(this.imagesWalking);
                }
            }
        }, 200);
    }


}