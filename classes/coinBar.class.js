class CoinBar extends StatusBar {
    percentage = 0;
    y = 90;
    height = 55;
    images = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    /**
    * Represents a Coin object.
    * @constructor
    */
    constructor() {
        super();
        this.loadImages(this.images);
        this.setPercentage(this.percentage);
    }
}