class LayerObject extends MovableObject {
    width = 720;
    height = 480;

    /**
    * Creates an instance of LayerObject.
    * @param {string} src - The image source path for the LayerObject.
    * @param {number} x - The x position of the LayerObject.
    */
    constructor(src, x) {
        super().loadImage(src);
        this.x = x;
        this.y = 480 - this.height;
    }
}