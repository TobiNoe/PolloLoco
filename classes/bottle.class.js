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

    constructor() {
        super().loadImage(this.imagesBottle[this.randomImage()]);
        this.x = 200 + Math.random() * 2000;
        this.y = 350;
        this.width = 75;
        this.height = 75;
    }

    randomImage(){
        let imageIndex = Math.round(Math.random() * 1);
        console.log(imageIndex);
        return imageIndex;
    }

    drawFrameRed(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '4';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.top - this.offset.bottom);
        ctx.stroke();
    }

}