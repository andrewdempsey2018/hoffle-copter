// import kaboom lib from CDN
import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";

// initialize kaboom context
export const k = kaboom({
    width: 1024,
    height: 768,
    background: [255, 255, 255], // white
    canvas: document.querySelector("game_canvas") // gameplay is drawn to canvas
});

// make kaboom available in other scripts
export default k;