import k from "./kaboom.js"

loadSprite("planetScape", "./assets/sprites/planetterrain.png");

class planetScape {

    constructor(xPos, yPos, speed) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.speed = speed;

        this.spr = k.add([
            k.sprite("planetScape"),
            k.area(),
            k.pos(this.xPos, this.yPos),
            "planetScape"
        ]);
    }

    move() {
        this.spr.move(this.speed, 0);

    };
}

export default planetScape;

