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
import boss from "./boss.js"
import bossbullet from "./bossbullet.js"
//import baseObject from "./baseObject.js"
import Submarine from "./submarine.js"

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
loadSprite("explainImage", "./assets/ui/explain.png");
loadSprite("introImage", "./assets/ui/intro.png");
loadSprite("endingImage", "./assets/ui/endingimage.png");
loadSprite("gameoverimage", "./assets/ui/gameoverimage.png");
loadSprite("levelComplete", "./assets/ui/levelcomplete.png");
loadSprite("starrySky", "./assets/scenery/starry-sky.png");

/* flashing press enter text used on dialogue screens */
loadSprite("pressEnter", "./assets/ui/pressEnter.png", {
    sliceY: 2,
    // Define animations
    anims: {
        "flash": {
            // Starts from frame 0, ends at frame 1 then loops
            from: 0,
            to: 1,
            // Frame per second
            speed: 4,
            loop: true
        },
    }
});

/* big copter sprite used on titlescreen */
loadSprite("bigCopter", "./assets/sprites/bigcopter.png", {
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

/* titlescreen text */
loadSprite("titleText", "./assets/ui/titletext.png", {
    sliceY: 2,
    // Define animations
    anims: {
        "rattle": {
            // Starts from frame 0, ends at frame 1 then loops
            from: 0,
            to: 1,
            // Frame per second
            speed: 6,
            loop: true
        },
    }
});

/* Load game music */
loadSound("titleScreenMusic", "./assets/music/titlescreen.mp3");
loadSound("introMusic", "./assets/music/intro.mp3");
loadSound("bossMusic", "./assets/music/boss.mp3");
loadSound("endingMusic", "./assets/music/ending.mp3");
loadSound("gameoverMusic", "./assets/music/gameover.mp3");
loadSound("level1Music", "./assets/music/level1.mp3");
loadSound("level2Music", "./assets/music/level3.mp3");
loadSound("level3Music", "./assets/music/level2.mp3");
loadSound("levelCompleteMusic", "./assets/music/levelcomplete.mp3");


let music = null;

/* Initialise collections that will hold game objects */
let objectCollection = new Set();
let collectableColl = new Set();
let boomColl = new Set();
let bossColl = new Set();
let bossbulletColl = new Set();

/* Create players bullet collection and handle
player controls to allow shooting */
let bullets = new Set();

/* keep tract of players points */
let score = 0;
let health = 5;

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
        score += 100;
    });

    /* player collides with an enemy object, hurt player, destroy enemy */
    onCollide("enemy", "heli", (enemy) => {
        play("explosion2");
        destroy(enemy);
        health -= 1;
        boomColl.add(new boom(enemy.pos.x, enemy.pos.y))
    });

    /* player collides with a boss bullet, hurt player, destroy destroy bullet */
    onCollide("bossbullet", "heli", (bossbullet) => {
        play("explosion2");
        destroy(bossbullet);
        health -= 1;
    });

    // check collision between heli and copper

    onCollide("copper", "heli", (copper) => {
        play("coin");
        destroy(copper);
        score += 1000;
        health += 1;
    });

    // City Skyline
    onCollide("bullet", "blimp", (bullet, blimp) => {
        play("explosion2");
        bullet.destroy();
        blimp.destroy();
        score += 200;
    });

    onCollide("bullet", "saucer", (bullet, saucer) => {
        play("explosion2");
        bullet.destroy();
        boomColl.add(new boom(saucer.pos.x, saucer.pos.y))
        saucer.destroy();
        score += 25;
    })

    onCollide("bullet", "asteroid", (bullet, asteroid) => {
        play("explosion2");
        bullet.destroy();
        boomColl.add(new boom(asteroid.pos.x, asteroid.pos.y))
        asteroid.destroy();
        score += 25;
    })

    onCollide("bullet", "bird", (bullet, bird) => {
        play("explosion2");
        bullet.destroy();
        boomColl.add(new boom(bird.pos.x, bird.pos.y))
        bird.destroy();
        score += 25;
    })

    onCollide("bullet", "boss", (bullet, boss) => {
        bullet.destroy();
        boss.hurt(1)
        boss.on('death', () => {
            play("explosion2");
            boomColl.add(new boom(boss.pos.x, boss.pos.y))
            destroy(boss)
            music.stop();
            endingStart()
        })
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

    // If city level, load level 1 music
    if (levelName['levelName'] === 'city') {

        music = play("level1Music", {
            volume: 0.50,
            loop: true
        })
    }

    // If space level, load space background and level 2 music
    if (levelName['levelName'] === 'space') {
        const starrySky = add([
            sprite("starrySky"),
            pos(0, 0),
        ]);

        music = play("level2Music", {
            volume: 0.50,
            loop: true
        })
    }

    // If beach level, load level 3 music
    if (levelName['levelName'] === 'beach') {

        music = play("level3Music", {
            volume: 0.50,
            loop: true
        })
    }

    // If beach level, load level 3 music
    if (levelName['levelName'] === 'boss') {

        music = play("bossMusic", {
            volume: 0.50,
            loop: true
        })
    }


    loop(1, () => {

        if (index < LEVEL_TIME_SECONDS) {
            index++;

            // Player has reached the end of the level DEBUG=3
            if (index === 58) {
                music.stop();
                levelCompleteStart(levelName['levelName']);
            }
        }

        gameObject = level[index];

        if (gameObject.object === "blimp") {
            objectCollection.add(new blimp(gameObject.x, gameObject.y, gameObject.xSpeed, gameObject.ySpeed));
        }

        if (gameObject.object === "cloud") {
            objectCollection.add(new cloud(gameObject.x, gameObject.y, gameObject.speed, gameObject.sized));
        }

        if (gameObject.object === "plane") {
            objectCollection.add(new plane(gameObject.x, gameObject.y, gameObject.speed));
        }

        if (gameObject.object === "copper") {
            collectableColl.add(new collectable(gameObject.x, gameObject.y, gameObject.speed));
        }

        if (gameObject.object === "cityScape") {
            objectCollection.add(new cityScape(gameObject.x, gameObject.y, gameObject.speed));
        }

        if (gameObject.object === "asteroid") {
            objectCollection.add(new asteroid(gameObject.x, gameObject.y, gameObject.speed));
        }

        if (gameObject.object === "saucer") {
            objectCollection.add(new saucer(gameObject.x, gameObject.y, gameObject.speed));
        }

        if (gameObject.object === "planetScape") {
            objectCollection.add(new planetScape(gameObject.x, gameObject.y, gameObject.speed));
        }

        if (gameObject.object === "beachScape") {
            objectCollection.add(new beachScape(gameObject.x, gameObject.y, gameObject.speed));
        }

        if (gameObject.object === "flag") {
            objectCollection.add(new flag(gameObject.x, gameObject.y, gameObject.speed));
        }

        if (gameObject.object === "bird") {
            objectCollection.add(new bird(gameObject.x, gameObject.y, gameObject.xSpeed, gameObject.ySpeed));
        }

        if (gameObject.object === "boss") {
            bossColl.add(new boss(gameObject.x, gameObject.y, gameObject.xSpeed, gameObject.ySpeed));
        }

        if (gameObject.object === "submarine") {
            objectCollection.add(new Submarine(gameObject.x, gameObject.y, gameObject.speed));
        }
    });

    onUpdate(() => {

        /* Draw players score */
        drawText({
            text: "score: " + score,
            size: 30,
            font: "sink",
            pos: vec2(300, 10),
            color: rgb(0, 0, 0),
        })

        /* Draw players health */
        drawText({
            text: "health: " + health,
            size: 30,
            font: "sink",
            pos: vec2(300, 50),
            color: rgb(0, 0, 0),
        })

        boomColl.forEach(boom => {
            boom.animate();
        });

        bullets.forEach(bullet => {
            bullet.move();
        });

        // Moving boss
        bossColl.forEach(boss => {
            boss.move();
            boss.shoot += 1;
            if (boss.shoot >= 200) {
                bossbulletColl.add(new bossbullet(boss.spr.screenPos().x - 10, boss.spr.screenPos().y + 200, -700));
                play("shoot");
                boss.shoot = 0;
            }
        });

        // Moving bossbullet
        bossbulletColl.forEach(bossbullet => {
            bossbullet.move();
        });

        // Moving game objects
        objectCollection.forEach(object => {
            object.move();
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

        /* health reaches zero, send player to gameover screen */
        // Player has reached the end of the level DEBUG=3
        if (health === 0) {
            music.stop();
            gameOverStart();
        }
    });
});

/* Functions that trigger the various game scenes */

const titleScreenStart = () => {

    score = 0;
    health = 5;

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

const explainStart = () => {
    go("explain", {
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

    const titleText = add([
        sprite("titleText"),
        pos(140, 10),
    ]);

    titleText.play("rattle");

    const bigCopter = add([
        sprite("bigCopter"),
        pos(0, 230),
    ]);

    bigCopter.play("fly");

    const pressEnter = add([
        sprite("pressEnter"),
        pos(530, 650),
    ]);

    //set up the game screen area
    onKeyPress("f", () => {
        fullscreen(!isFullscreen())
    });

    pressEnter.play("flash");
    music = play("titleScreenMusic", {
        volume: 0.50,
        loop: true
    })

    onKeyPress("enter", () => {
        music.stop();
        introStart();
    })

    onUpdate(() => {
        bigCopter.move(80, 0);

        if (bigCopter.pos.x >= 1024) {
            bigCopter.pos.x = -703;
        }
    });
});

scene("explain", async () => {

    const explainScreenImage = add([
        sprite("explainImage"),
        pos(0, 0),
    ]);

    const pressEnter = add([
        sprite("pressEnter"),
        pos(570, 630),
    ]);

    pressEnter.play("flash");

    //set up the game screen area
    onKeyPress("f", () => {
        fullscreen(!isFullscreen())
    });

    onKeyPress("enter", () => {
        titleScreenStart();
    })
});

scene("ending", async () => {

    music = play("endingMusic", {
        volume: 0.50,
        loop: false
    })

    const pressEnter = add([
        sprite("pressEnter"),
        pos(570, 630),
    ]);

    pressEnter.play("flash");

    const endingScreen = add([
        sprite("endingImage"),
        pos(0, 0),
    ]);

    //set up the game screen area
    onKeyPress("f", () => {
        fullscreen(!isFullscreen())
    });

    onKeyPress("enter", () => {
        music.stop();
        titleScreenStart();
    })
});

scene("gameOver", async () => {

    const gameOverScreen = add([
        sprite("gameoverimage"),
        pos(0, 0),
    ]);

    music = play("gameoverMusic", {
        volume: 0.50,
        loop: false
    })

    //set up the game screen area
    onKeyPress("f", () => {
        fullscreen(!isFullscreen())
    });

    onKeyPress("enter", () => {
        music.stop();
        titleScreenStart();
    })
});

scene("levelComplete", async (currentLevel) => {

    const levelCompleteImage = add([
        sprite("levelComplete"),
        pos(0, 0),
    ]);

    const pressEnter = add([
        sprite("pressEnter"),
        pos(570, 630),
    ]);

    pressEnter.play("flash");

    music = play("levelCompleteMusic", {
        volume: 0.50,
        loop: false
    })

    //set up the game screen area
    onKeyPress("f", () => {
        fullscreen(!isFullscreen())
    });

    onKeyPress("enter", () => {

        music.stop();

        if (currentLevel === 'city') {
            level2Start();
        }

        if (currentLevel === 'space') {
            level3Start();
        }

        if (currentLevel === 'beach') {
            level4Start();
        }

        if (currentLevel === 'boss') {
            endingStart();
        }
    })
});

scene("intro", async () => {

    const introImage = add([
        sprite("introImage"),
        pos(0, 0),
    ]);

    music = play("introMusic", {
        volume: 0.50,
        loop: true
    })

    const pressEnter = add([
        sprite("pressEnter"),
        pos(530, 650),
    ]);

    pressEnter.play("flash");

    //set up the game screen area
    onKeyPress("f", () => {
        fullscreen(!isFullscreen())
    });

    onKeyPress("enter", () => {
        music.stop();
        level1Start();
    })
});

/* Give the game canvas focus so that the users input registers */
k.canvas.focus()

/* On first load of the application, display the controls to the player */
explainStart();