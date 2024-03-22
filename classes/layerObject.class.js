class LayerObject extends MovableObject {
    width = 720;
    height = 480;
    
    
    constructor(src, x, y){
        super().loadImage(src);
        this.x = x;
        this.y = y;
    }
}