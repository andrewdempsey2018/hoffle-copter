import k from "./kaboom.js"

loadSprite("boss", "./assets/sprites/boss.png", {
    sliceX: 2,
    // Define animations
    anims: {
        "fire": {
            // Starts from frame 0, ends at frame 1 then loops
            from: 0,
            to: 1,
            // Frame per second
            speed: 8,
            loop: true
        },
    }
});



class boss {

    constructor(xPos, yPos, xSpeed, ySpeed) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.wave = rand(50, 150);

        this.spr = k.add([
            k.sprite("boss"),
            k.area(),
            k.z(1),
            k.health(10),
            k.pos(this.xPos, this.yPos),
            "boss"
        ]);

        this.spr.play("fire")
    }

    move() {
        this.spr.move(this.xSpeed, this.ySpeed);
        this.wave -= 1;
        this.xSpeed += 1;

        if (this.xSpeed >= 0) {
            this.xSpeed = 0;
        }

        if (this.wave <= 0) {
            this.wave = rand(50, 200);
            this.ySpeed = this.ySpeed * -1;
        }
    };
    
}

export default boss;