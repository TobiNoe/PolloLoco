class Coin extends MovableObject {
    width = 150;
    height = 150;
    img = './img/8_coin/coin_1.png'

    constructor() {
        super().loadImage('./img/8_coin/coin_1.png');
        this.x = 200 + Math.random() * 1900;
        this.y = 250 - Math.random() * 100;
    }

}