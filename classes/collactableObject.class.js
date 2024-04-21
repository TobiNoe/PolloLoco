class CollactableObject extends DrawableObject {

isCollected() {
    if (this instanceof Coin) {
        return 'coin';
    } else if (this instanceof Bottle) {
        return 'bottle';
    }
}

}