class Level {
    layers;
    enemies;
    clouds;
    levelEndX = 2205;
    
    constructor (layers, enemies, clouds) {
        this.layers = layers;
        this.enemies = enemies;
        this.clouds = clouds;
    }
}