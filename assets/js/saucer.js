import k from "./kaboom.js"

loadSprite("saucer", "./assets/sprites/saucer.png");

class saucer {

    constructor(xPos, yPos, speed) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.speed = speed;

        this.spr = k.add([
            k.sprite("saucer"),
            k.area(),
            k.pos(this.xPos, this.yPos),
            "saucer"
        ]);
    }

    move() {
        this.spr.move(this.speed, 0);
    };
}

export default saucer;