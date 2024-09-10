import * as THREE from 'three';

export class Player {
    constructor(scene, side) {
        this.scene = scene;
        this.side = side; // "left" or "right"
        this.width = 0.5;
        this.height = 2.5;
        this.depth = 0.2;
        this.playerMesh = null;
        this.camera = null; // Initialize camera as null here
        this.initPlayer();
        this.scoreCombo = 0;
    }

    initPlayer() {
        const geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
        const material = new THREE.MeshBasicMaterial({ color: 0xf43fff });
        this.playerMesh = new THREE.Mesh(geometry, material);

        // Assuming the field width is 15 for positioning
        const fieldWidth = 15;
        const positionX = this.side === "left" ? -fieldWidth / 2 + this.width : fieldWidth / 2 - this.width;

        // Set player position
        this.playerMesh.position.set(positionX, 0, 1);

        // Add the player to the scene
        this.scene.add(this.playerMesh);

        // Initialize and position the camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const cameraOffset = this.side === "left" ? 5 : -5; // Adjust this value as needed
        this.camera.position.set(positionX + cameraOffset, 0, 10); // Adjust z to change the height
        this.camera.lookAt(this.playerMesh.position); // Make the camera face the player
    }

    movePlayer(x, y, z) {
        this.playerMesh.position.set(x, y, z);
        // Optionally, update the camera position relative to the player here
    }

    movePlayerai(ball) {
        this.playerMesh.position.set(-7.5, ball.mesh.position.y, 1);
    }
    getCamera() {
        return this.camera;
    }
    growHeight(increase) {
        // Update the player's height
        this.height += increase;
    
        // Create a new geometry with the updated height
        const newGeometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
    
        // Update the player mesh with the new geometry
        this.playerMesh.geometry.dispose(); // Dispose of the old geometry
        this.playerMesh.geometry = newGeometry;
    }
    reduceHeight(decrease) {
        // Update the player's height
        this.height -= decrease;
    
        // Create a new geometry with the updated height
        const newGeometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
    
        // Update the player mesh with the new geometry
        this.playerMesh.geometry.dispose(); // Dispose of the old geometry
        this.playerMesh.geometry = newGeometry;
    }
}