class CollactableObject extends DrawableObject {


isCollectedItem() {
    if (this instanceof Coin) {
        return 'coin';
    } else if (this instanceof Bottle) {
        return 'bottle';
    }
}

}