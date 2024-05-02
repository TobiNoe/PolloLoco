class Cloud extends MovableObject {
    y = 20;
    width = 300;
    height = 200;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 0 + Math.random() * 2500;
        this.speed = Math.random() * 0.25;
        this.animate();
    }


    animate() {
        setStoppableInterval(() => {
            this.moveLeft(this.speed);  
        }, 1000 / 60);
    }
}