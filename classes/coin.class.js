class Coin extends CollactableObject {
    offset = {
        top: 50,
        bottom:50,
        left: 50,
        right: 50
    };

    constructor() {
        super().loadImage('./img/8_coin/coin_1.png');
        this.x = 200 + Math.random() * 1900;
        this.y = 200 - Math.random() * 100;
        this.width = 150;
        this.height = 150;
    }

    drawFrameRed(ctx) {
            ctx.beginPath();
            ctx.lineWidth = '4';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
    }

}