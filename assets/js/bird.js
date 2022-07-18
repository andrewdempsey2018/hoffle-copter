import k from "./kaboom.js"

loadSprite("bird", "./assets/sprites/bird.png", {
    sliceX: 2,
    // Define animations
    anims: {
        "fly": {
            // Starts from frame 0, ends at frame 1 then loops
            from: 0,
            to: 1,
            // Frame per second
            speed: 8,
            loop: true
        },
    }
});



class bird {

    constructor(xPos, yPos, xSpeed, ySpeed) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.wave = rand(50, 200);

        this.spr = k.add([
            k.sprite("bird"),
            k.area(),
            k.pos(this.xPos, this.yPos),
            "bird"
        ]);

        this.spr.play("fly")
    }

    move() {
        this.spr.move(this.xSpeed, this.ySpeed);
        this.wave -= 1;

        if (this.wave <= 0) {
            this.wave = rand(50, 200);
            this.ySpeed = this.ySpeed * -1;
        }
    };
    
}

export default bird;