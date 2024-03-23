class Cloud extends MovableObject {
    y = 20;
    move;
    width = 300;
    height = 200;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 0 + Math.random() * 500;
        this.move = Math.random() * 0.25;
        console.log(this.move);
        this.moveClouds(this.move);
        /* this.y = 10;
        this.width = 300;
        this.height = 200; */
    }

    moveClouds() {
        setInterval(() => {
            this.x -= this.move;            
        }, 1000 / 60);
    }
}