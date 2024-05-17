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
    hitSound = setMutableAudio('./audio/hit.mp3');
    hitEnemySound = setMutableAudio('./audio/hitandbirds.mp3');
    songSound = setMutableAudio('./audio/song.mp3');

    /**
    * Creates an instance of App.
    * @param {HTMLCanvasElement} canvas - The canvas element to render on.
    * @param {Object} keyboard - The keyboard input handler.
    */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkEvents();
        this.checkThrowing();
    }

    /**
    * Sets up the game world or application state by initializing the character's world
    * and starting the background music loop.
    */
    setWorld() {
        this.character.world = this;
        this.songSound.loop = true;
        this.songSound.play();
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
            this.checkStopSong();
            /* console.log('character sleepTimer:', this.character.sleepTimer); */
        }, 25);
    }

    /**
    * Sets up an interval to check and handle throwable objects and splashed bottles.
    */
    checkThrowing() {
        setStoppableInterval(() => {
            this.checkThrowableObject();
            this.checkSplashedBottles();
        }, 100);
    }

    /**
    * Checks if the character has passed a certain point and starts the endboss walking.
    * If the character's x position is greater than 2200, the endboss starts moving.
    */
    checkEndbossStartWalking() {
        if (this.character.x > 2200) {
            this.endboss.speed = 0.5;
        }
    }

    /**
    * Checks if the character has reached a position close to the endboss and sets the endboss to alert mode.
    * If the character's x position is greater than 2100, the endboss becomes alert.
    */
    checkEndbossAlert() {
        if (this.character.x > 2100) {
            this.endboss.isAlert = true;
        }
    }

    /**
    * Checks the distance between the character and the endboss to determine if the endboss should attack.
    * If the distance is less than 200 units, the endboss will attack; otherwise, it will not.
    */
    checkEndbossAttack() {
        if (this.endboss.x - this.character.x < 200) {
            this.endboss.isAttack = true;
        } else {
            this.endboss.isAttack = false;
        }
    }

    /**
 * Checks for collisions between throwable bottles and the endboss or the ground.
 * If a bottle collides with the endboss, the endboss takes damage and the bottle breaks.
 * If a bottle hits the ground, the bottle break sound is played if not muted.
 */
    checkCollisionEndboss() {
        this.throwableBottles.forEach(bottle => {
            if (this.isBottleCollidingWithEndboss(bottle)) {
                this.startHitProgressEndboss(bottle);
            } else if (this.isBottleCollidingWithGround(bottle)) {
                if (!mute) bottle.bottleBreakSound.play();
            }
        });
    }

    /**
     * Checks if a bottle is colliding with the endboss.
     * @param {Object} bottle - The bottle to check for collision.
     * @returns {boolean} True if the bottle is colliding with the endboss and hasn't hit an enemy yet.
     */
    isBottleCollidingWithEndboss(bottle) {
        return bottle.isColliding(this.endboss) && !bottle.hitEnemy;
    }

    /**
     * Handles the process when a bottle hits the endboss.
     * The endboss takes damage, the bottle break sound is played if not muted,
     * the status bar is updated, and the bottle is marked as broken.
     * @param {Object} bottle - The bottle that hit the endboss.
     */
    startHitProgressEndboss(bottle) {
        this.endboss.hit();
        if (!mute) bottle.bottleBreakSound.play();
        this.statusBarEndboss.setPercentage(this.endboss.energy);
        bottle.isBroken = true;
        bottle.hitEnemy = true;
    }

    /**
     * Checks if a bottle has collided with the ground.
     * @param {Object} bottle - The bottle to check for collision.
     * @returns {boolean} True if the bottle has hit the ground.
     */
    isBottleCollidingWithGround(bottle) {
        return bottle.y === 360 && bottle.speedY === 0;
    }

    /**
     * Checks for collisions between the character and enemies or the endboss.
     * If the character collides with an enemy or the endboss, the character's hit progress starts.
     */
    checkCollisionEnemys() {
        this.level.enemies.forEach((enemy) => {
            if (this.isCharacterCollidingWithEnemy(enemy) || this.isCharacterCollidingWithEndboss()) {
                this.startCharacterProgressHit();
            }
        });
    }

    /**
     * Checks if the character is colliding with a specific enemy.
     * @param {Object} enemy - The enemy to check for collision.
     * @returns {boolean} True if the character is colliding with the enemy and both are alive.
     */
    isCharacterCollidingWithEnemy(enemy) {
        return this.character.isColliding(enemy) && !enemy.isDead() && !this.character.isDead();
    }

    /**
     * Checks if the character is colliding with the endboss.
     * @returns {boolean} True if the character is colliding with the endboss and the character is alive.
     */
    isCharacterCollidingWithEndboss() {
        return this.character.isColliding(this.endboss) && !this.character.isDead();
    }

    /**
     * Initiates the hit progress for the character when colliding with an enemy or the endboss.
     * The character takes damage, the hit sound is played, and the status bar is updated.
     */
    startCharacterProgressHit() {
        this.character.hit();
        this.hitSound.play();
        this.statusBar.setPercentage(this.character.energy);
    }

    /**
     * Checks for collisions between the character and collectable items such as coins and bottles.
       * If the character collides with a coin, it is collected and added to the character's inventory.
     * If the character collides with a bottle and the bottle inventory is not full, it is collected.
     */
    checkCollisionCollectableItems() {
        this.level.items.forEach((item) => {
            let index = this.level.items.indexOf(item);
            if (this.isCollidingCoin(item)) {
                this.collectCoin(index, item);
            } else if (this.isCollidingBottle(item)) {
                this.collectBottle(index, item);
            }
        });
    }

    /**
     * Checks if the character is colliding with a coin.
     * @param {Object} item - The collectable item to check for collision.
     * @returns {boolean} True if the character is colliding with a coin.
     */
    isCollidingCoin(item) {
        return this.character.isColliding(item) && item.isCollectedItem() === 'coin';
    }

    /**
     * Checks if the character is colliding with a bottle and the bottle inventory is not full.
     * @param {Object} item - The collectable item to check for collision.
     * @returns {boolean} True if the character is colliding with a bottle and the bottle inventory is not full.
     */
    isCollidingBottle(item) {
        return this.character.isColliding(item) && item.isCollectedItem() === 'bottle' && this.collectedBottles < 100;
    }

    /**
     * Handles the process of collecting a coin.
     * @param {number} index - The index of the collected coin in the items array.
     * @param {Object} item - The coin item to be collected.
     */
    collectCoin(index, item) {
        item.collectCoinSound.play();
        this.level.items.splice(index, 1);
        this.collectedCoins += 20;
        this.coinBar.setPercentage(this.collectedCoins);
    }

    /**
     * Handles the process of collecting a bottle.
     * @param {number} index - The index of the collected bottle in the items array.
     * @param {Object} item - The bottle item to be collected.
     */
    collectBottle(index, item) {
        item.collectBottleSound.play();
        this.level.items.splice(index, 1);
        this.collectedBottles += 20;
        this.bottleBar.setPercentage(this.collectedBottles);
    }


    checkJumpOn() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isJumpOn(enemy) && !this.character.isColliding(enemy) && this.character.speedY < 0) {
                enemy.hit();
                this.hitEnemySound.play();
            }
        });
    }

    checkThrowableObject() {
        if (this.keyboard.w && !this.character.isDead() && this.collectedBottles > 0 && !this.character.otherDirection) {
            let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 100);
            if (!mute) bottle.throwSound.play();
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

    checkStopSong() {
        if (this.character.energy === 0 || this.endboss.energy === 0) {
            this.songSound.loop = false;
            this.songSound.pause();
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