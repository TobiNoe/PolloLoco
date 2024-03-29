class Endboss extends MovableObject {
    y = 145;
    height = 300;
    width = 300;
    imagesWalking = [
       './img/4_enemie_boss_chicken/2_alert/G5.png',
       './img/4_enemie_boss_chicken/2_alert/G6.png',
       './img/4_enemie_boss_chicken/2_alert/G7.png',
       './img/4_enemie_boss_chicken/2_alert/G8.png',
       './img/4_enemie_boss_chicken/2_alert/G9.png',
       './img/4_enemie_boss_chicken/2_alert/G10.png',
       './img/4_enemie_boss_chicken/2_alert/G11.png',
       './img/4_enemie_boss_chicken/2_alert/G12.png',  
    ];

    constructor() {
        super().loadImage('./img/4_enemie_boss_chicken/2_alert/G5.png');
        this.x = 400;
        this.loadImages(this.imagesWalking);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.imagesWalking);
        }, 200);
    }


}