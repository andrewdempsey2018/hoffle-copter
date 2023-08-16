// import kaboom lib from CDN

// Dont specify a version number to automatically pick the latest version
// import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";

// Set the version number in order to ensure functions work into the future
import kaboom from "https://unpkg.com/kaboom@2000.2.9/dist/kaboom.mjs";

// initialize kaboom context
export const k = kaboom({
    width: 1024,
    height: 768,
    background: [255, 255, 255], // white
    canvas: document.querySelector("game_canvas") // gameplay is drawn to canvas
});

// make kaboom available in other scripts
export default k;