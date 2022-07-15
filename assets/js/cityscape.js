import k from "./kaboom.js"

loadSprite("cityscape", "./assets/sprites/skyline.png");

class cityScape {

    constructor(xPos, yPos, speed) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.speed = speed;

        this.spr = k.add([
            k.sprite("cityscape"),
            k.area(),
            k.pos(this.xPos, this.yPos),
            "cityscape"
        ]);
    }

    move() {
        this.spr.move(this.speed, 0);

    };
}

export default cityScape;

