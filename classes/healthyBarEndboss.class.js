class HealthyBarEndboss extends StatusBar {
    y = 5;
    x = 510;
    height = 58;
    images = [
        './img/7_statusbars/2_statusbar_endboss/green/green0.png',
        './img/7_statusbars/2_statusbar_endboss/green/green20.png',
        './img/7_statusbars/2_statusbar_endboss/green/green40.png',
        './img/7_statusbars/2_statusbar_endboss/green/green60.png',
        './img/7_statusbars/2_statusbar_endboss/green/green80.png',
        './img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.images);
        this.setPercentage(this.percentage);
    }
}