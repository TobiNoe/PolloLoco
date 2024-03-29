class Endboss extends MovableObject {
    y = 350;
    height = 150;
    width = 150;
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
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 500;
        this.loadImages(this.imagesWalking);
        this.animate();
        this.speed = 0.10 + Math.random() * 0.25;
        console.log(this.speed);
    }


}