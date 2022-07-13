// import kaboom lib
import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";

// initialize kaboom context
export const k = kaboom({
    width: 1024,
    height: 768,
    background: [255, 255, 255] //white
});

export default k;