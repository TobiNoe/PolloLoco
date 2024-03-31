class Coin extends MovableObject {
    /* y = 350; */
    width = 150;
    height = 150;

    constructor() {
        super().loadImage('./img/8_coin/coin_1.png');
        this.x = 200 + Math.random() * 2000;
        this.y = 250 - Math.random() * 100;
        console.log(this.x);
    }


}