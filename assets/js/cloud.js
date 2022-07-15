import k from "./kaboom.js"

loadSprite("cloud", "./assets/sprites/cloud.png");

class cloud {

    constructor(xPos, yPos, speed, size) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.speed = speed;
        this.size = size;

        this.spr = k.add([
            k.sprite("cloud"),
            k.area(),
            k.pos(this.xPos, this.yPos),
            "cloud"
        ]);
    }

    move() {
        this.spr.move(this.speed, 0);

    };
}

export default cloud;
