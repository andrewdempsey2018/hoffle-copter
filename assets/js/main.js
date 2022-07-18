import k from "./kaboom.js"
import plane from "./plane.js"
import blimp from "./blimp.js";
import bullet from "./bullet.js"
import cityScape from "./cityscape.js"
import cloud from "./cloud.js"
import collectable from "./collectable.js"
import saucer from "./saucer.js";
import asteroid from "./asteroid.js";
import loadLevel from "./levelloader.js";
import boom from "./explode.js";
import planetScape from "./planet.js"
import beachScape from "./beach.js"
import flag from "./flag.js"
import bird from "./bird.js"

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



/* static UI elements */
loadSprite("titlescreen", "./assets/ui/titlescreen.png");
loadSprite("introImage", "./assets/ui/introimage.png");
loadSprite("endingImage", "./assets/ui/endingimage.png");
loadSprite("levelComplete", "./assets/ui/levelcomplete.png");
loadSprite("starrySky", "./assets/scenery/starry-sky.png");

/* Initialise collections that will hold game objects */
let cityScapeColl = new Set();
let cloudColl = new Set();
let blimpColl = new Set();
let planeColl = new Set();
let saucerColl = new Set();
let asteroidColl = new Set();
let collectableColl = new Set();
let boomColl = new Set();
let planetScapeColl = new Set();
let beachScapeColl = new Set();
let flagColl = new Set();
let birdColl = new Set();

/* Create players bullet collection and handle
player controls to allow shooting */
let bullets = new Set();

/* Sprite assets loaded here */

const HELI_SPEED = 300;

/* Load sound effects */
loadSound("shoot", "./assets/sfx/shoot.wav");
loadSound("explosion", "./assets/sfx/explosion.wav");
loadSound("explosion2", "./assets/sfx/explosion2.wav");
loadSound("coin", "./assets/sfx/coin.wav");
loadSound("bgmus", "./assets/soundfile/roflcopter-sound.wav");

scene("gameplay", async (levelName) => {
    const heli = add([
        sprite("heli"),
        area(),
        z(1),
        pos(400, 300),
        "heli"
    ]);

    heli.play("fly");

    /* Setup control scheme for player */
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

    keyPress("z", () => {
        bullets.add(new bullet(heli.screenPos().x + 170, heli.screenPos().y + 70, 900));
        play("shoot");
    });

    /* Collision between bullets and enemys */

    onCollide("bullet", "plane", (bullet, plane) => {
        play("explosion2");
        bullet.destroy();
        boomColl.add(new boom(plane.pos.x, plane.pos.y))
        plane.destroy();
    });

    onCollide("copper", "heli", (copper) => {
        play("coin");
        destroy(copper);
    });

    // City Skyline
    onCollide("bullet", "blimp", (bullet, blimp) => {
        play("explosion2");
        bullet.destroy();
        blimp.destroy();
    });

    onCollide("bullet", "saucer", (bullet, saucer) => {
        play("explosion2");
        bullet.destroy();
        boomColl.add(new boom(saucer.pos.x, saucer.pos.y))
        saucer.destroy();
    })

    onCollide("bullet", "asteroid", (bullet, asteroid) => {
        play("explosion2");
        bullet.destroy();
        boomColl.add(new boom(asteroid.pos.x, asteroid.pos.y))
        asteroid.destroy();
    })

    onCollide("bullet", "bird", (bullet, bird) => {
        play("explosion2");
        bullet.destroy();
        boomColl.add(new boom(bird.pos.x, bird.pos.y))
        bird.destroy();
    })

    /* Here we read each entry from the level JSON file
    every one second. If the level file contains an entry 'no spawn' we ignore it
    If the level file contains information on a game object, we instanciate it
    using the values from the JSON file */

    let level = await loadLevel('./assets/levels/' + levelName['levelName'] + '.json'); //grab the level from assets folder

    /* index is the position in the level script where we are at. 
    There is a position for every second of real time that passes.
    For now, limited to 60 seconds */
    let index = -1;

    /* JSON representation of a game object.
    We use this JSON data to pass into the actual game object constructors */
    let gameObject = null;

    const LEVEL_TIME_SECONDS = 60; //make sure the event timer does not look for out of bounds JSON data

    // If space level, load space background
    if (levelName['levelName'] === 'space') {
        const starrySky = add([
            sprite("starrySky"),
            pos(0, 0),
        ]);
    }


    loop(1, () => {

        if (index < LEVEL_TIME_SECONDS) {
            index++;

            // Player has reached the end of the level
            if (index === 58) {
                levelCompleteStart(levelName['levelName']);
            }
        }

        gameObject = level[index];

        if (gameObject.object === "blimp") {
            blimpColl.add(new blimp(gameObject.x, gameObject.y, gameObject.xSpeed, gameObject.ySpeed));
        }

        if (gameObject.object === "cloud") {
            cloudColl.add(new cloud(gameObject.x, gameObject.y, gameObject.speed, gameObject.sized));
        }

        if (gameObject.object === "plane") {
            planeColl.add(new plane(gameObject.x, gameObject.y, gameObject.speed));
        }

        if (gameObject.object === "copper") {
            collectableColl.add(new collectable(gameObject.x, gameObject.y, gameObject.speed));
        }

        if (gameObject.object === "cityScape") {
            cityScapeColl.add(new cityScape(gameObject.x, gameObject.y, gameObject.speed));
        }

        if (gameObject.object === "asteroid") {
            asteroidColl.add(new asteroid(gameObject.x, gameObject.y, gameObject.speed));
        }

        if (gameObject.object === "saucer") {
            saucerColl.add(new saucer(gameObject.x, gameObject.y, gameObject.speed));
        }

        if (gameObject.object === "planetScape") {
            planetScapeColl.add(new planetScape(gameObject.x, gameObject.y, gameObject.speed));
        }

        if (gameObject.object === "beachScape") {
            beachScapeColl.add(new beachScape(gameObject.x, gameObject.y, gameObject.speed));
        }

        if (gameObject.object === "flag") {
            flagColl.add(new flag(gameObject.x, gameObject.y, gameObject.speed));
        }

        if (gameObject.object === "bird") {
            birdColl.add(new bird(gameObject.x, gameObject.y, gameObject.xSpeed, gameObject.ySpeed));
        }
    });

    onUpdate(() => {

        blimpColl.forEach(blimp => {
            blimp.move();
        });

        boomColl.forEach(boom => {
            boom.animate();
        });

        bullets.forEach(bullet => {
            bullet.move();
        });

        // Moving Cityscape 
        cityScapeColl.forEach(cityScape => {
            cityScape.move();
        });

        // Moving Planetscape 
        planetScapeColl.forEach(planetScape => {
            planetScape.move();
        });

        // Moving Beachscape 
        beachScapeColl.forEach(beachScape => {
            beachScape.move();
        });

        // Moving Clouds in background
        cloudColl.forEach(cloud => {
            cloud.move();
        });

        //Moving copper game object
        collectableColl.forEach(collectable => {
            collectable.move()
        })

        // Moving plane
        planeColl.forEach(plane => {
            plane.move();
        });

        // Moving asteroid
        asteroidColl.forEach(asteroid => {
            asteroid.move();
        });

        // Moving saucer
        saucerColl.forEach(saucer => {
            saucer.move();
        });

        // Moving flag
        flagColl.forEach(flag => {
            flag.move();
        });

        // Moving bird
        birdColl.forEach(bird => {
            bird.move();
        });

        /* Looping background music
        const music = play("bgmus", {
            volume: 0.8,
            loop: true

        }) */

        // // User controls for music play pause
        // onKeyPress("space", () => {
        //     if (music.isPaused()) {
        //         music.play()
        //     } else {
        //         music.pause()
        //     }
        // })

    });
});

/* Functions that trigger the various game scenes */

const titleScreenStart = () => {
    go("titleScreen", {
    })
}

const level1Start = () => {
    go("gameplay", {
        levelName: 'city',
    })
}

const level2Start = () => {
    go("gameplay", {
        levelName: 'space',

    })
}

const level3Start = () => {
    go("gameplay", {
        levelName: 'beach',
    })
}

const level4Start = () => {
    go("gameplay", {
        levelName: 'boss',
    })
}

const introStart = () => {
    go("intro", {
    })
}

const endingStart = () => {
    go("ending", {
    })
}

const gameOverStart = () => {
    go("gameOver", {
    })
}

const levelCompleteStart = (levelName) => {
    go("levelComplete", levelName)
}

/* game scenes. Kaboom will wipe the previous scene from memory
   and allow us to load a completely new scene using the scene tag attribute */

scene("titleScreen", async () => {

    const titleScreenImage = add([
        sprite("titlescreen"),
        pos(0, 0),
    ]);

    onKeyPress("enter", () => {
        introStart();
    })
});

scene("levelComplete", async (currentLevel) => {

    const levelCompleteImage = add([
        sprite("levelComplete"),
        pos(0, 0),
    ]);

    console.log(currentLevel);

    onKeyPress("enter", () => {

        if (currentLevel === 'city') {
            level2Start();
        }

        if (currentLevel === 'space') {
            level3Start();
        }
    })
});

scene("intro", async () => {

    const introImage = add([
        sprite("introImage"),
        pos(0, 0),
    ]);

    onKeyPress("enter", () => {
        level1Start();
    })
});

/* On first load of the application, run the title screen */

titleScreenStart();