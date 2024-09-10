import * as THREE from 'three';
import { Field } from './field.js';
import { Player} from './player.js';
import { getMousePosition } from './utils.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Ball } from './ball.js';
import { Game } from './gamerule.js';
import { Power } from './power.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 2, 1000 );



const renderer = new THREE.WebGLRenderer();

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0); // Assuming the center of the field is at (0, 0, 0)
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 5;

const field = new Field(15, 10, 1);

const playerLeft = new Player(scene, "left");
const playerRight = new Player(scene, "right");

const ball = new Ball(scene);

const game = new Game();

const power = new Power();





field.createField(scene);

// Animation loop
let animationFrameId; // Store the requestAnimationFrame ID

document.addEventListener('keydown', (event) => {
    // console.log(event.key)
    power.checkKey(event, playerRight);
    power.usepower(power, playerRight, event, playerLeft, ball);
});

document.addEventListener('keyup', (event) => power.resetPowerActivation(event));

// Animation loop
function animate() {
    animationFrameId = requestAnimationFrame(animate); // Update the stored ID
    controls.update();
    ball.moveBall(15, 10, playerLeft, playerRight, game);
    playerLeft.movePlayerai(ball);

    renderer.render(scene, camera);

    // Check if the game is finished
    if (game.scoreleft === 3 || game.scoreright === 3) {
        if (game.scoreleft === 3)
            game.updateScore("Left player wins!");
        if (game.scoreright === 3)
            game.updateScore("Right player wins!");
        cancelAnimationFrame(animationFrameId); // Use the stored ID to cancel
        return; // Exit the function to stop the loop
    }
}               

document.addEventListener('mousemove', (event) => {
    const position = getMousePosition(event, camera, scene);
    if (position ===  null) return;
        playerRight.movePlayer(7.5, position.y, 1);
});

animate();