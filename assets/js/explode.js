import k from "./kaboom.js"

loadSprite("boom", "./assets/sprites/boom.png", {
    sliceX: 3,
    //Animation of explosion
    anims: {
        "xplod": {
            from: 0,
            to: 1,
            to: 2,
            speed: 4,
            loop: false
        }
    }
})

class boom {

    constructor(xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.life = 50;

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