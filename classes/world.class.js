class World {
    layers = [
        new LayerObject('./img/5_background/layers/3_third_layer/1.png'),
        new LayerObject('./img/5_background/layers/2_second_layer/1.png'),
        new LayerObject('./img/5_background/layers/1_first_layer/1.png')
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

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.layers.forEach(layer =>{
            this.ctx.drawImage(layer.img, layer.x, layer.y, layer.width, layer.height);
        });
        

        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);

        this.chickens.forEach(chicken => {
            this.ctx.drawImage(chicken.img, chicken.x, chicken.y, chicken.width, chicken.height);
        });

        this.clouds.forEach(cloud => {
            this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);
        });


        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }
}