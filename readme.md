# Hofflecopter

&nbsp;<br>

![screenshot](/assets/readme/introsection.png)

&nbsp;<br>

## Introduction

&nbsp;<br>

In order to celebrate World Emoji day, our team decided to explore the roots of the emoji phenomenon. We wanted to celebrate a time when emoji were simple ascii characters :-) This gave us the opportunity to tackle the challenge of creating a great looking application using a highly limited colour palette - black and white. The limitations we set upon ourselves led us to create a retro arcade game using an emoji theme. At some stage during out early team meetings, we discovered that David Hasslehoff better known as 'The Hoff' was born on World Emoji day, 17th of July. This fact led us to create a story based around the actor that suited our theme perfectly!! Our game features multiple levels, story cutscenes, scoring, a wide variety of enemies and a retro soundtrack!

&nbsp;<br>

## Concept
A "retro emoji" shooter game. Get the bad guys. Save The Hoff.
[Play Hofflecopter Here](https://andrewdempsey2018.github.io/hoffle-copter/)
### Controls

Up, Down, Left, Right - Fly
Z - shoot
F / ESC - toggle fullscreen

---
## Project Brief
We set out to design a project around the theme of "World Emoji Day" celebrated on 17th July. To satify this goal, we have combined the use of retro ASCII emoji's with The Hoff (born on emoji day), to bring you this exciting game of skill and dexterity. 

### Initial Concept Deployment
![screenshot](/assets/readme/image1.png)

## Design Ideas Development

### Team Call 13/07/2022
First team call to discuss ideas. 

#### Project ideas:
* Some kind of static site with quiz, memory game, how do we make this innovative?
* Project based on famous personality born on World Emoji Day - The Hoff?
* Emoji game - Mario Kart type collect the emojis.
* Angry Birds with emojis.
* Social media website with a focus on emojis.

### Team Call 14/07/2022
Overview of meeting : Project decisions, repo set up, technical issues of VSCode and Git ironed out

**Project name decided upon** - Hofflecopter.

**Project decided upon** - ASCII "retro" emoji themed helicopter JavaScript game.

Main repo set up and shared. Team members forked the project to begin work. Support shared for VSCode and GitHub desktop, commands walked through for team management of merge and pull procedures. 

Kanban board started and tasks assignment started. 

#### Extra design decisions made Friday morning
* Levels - Beach, city, space
* Additional enemies to be added
* Add a collectible like coins etc

Long live the Hoff!

---

## User Stories

* A user should be able to load the main game.
* A user should understand the purpose of the website.
* A user should be able to active the game.
* A user should be able to find the controls for the game.
* A user should be able to control in game sounds. 
* A user should enjoy the experience of playing the game.

&nbsp;<br>

## Wireframes

&nbsp;<br>

### Level Backgrounds

&nbsp;<br>

One of our main MVPs was to create multiple varied location for the player to explore. We created wireframes of the various locations using a simple paint program. This gave us a good feel for what themes would work and what would not. In the end we decided to restrict ourselves to three levels - Beach (to go with our David Hasslehoff theme), City and Space.

&nbsp;<br>

**Space Level**
&nbsp;<br>
![Image of space level](./assets/readme/space_level.png)
&nbsp;<br>
**City Level**
&nbsp;<br>
![Image of city level](./assets/readme/city_level.png)
&nbsp;<br>
**Beach Level (including update)**
&nbsp;<br>
![Image of beach level](./assets/readme/beach_level.png)
&nbsp;<br>
![Image of beach level](./assets/readme/beach_update.png)

## Further Development Notes

#### Project development done on Friday
* Added clouds to game canvas area
* Added blimp enemy with code
* Added cityscape background to level 2 file
* Found sound effects for project

#### Project development done on Saturday
* Copper collectible added to project
* Sound files created for explosion and collectible impact
* Sprites and landscapes sourced and animated for space level
* Added event timer for levels

#### Project development done on Sunday
* Fixed problem with GitHub pages deployment
* Background sound track and user controls added to project
* Work started on presentation video
* Added explosion animation 

---

## Deployment


### Local

During development, our team used Live Server by Ritwick Dey to deploy and test locally. Live server is available for both VSCode and Gitpod at the following url https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

To deploy locally:

1. Clone the repo into VSCode or Gitpod: `git clone https://github.com/andrewdempsey2018/hoffle-copter.git`
2. Install Live Server via you extensions tab
3. Right click on index.html
4. Select 'Launch with Live Server'
5. The game will launch on your default browser

### Remote

As our application did not require backend functionality, we decided to deploy to Github pages.

To deploy the application to Github pages:

1. Fork or clone the repo into your own Github account
2. Click settings
3. Click on the pages tab
4. Select the main branch as your source branch (or, another branch or  your choice if applicable)
5. Click save
6. The deployed link will be displayed
7. Click this link to be redirected to the live site

&nbsp;<br>

## Technologies Used

&nbsp;<br> 

#### **Kaboom.js**

We relied heavily on Kaboom.js (https://kaboomjs.com/). Kaboom is an open source Javascript library that provides many functions common to game development. At its core, Kaboom provides an HTML5 canvas where all drawing takes place. This canvas is then applied to a web page. Kaboom provides tagging functionality that allows game objects to be easily manipulted via a handy reference. The library also provides excellent audio integration with common formats such as MP3 and WAV supported out of the box. There is excellent API documentation available as well as an active Discord community (https://discord.com/invite/aQ6RuQm3TF)

&nbsp;<br> 

#### **Github**
We used a strict Git workflow throughout the Hackathon. Members created forks of the main repo before cloning locally. Commits required 

&nbsp;<br>

### Additional technologies:
&nbsp;<br>
* HTML
* CSS
* Javascript
* Git
* JS Code
* Google DevTools - used for testing and development
* Am I Responsive?
* Canva - used for creation of Hofflecopter and Lifes a beach slides
* BFXR - Online tool for sound effect creation of explosion and coin collection tones
* Paint.net

## Testing

### Bugs Encountered and Resolutions
* GitHub pages json issue

### Automated Testing
* W3C Validator

* JavaScript Validator

* Lighthouse

### Manual Testing
* Testing User Stories

## Code Overview
&nbsp;<br>
### **levelloader.js**

```
const loadLevel = async (level) => {
    const levelData = await fetch(level);
    return levelData.json();
}


export default loadLevel;
```
The level that is to be loaded is passed to the function as a string. This string is the complete path to the file. Data is fetched asynchronously, parsed as JSON data before being returned to the caller.

&nbsp;<br>

### **UFO algorithm**

```
to be completed
```

&nbsp;<br>


### **Event timer function**

```
to be completed
```

&nbsp;<br>

### **explode.js**

```
to be completed
```

## Credits

### Images
* Blimp, Alien, Star, Space background, Explosion - www.asciiart.eu
* Sun - www.pinclipart.com
* UFO - asciiart.website
* Copper, an ASCII art smiley face - [George Reith](https://codegolf.stackexchange.com/questions/16587/print-a-smiley-face/16857#16857)
* Flag - emojicombos.com

### Sounds
* Roflcopter 
* Sound effects - created by Cheryl

## Team Members

&nbsp;<br>

### **Andrew**

Thank you to Code Institute for giving me this oppertunity to participate in the July 2022 Hackathon celebrating World Emoji Day! Thanks especially to my fellow 'Hasslehoff Hackers' team mates - we had great fun working together and the experience gave me a wonderful oppertunity to gain experience in the agile process as well as honing my Javascript skills.

https://www.linkedin.com/in/andrew-dempsey-20ab40180/

&nbsp;<br>

### **Cheryl**

To be completed

&nbsp;<br>

### **Christian**

To be completed

&nbsp;<br>

### **Ethan**

To be completed

&nbsp;<br>

### **Lucas**

To be completed

&nbsp;<br>

### **Panzek**

To be completed 


