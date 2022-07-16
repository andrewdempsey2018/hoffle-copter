import k from "./kaboom.js"
import plane from "./plane.js"
import blimp from "./blimp.js";
import bullet from "./bullet.js"
import cityScape from "./cityscape.js"
import cloud from "./cloud.js"
import loadLevel from "./LoadLevel.js";




loadSprite("heli", "./assets/sprites/heli.png", {
    sliceX: 2,
    // Define animations
    anims: {
        "fly": {
            // Starts from frame 0, ends at frame 1 then loops
            from: 0,
            to: 1,
            // Frame per second
            speed: 18,
            loop: true
        },
    }
});


/* Initialise collections that will hold game objects */
let cityScapeColl = new Set();
let cloudColl = new Set();
let blimpColl = new Set();
let planeColl = new Set();

/* Sprite assets loaded here */

const HELI_SPEED = 300;

const heli = add([
    sprite("heli"),
    area(),
    pos(400, 300),
    "heli"
]);

heli.play("fly");

loadSound("shoot", "./assets/sfx/shoot.wav");
loadSound("explosion", "./assets/sfx/explosion.wav");

// controls
onKeyDown("up", () => {
    if (heli.pos.y > 0) {
        heli.move(0, -HELI_SPEED);
    }
});

onKeyDown("down", () => {
    heli.move(0, HELI_SPEED);
});

onKeyDown("left", () => {
    if (heli.pos.x > 0) {
        heli.move(-HELI_SPEED, 0);
    }
});

onKeyDown("right", () => {
    heli.move(HELI_SPEED, 0);
});

//set up the game screen area
onKeyPress("f", () => {
    fullscreen(!isFullscreen())
});





//shoot

let bullets = new Set();

keyPress("z", () => {
    bullets.add(new bullet(heli.screenPos().x + 170, heli.screenPos().y + 70, 900));
    play("shoot");
});



onCollide("bullet", "enemy", (bullet, enemy) => {
    play("explosion");
    bullet.moveTo(1500, 1500);
    enemy.moveTo(2500, 1500);
});

onCollide("bullet", "blimp", (bullet, blimp) => {
    play("explosion");
    bullet.moveTo(1500, 1500);
    blimp.moveTo(2500, 1500);
});


const level2 = await loadLevel('./assets/levels/level2.json');

let index = -1;
let gameObject = null;
const LEVEL_TIME_SECONDS = 60;

loop(1, () => {

    if (index < LEVEL_TIME_SECONDS) {
        index++;
    }

    gameObject = level2[index];

    if (gameObject.object === "blimp") {
        blimpColl.add(new blimp(gameObject.x, gameObject.y, gameObject.xSpeed, gameObject.ySpeed));
    }

    if (gameObject.object === "cloud") {
        cloudColl.add(new cloud(gameObject.x, gameObject.y, gameObject.speed, gameObject.sized));
    }

    if (gameObject.object === "plane") {
        planeColl.add(new plane(gameObject.x, gameObject.y, gameObject.speed));
    }
});


onUpdate(() => {

    blimpColl.forEach(blimp => {
        blimp.move();
    });

    bullets.forEach(bullet => {
        bullet.move();
    });

    // Moving Cityscape 
    cityScapeColl.forEach(cityScape => {
        cityScape.move();
    });

    // Moving Clouds in background
    cloudColl.forEach(cloud => {
        cloud.move();
    });

    // Moving plane
    planeColl.forEach(plane => {
        plane.move();
    });
});