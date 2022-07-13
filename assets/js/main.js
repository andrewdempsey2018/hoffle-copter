import k from "./kaboom.js"
import enemy from "./enemy.js"
import bullet from "./bullet.js"

loadSprite("heli", "./assets/sprites/heli.png");

const HELI_SPEED = 300;

const heli = add([
    sprite("heli"),
    area(),
    pos(400, 300),
    "heli"
]);

loadSound("shoot", "./assets/sfx/shoot.wav");
loadSound("explosion", "./assets/sfx/explosion.wav");

// controls
keyDown("up", () => {
    heli.move(0, -HELI_SPEED);
});

keyDown("down", () => {
    heli.move(0, HELI_SPEED);
});

keyDown("left", () => {
    heli.move(-HELI_SPEED, 0);
});

keyDown("right", () => {
    heli.move(HELI_SPEED, 0);
});

//shoot

let bullets = new Set();

keyPress("z", () => {
    bullets.add(new bullet(heli.screenPos().x + 170, heli.screenPos().y + 70, 900));
    console.log("boom");
    play("shoot");
});

let colls = new Set();

for (let i = 0; i < 4; i++) {
    colls.add(new enemy(rand(0, 700), rand(0, 500), rand(10, 530)));
};

collides("bullet", "enemy", (bullet, enemy) => {
    play("explosion");
    bullet.moveTo(1500, 1500);
    enemy.moveTo(2500, 1500);
});


action(() => {

    colls.forEach(coll => {
        coll.move();
    });

    bullets.forEach(bullet => {
        bullet.move();
    });



});



