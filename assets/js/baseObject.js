import k from "./kaboom.js"

class baseObject {

    constructor(xPos, yPos, speed) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.speed = speed;
    }

    move() {
        this.spr.move(this.speed, 0);
    };
}

export default baseObject;