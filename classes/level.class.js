class Level {
    layers;
    enemies;
    clouds;
    items;
    levelEndX = 2400;
    
    constructor (layers, enemies, clouds, items) {
        this.layers = layers;
        this.enemies = enemies;
        this.clouds = clouds;
        this.items = items;
    }
}