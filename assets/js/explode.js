import k from "./kaboom.js"

loadSprite("boom", "./assets/sprites/boom.png", {
    sliceY: 3,
    //Animation of explosion
    anims: {
        "xplod": {
            from: 0,
            to: 3,
            speed: 1,
            loop: false
        }
    }
})

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

        this.spr.play("xplod");
    }

    animate() {
        this.life -= 1;

        if (this.life === 0) {
            this.spr.destroy();
        }
    }
}

export default boom;