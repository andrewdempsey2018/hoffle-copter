import k from "./kaboom.js"

loadSprite("beachScape", "./assets/sprites/beach.png");

class beachScape {

    constructor(xPos, yPos, speed) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.speed = speed;

        this.spr = k.add([
            k.sprite("beachScape"),
            k.area(),
            k.pos(this.xPos, this.yPos),
            "beachScape"
        ]);
    }

    move() {
        this.spr.move(this.speed, 0);

    };
}

export default beachScape;

