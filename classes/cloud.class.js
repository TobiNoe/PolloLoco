class Cloud extends MovableObject {
    y = 20;
    speed;
    width = 300;
    height = 200;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 0 + Math.random() * 500;
        this.move = Math.random() * 0.25;
        console.log(this.speed);
        this.moveClouds(this.speed);
        /* this.y = 10;
        this.width = 300;
        this.height = 200; */
    }

    moveClouds() {
        setInterval(() => {
            this.x -= this.speed;            
        }, 1000 / 60);
    }
}