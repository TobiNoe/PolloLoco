class Bottle extends MovableObject {
    y = 350;
    width = 75;
    height = 75;

    constructor() {
        super().loadImage('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 200 + Math.random() * 2000;
    }

}