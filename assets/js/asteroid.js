import k from "./kaboom.js"

loadSprite("asteroid", "./assets/sprites/asteroid.png");

class asteroid {

    constructor(xPos, yPos, speed) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.speed = speed;
        this.angle = 0;

        this.spr = k.add([
            k.sprite("asteroid"),
            k.area(),
            k.rotate(this.angle),
            k.origin('center'),
            k.scale(0.2),
            k.pos(this.xPos, this.yPos),
            "asteroid",
            "enemy"
        ]);
    }


    move() {
        this.spr.move(this.speed, 0);
        this.spr.angle++
    };
}

export default asteroid;
