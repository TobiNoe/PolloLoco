class World {
    layers = [
        new LayerObject('./img/5_background/layers/air.png', -719),
        new LayerObject('./img/5_background/layers/3_third_layer/2.png', -719),
        new LayerObject('./img/5_background/layers/2_second_layer/2.png', -719),
        new LayerObject('./img/5_background/layers/1_first_layer/2.png', -719),

        new LayerObject('./img/5_background/layers/air.png', 0),
        new LayerObject('./img/5_background/layers/3_third_layer/1.png', 0),
        new LayerObject('./img/5_background/layers/2_second_layer/1.png', 0),
        new LayerObject('./img/5_background/layers/1_first_layer/1.png', 0),
        new LayerObject('./img/5_background/layers/air.png', 719),
        new LayerObject('./img/5_background/layers/3_third_layer/2.png', 719),
        new LayerObject('./img/5_background/layers/2_second_layer/2.png', 719),
        new LayerObject('./img/5_background/layers/1_first_layer/2.png', 719),

        new LayerObject('./img/5_background/layers/air.png', 719 * 2),
        new LayerObject('./img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new LayerObject('./img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new LayerObject('./img/5_background/layers/1_first_layer/1.png', 719 * 2),
        new LayerObject('./img/5_background/layers/air.png', 719 * 3),
        new LayerObject('./img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new LayerObject('./img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new LayerObject('./img/5_background/layers/1_first_layer/2.png', 719 * 3)
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
    cameraX = 0;

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

        this.ctx.translate(this.cameraX, 0);

        this.drawObjectsIntoMap(this.layers);
        this.drawObjectsIntoMap(this.clouds);
        this.drawObjectsIntoMap(this.chickens);
        this.drawIntoMap(this.character);

        this.ctx.translate(-this.cameraX, 0);

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
        /*  otherDirection = true / Taste nach Links wurde gedrückt  */
        if (obj.otherDirection) {
            this.ctx.save(); // Einstellungen werden gespeichert
            this.ctx.translate(obj.width, 0); // Der Translate-Befehl setzt die gedrehte Position des Objektes neu, indem die Breite des Objektes abgezogen wird
            this.ctx.scale(-1, 1); // Das Pbjekt wird negiert (gedreht) in den Canvas gelade (scaliert)
            obj.x = obj.x * -1; //Die x-Koordinate des Objektes muß einmal negiert werden, weil die X-Achse im Cnavas umgedfreht wird (0 ist jetzt Rechts)
        }
        this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
        /*  otherDirection = true / Taste nach Links wurde gedrückt  */
        if (obj.otherDirection) {
            this.ctx.restore(); // Normale Einstellungen des Canvas werden wieder geladen
            obj.x = obj.x * -1; // X-Achse wird wieder zurück gedreht (0 ist wieder Links)
        }
    }
}