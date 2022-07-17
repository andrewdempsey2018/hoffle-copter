import k from "./kaboom.js"

loadSprite("boom", "./assets/sprites/boom.png");

class boom {

    constructor(xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;

        this.spr = k.add([
            k.sprite("boom"),
            k.area(),
            k.pos(this.xPos, this.yPos),
            "boom"
        ]);
    }

    location () {
        this.spr.location(xPos, yPos)
    }
}

export default boom;