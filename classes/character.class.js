class Character extends MovableObject {
    y = 178;
    width = 100;
    height = 250;
    imagesWalking = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];
    
    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.imagesWalking);
        this.x = 50;
        this.animate();
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.imagesWalking.length;
            // Modulo Operation speichert immer den rest 0,1,2,3,4,5,0,1....
            let path = this.imagesWalking[i];
            this.img = this.imgCache[path];
            this.currentImage++;
        }, 200);
    }

    jump() {


    }
}