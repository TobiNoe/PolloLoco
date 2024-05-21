class Cloud extends MovableObject {

    /**
    * Represents the constructor method of the class.
    * Initializes the properties of an instance of the class.
    */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 0 + Math.random() * 2500;
        this.y = 0 + Math.random() * 100;
        this.width = 300 + Math.random() * 100;
        this.height = this.width * 0.67;
        this.speed = Math.random() * 0.25;
        this.animate();
    }

    /**
     * Represents the animate method.
     * Moves the instance to the left at a specific interval using a stoppable interval.
     */
    animate() {
        setStoppableInterval(() => this.moveLeft(this.speed), 1000 / 60);
    }
}