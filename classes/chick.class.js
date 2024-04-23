class Chick extends Chicken {
    y = 370;
    height = 50;
    width = 50;
    imagesWalking = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png' 
     ];
     imageDead = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';

     constructor() {
        super();
        this.loadImages(this.imagesWalking);
    }
}