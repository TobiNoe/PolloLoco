class Cloud extends MovableObject {
    y = 10;
    width = 300;
    height = 200;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 0 + Math.random() * 500;
        this.y = 10;
        this.width = 300;
        this.height = 200;
    }
}