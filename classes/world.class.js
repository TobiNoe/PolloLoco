class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    cameraX = 0;
    statusBar = new StatusBar();
    throwableBottles = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkEvents();
    }


    setWorld() {
        this.character.world = this;
    }

    checkEvents() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowableObject();
        }, 100);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                /* console.log('Collision with Character, Energy', this.character.energy); */
            }
        });

        this.level.items.forEach((item) => {
            if (this.character.isColliding(item)) {
                console.log('item collected');
            }

        });
    }

    checkThrowableObject() {
        if (this.keyboard.w) {
            console.log('bootle werfen');
            let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 100);
            this.throwableBottles.push(bottle);
            return;
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.cameraX, 0);

        this.drawObjectsIntoMap(this.level.layers);
        this.drawObjectsIntoMap(this.level.clouds);

        this.ctx.translate(-this.cameraX, 0);
        //space for fixed objects
        this.drawIntoMap(this.statusBar);
        this.ctx.translate(this.cameraX, 0);

        this.drawObjectsIntoMap(this.level.items);
        this.drawObjectsIntoMap(this.level.enemies);
        this.drawObjectsIntoMap(this.throwableBottles);

        this.drawIntoMap(this.character);

        this.ctx.translate(-this.cameraX, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    drawObjectsIntoMap(arr) {
        arr.forEach(obj => {
            this.drawIntoMap(obj);
        });
    }

    drawIntoMap(obj) {
        /*  otherDirection = true / Taste nach Links wurde gedrückt  */
        if (obj.otherDirection) {
            this.flipImage(obj);
        }

        //draw Object
        obj.draw(this.ctx);

        //draw rectangle
        obj.drawFrame(this.ctx);
        obj.drawFrameRed(this.ctx);

        /*  otherDirection = false / Taste nach Links wurde nicht gedrückt  */
        if (obj.otherDirection) {
            this.flipImageBack(obj);
        }
    }

    flipImage(obj) {
        this.ctx.save(); // Einstellungen werden gespeichert
        this.ctx.translate(obj.width, 0); // Der Translate-Befehl setzt die gedrehte Position des Objektes neu, indem die Breite des Objektes abgezogen wird
        this.ctx.scale(-1, 1); // Das Pbjekt wird negiert (gedreht) in den Canvas gelade (scaliert)
        obj.x = obj.x * -1; //Die x-Koordinate des Objektes muß einmal negiert werden, weil die X-Achse im Cnavas umgedreht wird (0 ist jetzt Rechts)
    }

    flipImageBack(obj) {
        this.ctx.restore(); // Normale Einstellungen des Canvas werden wieder geladen
        obj.x = obj.x * -1; // X-Achse wird wieder zurück gedreht (0 ist wieder Links)
    }
}