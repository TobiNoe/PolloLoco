class DrawableObject {
    x;
    y;
    width;
    height;
    img;
    imgCache = {};
    currentImage = 0;
    resetCurrentImage = true;

    /**
    * Offset of Obj with initial values set to 0.
    * @type {Offset}
    */
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    /**
    * Loads and sets an image using the given path.
    * @param {string} path - The path of the image.
    */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
    * Loads and sets multiple images using the given array of paths.
    * @param {string[]} arr - The array of image paths.
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

    /**
    * Draws the image on the canvas context.
    * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
    */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}