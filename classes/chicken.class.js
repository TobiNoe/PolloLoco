class Chicken extends MovableObject {
    y = 350;
    height = 75;
    width = 75;
    imagesWalking = [
       './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
       './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
       './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png' 
    ];

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 500;
        this.loadImages(this.imagesWalking);
        this.animate();
        this.speed = 0.10 + Math.random() * 0.25;
        console.log(this.speed);
    }

    animate() {
        this.moveLeft(this.speed);
        setInterval(() => {
            let i = this.currentImage % this.imagesWalking.length;
            // Modulo Operation speichert immer den rest 0,1,2,0,1,...
            let path = this.imagesWalking[i];
            this.img = this.imgCache[path];
            this.currentImage++;
        }, 200);
    }

}