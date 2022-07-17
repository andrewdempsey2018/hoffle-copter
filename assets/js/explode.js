import k from "./kaboom.js"

loadSprite("boom", "./assets/sprites/boom.png");

class boom {

    constructor(xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.life = 10;

        this.spr = k.add([
            k.sprite("boom"),
            k.area(),
            k.pos(this.xPos, this.yPos),
            "boom"
        ]);
    }

    animate() {
        this.life -= 1;

        if (this.life === 0) {
            this.spr.destroy();
        }
    }
}

export default boom;