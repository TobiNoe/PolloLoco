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


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Chick || this instanceof Chicken || this instanceof Character) {
            ctx.beginPath();
            ctx.lineWidth = '4';
            ctx.strokeStyle = 'green';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    drawFrameRed(ctx) {
        if (this instanceof CollactableObject) {
            ctx.beginPath();
            ctx.lineWidth = '4';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}