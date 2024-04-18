class Coin extends CollactableObject {

    constructor() {
        super().loadImage('./img/8_coin/coin_1.png');
        this.x = 200 + Math.random() * 1900;
        this.y = 250 - Math.random() * 100;
        this.width = 150;
        this.height = 150;
    }

}