class Cloud extends MovableObject {

    /**
    * Represents the constructor method of the class.
    * Initializes the properties of an instance of the class.
    */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png'); // Loads the image for the instance
        this.x = 0 + Math.random() * 2500; // Sets the x-coordinate of the instance randomly between 0 and 2500
        this.y = 0 + Math.random() * 100; // Sets the y-coordinate of the instance randomly between 0 and 100
        this.width = 300 + Math.random() * 100; // Sets the width of the instance randomly between 300 and 400
        this.height = this.width * 0.67; // Sets the height of the instance proportionally
        this.speed = Math.random() * 0.25; // Sets the speed of the instance randomly between 0 and 0.25
        this.animate(); // Calls the animate method to start the animation
    }

    /**
     * Represents the animate method.
     * Moves the instance to the left at a specific interval using a stoppable interval.
     */
    animate() {
        setStoppableInterval(() => this.moveLeft(this.speed), 1000 / 60); // Moves the instance to the left using the moveLeft method and a speed of this.speed
    }
}