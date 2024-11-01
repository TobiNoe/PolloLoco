class Coin extends CollactableObject {
    offset = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
    };
    imagesCoin = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];
    collectCoinSound = setMutableAudio('./audio/collectCoin.mp3');

    /**
    * Represents a Coin object.
    * @constructor
    */
    constructor() {
        super().loadImage('./img/8_coin/coin_1.png');
        this.loadImages(this.imagesCoin);
        this.x = 200 + Math.random() * 1900;
        this.y = 200 - Math.random() * 100;
        this.width = 150;
        this.height = 150;
        this.animate();
    }

    /**
    * Animates the coin.
    */
    animate() {
        setStoppableInterval(() => this.playAnimation(this.imagesCoin), 300);
    }

}