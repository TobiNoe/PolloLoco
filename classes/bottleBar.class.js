class BottleBar extends StatusBar {
    percentage = 0;
    y = 50;
    height = 55;
    images = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.images);
        this.setPercentage(this.percentage);
    }
}