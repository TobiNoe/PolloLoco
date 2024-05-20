/**
* Loads the first level of the game.
* Creates a new Level object with specified layers, enemies, clouds, and items.
* @function
* @name loadLevel1
* @returns {Level} The first level of the game.
*/
function loadLevel1() {

    const level1 = new Level(
        //Layer
        [
            new LayerObject('./img/5_background/layers/air.png', -719),
            new LayerObject('./img/5_background/layers/3_third_layer/2.png', -719),
            new LayerObject('./img/5_background/layers/2_second_layer/2.png', -719),
            new LayerObject('./img/5_background/layers/1_first_layer/2.png', -719),

            new LayerObject('./img/5_background/layers/air.png', 0),
            new LayerObject('./img/5_background/layers/3_third_layer/1.png', 0),
            new LayerObject('./img/5_background/layers/2_second_layer/1.png', 0),
            new LayerObject('./img/5_background/layers/1_first_layer/1.png', 0),
            new LayerObject('./img/5_background/layers/air.png', 719),
            new LayerObject('./img/5_background/layers/3_third_layer/2.png', 719),
            new LayerObject('./img/5_background/layers/2_second_layer/2.png', 719),
            new LayerObject('./img/5_background/layers/1_first_layer/2.png', 719),

            new LayerObject('./img/5_background/layers/air.png', 719 * 2),
            new LayerObject('./img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new LayerObject('./img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new LayerObject('./img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new LayerObject('./img/5_background/layers/air.png', 719 * 3),
            new LayerObject('./img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new LayerObject('./img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new LayerObject('./img/5_background/layers/1_first_layer/2.png', 719 * 3),

            new LayerObject('./img/5_background/layers/air.png', 719 * 4),
            new LayerObject('./img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new LayerObject('./img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new LayerObject('./img/5_background/layers/1_first_layer/1.png', 719 * 4)
        ],
        //Enemies
        [
            new Chicken(150, 625),
            new Chick(150, 625),
            new Chicken(625, 1250),
            new Chicken(625, 1250),
            new Chick(625, 1250),
            new Chicken(1250, 1875),
            new Chicken(1250, 1875),
            new Chick(1250, 1875),
            new Chicken(1875, 2500),
            new Chicken(1875, 2500),
            new Chick(1875, 2500),
            new Chicken(1875, 2500),
            new Chick(1875, 2500)
        ],
        //Clouds
        [
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud()
        ],
        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin()
        ]
    );
    return level1;
}