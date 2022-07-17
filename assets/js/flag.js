import k from "./kaboom.js"

loadSprite("flag", "./assets/sprites/flag.png", {
    sliceX: 2,
    //Animation of flag
    anims: {
        "wave": {
            from: 0,
            to: 1,
            speed: 4,
            loop: true,
        }
    }
})

class flag {

    constructor(xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.life = 50;

        this.spr = k.add([
            k.sprite("flag"),
            k.area(),
            k.pos(this.xPos, this.yPos),
            "flag"
        ]); 

        this.spr.play("wave");
    }

}

export default flag;