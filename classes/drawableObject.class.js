class DrawableObject {
    x;
    y;
    width;
    height;
    img;
    imgCache = {};
    currentImage = 0;


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
        if (this instanceof Character || this instanceof Chick || this instanceof Chicken) {
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