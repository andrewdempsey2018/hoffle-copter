import k from "./kaboom.js"

loadSprite("saucer", "./assets/sprites/saucer.png");

class saucer {

    constructor(xPos, yPos, speed) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.speed = speed;
        this.angle = 350;
        this.countingUp = true;

        this.spr = k.add([
            k.sprite("saucer"),
            k.area(),
            k.rotate(this.angle),
            k.origin('center'),
            k.pos(this.xPos, this.yPos),
            "saucer",
            "enemy"
        ]);
    }

    move() {
        this.spr.move(this.speed, 0);

        if (this.countingUp) {
            this.spr.angle++;
        } else {
            this.spr.angle--;
        }
        if (this.countingUp && this.spr.angle === 361) {
            this.spr.angle = 0
        }
        if (!this.countingUp && this.spr.angle === -1) {
            this.spr.angle = 360
        }
        if (this.spr.angle === 10) {
            this.countingUp = false;
        }
        if (this.spr.angle === 350) {
            this.countingUp = true;
        }
    };
}

export default saucer;