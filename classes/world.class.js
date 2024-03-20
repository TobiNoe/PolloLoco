class World {
    character = new Character();
    chickens = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ]
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();        
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);

        this.chickens.forEach(chicken => {
            this.ctx.drawImage(chicken.img, chicken.x, chicken.y, chicken.width, chicken.height);
        });

       /*  let pos = 100;
        for (let i = 0; i < this.chickens.length; i++) {
            const chicken = this.chickens[i];
            this.ctx.drawImage(chicken.img, chicken.x + pos, chicken.y, chicken.width, chicken.height);
            pos = pos + 100;
        } */

        let self = this;
        requestAnimationFrame(function (){
            self.draw();
        });
    }
}