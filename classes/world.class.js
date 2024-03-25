class World {
    layers = [
        new LayerObject('./img/5_background/layers/air.png', 0),
        new LayerObject('./img/5_background/layers/3_third_layer/1.png', 0),
        new LayerObject('./img/5_background/layers/2_second_layer/1.png', 0),
        new LayerObject('./img/5_background/layers/1_first_layer/1.png', 0)
    ];
    character = new Character();
    chickens = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    clouds = [
        new Cloud(),
        new Cloud()
    ];
    canvas;
    ctx;
    keyboard;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }


    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawObjectsIntoMap(this.layers);
        this.drawObjectsIntoMap(this.clouds);
        this.drawObjectsIntoMap(this.chickens);
        this.drawIntoMap(this.character);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    drawObjectsIntoMap(arr){
        arr.forEach(obj => {
            this.drawIntoMap(obj);
        });   
    }

    drawIntoMap(obj) {
        this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);  
    }
}