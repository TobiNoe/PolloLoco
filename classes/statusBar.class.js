class StatusBar extends DrawableObject {
    x = 0;
    width = 200;
    height = 60;
    percentage = 100;

    /**
    * read index of image and load this image in variable img
    * @param {number} percentage 
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images[this.getImageIndex()];
        this.img = this.imgCache[path];
    }

    /**
    * Returns the index of the image to be displayed based on the percentage value.
    * @returns {number} - The index of the image.
    */
    getImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}