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
            this.endboss.speed = 0.7;
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
            this.endboss.speed = 0.9;
        } else if (this.endboss.x - this.character.x >= 200 && this.endboss.speed > 0) {
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


    /**
     * Checks if the character has jumped on top of any enemies.
     * If the character successfully jumps on an enemy, the enemy's hit progress starts.
     */
    checkJumpOn() {
        this.level.enemies.forEach((enemy) => {
            if (this.isJumpOn(enemy) && !enemy.isDead()) {
                this.startProgressEnemyHit(enemy);
            }
        });
    }

    /**
     * Checks if the character has successfully jumped on top of a specific enemy.
     * @param {Object} enemy - The enemy to check for the jump-on collision.
     * @returns {boolean} True if the character has successfully jumped on the enemy and is not colliding with it.
     */
    isJumpOn(enemy) {
        return this.character.isJumpOn(enemy) && !this.character.isColliding(enemy) && this.character.speedY < 0;
    }

    /**
     * Initiates the hit progress for an enemy when the character successfully jumps on it.
     * The enemy takes damage and the hit enemy sound is played.
     * @param {Object} enemy - The enemy that the character successfully jumped on.
     */
    startProgressEnemyHit(enemy) {
        enemy.hit();
        this.hitEnemySound.play();
    }

    /**
     * Checks if the character is attempting to throw a bottle and initiates the throwing action if so.
     */
    checkThrowableObject() {
        if (this.isThrowingBottle()) {
            this.throwBottle();
        }
    }

    /**
     * Checks if the character is currently attempting to throw a bottle.
     * @returns {boolean} True if the character is pressing the throw button, alive, has collected bottles, and is not facing the other direction.
     */
    isThrowingBottle() {
        return this.keyboard.w && !this.character.isDead() && this.collectedBottles > 0 && !this.character.otherDirection && this.throwableBottles.length === 0;
    }

    /**
     * Throws a bottle from the character's position if the conditions are met.
     * Creates a new throwable bottle object, plays the throw sound (if not muted), resets the character's sleep timer,
     * deducts bottles from the inventory, and updates the bottle bar.
     */
    throwBottle() {
        let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 100);
        if (!mute) bottle.throwSound.play();
        this.character.sleepTimer = 0;
        this.throwableBottles.push(bottle);
        this.collectedBottles -= 20;
        this.bottleBar.setPercentage(this.collectedBottles);
    }


    /**
     * Checks for splashed bottles and removes them from the list of throwable bottles.
     * Removes any bottles from the list that are no longer being thrown.
     */
    checkSplashedBottles() {
        this.throwableBottles.forEach((bottle) => {
            let index = this.throwableBottles.indexOf(bottle);
            if (!this.throwableBottles[index].throwing) {
                this.throwableBottles.splice(index, 1);
            }
        });
    }

    /**
     * Stops the background music when either the character or the endboss runs out of energy.
     * If either the character's or the endboss's energy reaches zero, the background music stops.
     */
    checkStopSong() {
        if (this.character.energy === 0 || this.endboss.energy === 0) {
            this.songSound.loop = false;
            this.songSound.pause();
        }
    }

    /**
     * Draws all game elements onto the canvas.
     * This includes the background, characters, enemies, items, status bars, and throwable bottles.
     * Sapce for fixed Objects between this.ctx.translate(-this.cameraX, 0); and this.ctx.translate(this.cameraX, 0);
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0);
        this.drawObjectsIntoMap(this.level.layers);
        this.drawObjectsIntoMap(this.level.clouds);
        this.ctx.translate(-this.cameraX, 0);
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

    /**
     * Draws an array of game objects onto the canvas.
     * @param {Array} arr - The array of game objects to be drawn.
     */
    drawObjectsIntoMap(arr) {
        arr.forEach(obj => {
            this.drawIntoMap(obj);
        });
    }

    /**
     * Draws a single game object onto the canvas.
     * @param {Object} obj - The game object to be drawn.
     */
    drawIntoMap(obj) {
        if (obj.otherDirection) {
            this.flipImage(obj);
        }
        obj.draw(this.ctx);
        if (obj.otherDirection) {
            this.flipImageBack(obj);
        }
    }

    /**
     * Flips an image horizontally.
     * @param {Object} obj - The object whose image needs to be flipped.
     */
    flipImage(obj) {
        this.ctx.save();
        this.ctx.translate(obj.width, 0);
        this.ctx.scale(-1, 1);
        obj.x = obj.x * -1;
    }

    /**
     * Restores the canvas settings after flipping an image.
     * @param {Object} obj - The object whose image was flipped.
     */
    flipImageBack(obj) {
        this.ctx.restore();
        obj.x = obj.x * -1;
    }
}