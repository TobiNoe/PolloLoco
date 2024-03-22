class LayerObject extends MovableObject {
    width = 720;
    height = 480;
    
    
    constructor(src, x){
        super().loadImage(src);
        this.x = x;
        //man kann die y-koordinate berechenen. 480 ist die Höhe des canvas - die Höhe des Objektes
        this.y = 480 - this.height;
    }
}