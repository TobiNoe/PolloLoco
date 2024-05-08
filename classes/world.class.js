class World {
    character = new Character();
    level = loadLevel1();
    canvas;
    ctx;
    keyboard;
    cameraX = 0;
    statusBar = new HealthyBar();
    statusBarEndboss = new HealthyBarEndboss();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    collectedCoins = 0;
    collectedBottles = 0;
    throwableBottles = [];
    endboss = new Endboss();
    hitSound = new Audio('./audio/hit.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkEvents();
        this.checkThrowing();
    }


    setWorld() {
        this.character.world = this;
    }

    /**
     * check possible Events and call the checkFunctions for possibilities
     */
    checkEvents() {
        setStoppableInterval(() => {
            this.checkCollisionEnemys();
            this.checkJumpOn();
            this.checkCollisionCollectableItems();
            this.checkEndbossAlert();
            this.checkEndbossAttack();
            this.checkEndbossStartWalking();
            this.checkCollisionEndboss();
            /* console.log('character sleepTimer:', this.character.sleepTimer); */
        }, 25);
    }

    checkThrowing() {
        setStoppableInterval(() => {
            this.checkThrowableObject();
            this.checkSplashedBottles();
        }, 100);
    }

    checkEndbossStartWalking() {
        if (this.character.x > 2200) { 
            this.endboss.speed = 0.5;
        }
    }

    checkEndbossAlert() {
        if (this.character.x > 2100) { 
            this.endboss.isAlert = true;
        }  
    }

    checkEndbossAttack() {
        if (this.endboss.x - this.character.x < 200) {
            this.endboss.isAttack = true;
        } else {
            this.endboss.isAttack = false;
        }
    }

    checkCollisionEndboss () {
        this.throwableBottles.forEach(bottle => {
            if (bottle.isColliding(this.endboss) && !bottle.hitEnemy) {
                this.endboss.hit();
                bottle.bottleBreakSound.play();
                this.statusBarEndboss.setPercentage(this.endboss.energy);
                bottle.isBroken = true;
                bottle.hitEnemy = true;
                /* console.log('Endboss energy', this.endboss.energy); */
            }
        });
    }

    checkCollisionEnemys() {
        this.level.enemies.forEach((enemy) => {
            if ((this.character.isColliding(enemy) && !enemy.isDead()) || this.character.isColliding(this.endboss)) {
                this.character.hit();
                this.hitSound.play();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkCollisionCollectableItems() {
        this.level.items.forEach((item) => {
            let index = this.level.items.indexOf(item);
            if (this.character.isColliding(item) && item.isCollectedItem() === 'coin') {
                item.collectCoinSound.play();
                this.level.items.splice(index, 1);
                this.collectedCoins += 20;
                this.coinBar.setPercentage(this.collectedCoins);
            } else if (this.character.isColliding(item) && item.isCollectedItem() === 'bottle' && this.collectedBottles < 100) {
                item.collectBottleSound.play();
                this.level.items.splice(index, 1);
                this.collectedBottles += 20;
                this.bottleBar.setPercentage(this.collectedBottles);
            }
        });
    }

    //&& !this.character.isColliding(enemy)    
    checkJumpOn() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isJumpOn(enemy) && !this.character.isColliding(enemy) && this.character.speedY < 0) {
                enemy.hit();
            }
        });
    }

    checkThrowableObject() {
        if (this.keyboard.w && !this.character.isDead() && this.collectedBottles > 0 && !this.character.otherDirection) {
            let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 100);
            bottle.throwSound.play();
            this.character.sleepTimer = 0;
            this.throwableBottles.push(bottle);
            this.collectedBottles -= 20;
            this.bottleBar.setPercentage(this.collectedBottles);
        }
    }
    //check on top if enboss is collided    
    checkSplashedBottles() {
        this.throwableBottles.forEach((bottle) => {
            let index = this.throwableBottles.indexOf(bottle);
            if (!this.throwableBottles[index].throwing) {   
                this.throwableBottles.splice(index, 1);
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.cameraX, 0);

        this.drawObjectsIntoMap(this.level.layers);
        this.drawObjectsIntoMap(this.level.clouds);

        this.ctx.translate(-this.cameraX, 0);
        //space for fixed objects
        this.drawIntoMap(this.statusBar);
        this.drawIntoMap(this.statusBarEndboss);
        this.drawIntoMap(this.coinBar);
        this.drawIntoMap(this.bottleBar);
        this.ctx.translate(this.cameraX, 0);

        this.drawObjectsIntoMap(this.level.items);
        this.drawObjectsIntoMap(this.level.enemies);
        this.drawIntoMap(this.endboss);
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
        /* obj.drawFrame(this.ctx); */
        /* obj.drawFrameRed(this.ctx); */
        /* obj.drawFrameGreen(this.ctx); */

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