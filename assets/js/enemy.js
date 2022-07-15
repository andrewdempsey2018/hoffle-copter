import k from "./kaboom.js"

loadSprite("enemy", "./assets/sprites/enemy.png");

class enemy {

    constructor(xPos, yPos, speed) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.speed = speed;

        this.spr = k.add([
            k.sprite("enemy"),
            k.area(),
            k.pos(this.xPos, this.yPos),
            "enemy"
        ]);
    }

    move() {
        this.spr.move(this.speed, this.speed);

        if (this.spr.screenPos().y >= 600 || this.spr.screenPos().x >= 800) {
            this.spr.moveTo(rand(40, 700), -40);
            this.speed = rand(10, 530);
        }
    };
}

export default enemy;

