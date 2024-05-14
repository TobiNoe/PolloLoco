class CollactableObject extends MovableObject {

    /**
    * Check whether this object is a collected item
    * @returns {string|null} - The type of collected item ('coin' or 'bottle') or null if it is neither
    */
    isCollectedItem() {
        if (this.isCoin()) {
            return 'coin';
        } else if (this.isBottle()) {
            return 'bottle';
        } else {
            return null;
        }
    }

    /**
     * Check whether this object is a coin
     * @returns {boolean} - True if this object is an instance of Coin, false otherwise
     */
    isCoin() {
        return this instanceof Coin;
    }

    /**
     * Check whether this object is a bottle
     * @returns {boolean} - True if this object is an instance of Bottle, false otherwise
     */
    isBottle() {
        return this instanceof Bottle;
    }
}