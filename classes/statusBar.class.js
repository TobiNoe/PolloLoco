class StatusBar extends DrawableObject {
    y = 5;
    width = 200;
    height = 60;
    images = [
        './img/7_statusbars/4_bar_elements/statusbar_empty.png'
    ];
    percentage = 100;

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images[this.getImageIndex()];
        this.img = this.imgCache[path];
    }

    getImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}