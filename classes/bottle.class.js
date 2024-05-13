class Bottle extends CollactableObject {
    offset = {
        top: 10,
        bottom: 5,
        left: 25,
        right: 10
    };
    imagesBottle = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]
    collectBottleSound = setMutableAudio('./audio/collect.mp3');

    /**
     * Creates an instance of YourClass.
     * @constructor
     */
    constructor() {
        super().loadImage(this.imagesBottle[this.randomImage()]);
        this.x = 200 + Math.random() * 2000;
        this.y = 350;
        this.width = 75;
        this.height = 75;
    }

    /**
     * Generates a random image index.
     * @returns {number} - The randomly generated index.
     */
    randomImage() {
        let imageIndex = Math.round(Math.random() * 1);
        return imageIndex;
    }
}