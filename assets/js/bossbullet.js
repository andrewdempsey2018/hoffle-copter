import k from "./kaboom.js"

loadSprite("bossbullet", "./assets/sprites/bossbullet.png");

class bossbullet {

    constructor(xPos, yPos, speed) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.speed = speed;

        this.spr = add([
            sprite("bossbullet"),
            area(),
            pos(this.xPos, this.yPos),
            "bossbullet"
        ]);
    }

    move() {
        this.spr.move(this.speed, 0);
    };
}

export default bossbullet;