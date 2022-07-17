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

    constructor(xPos, yPos, speed) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.speed = speed;
        this.life = 50;

        this.spr = k.add([
            k.sprite("flag"),
            k.area(),
            k.scale(0.5),
            k.pos(this.xPos, this.yPos),
            "flag"
        ]); 

        this.spr.play("wave");
    }
    move() {
        this.spr.move(this.speed, 0);
    };

}

export default flag;