class LayerObject extends MovableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;
    
    
    constructor(src){
        super().loadImage(src);
    }
}