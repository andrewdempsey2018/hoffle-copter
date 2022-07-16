import k from "./kaboom.js"

loadSprite("copper", "./assets/sprites/copper.png");

class collectable {

    constructor(xPos, yPos, speed) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.speed = speed;

        this.spr = k.add([
            k.sprite("copper"),
            k.area(),
            k.pos(this.xPos, this.yPos),
            "copper"
        ]);
    }

    
}

export default collectable;

