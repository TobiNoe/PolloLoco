class Level {
    layers;
    enemies;
    clouds;
    items;
    levelEndX = 2400;

    /**
     * Creates an instance of Level.
     * @param {Layer[]} layers - The layers of the level.
     * @param {Enemy[]} enemies - The enemies in the level.
     * @param {Cloud[]} clouds - The clouds in the level.
     * @param {Item[]} items - The items in the level.
     */
    constructor(layers, enemies, clouds, items) {
        this.layers = layers;
        this.enemies = enemies;
        this.clouds = clouds;
        this.items = items;
    }
}