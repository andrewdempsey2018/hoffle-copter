import baseObject from "./baseObject.js";
import k from "./kaboom.js"

loadSprite("submarine", "./assets/sprites/submarine.png");

class Submarine extends baseObject {

    constructor(xPos, yPos, speed) {
        
        super(xPos, yPos, speed);

        this.spr = k.add([
            k.sprite("submarine"),
            k.area(),
            k.pos(this.xPos, this.yPos),
            "submarine",
            "enemy"
        ]);
    }

    move() {
        this.spr.move(this.speed, 0);
    };
}

export default Submarine;
