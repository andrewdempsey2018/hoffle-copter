import k from "./kaboom.js"

loadSprite("plane", "./assets/sprites/plane.png");

class plane {

    constructor(xPos, yPos, speed) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.speed = speed;

        this.spr = k.add([
            k.sprite("plane"),
            k.area(),
            k.pos(this.xPos, this.yPos),
            "plane",
            "enemy"
        ]);
    }

    move() {
        this.spr.move(this.speed, 0);
    };
}

export default plane;