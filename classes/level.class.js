class Level {
    layers;
    enemies;
    clouds;
    objects;
    levelEndX = 2205;
    
    constructor (layers, enemies, clouds, objects) {
        this.layers = layers;
        this.enemies = enemies;
        this.clouds = clouds;
        this.objects = objects;
    }
}