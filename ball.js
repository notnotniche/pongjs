import * as THREE from 'three';

export class Ball {
    constructor(scene) {
        this.geometry = new THREE.SphereGeometry(0.3, 10, 10);
        this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(0, 0, 1); // Set initial position to (0, 0, 0)
        this.SERVICE_SIDE = 0;
        this.speedX = 0.1;
        this.speedY = 0.1;
        scene.add(this.mesh);
    }
    moveBall(fieldWidth, fieldHeight, leftPaddle, rightPaddle, game) {
        // Update position based on speed
        let newX = this.mesh.position.x + this.speedX;
        let newY = this.mesh.position.y + this.speedY;
        // console.log(this.speedX);
        
        if (newX <= -fieldWidth / 2 || newX >= fieldWidth / 2) {
            if (newX <= -fieldWidth / 2) {
                game.increaseScoreright();
                this.speedX *= -1;
            }
            if (newX >= fieldWidth / 2) {
                game.increaseScoreleft();
                this.speedX *= -1;
            }
            this.resetBall();
            game.updateScore(game.getScore());
            return;

        }
    
        // Check for collision with horizontal walls (top and bottom)
        else if (newY <= -fieldHeight / 2 || newY >= fieldHeight / 2) {
            this.speedY *= -1; // Invert y component of speed
        }

        else if ((newX <= leftPaddle.playerMesh.position.x + 0.5 && newY <= leftPaddle.playerMesh.position.y + leftPaddle.height / 2 && newY >= leftPaddle.playerMesh.position.y - leftPaddle.height / 2) ||
        (newX >= rightPaddle.playerMesh.position.x - 0.5 && newY <= rightPaddle.playerMesh.position.y + rightPaddle.height / 2 && newY >= rightPaddle.playerMesh.position.y - rightPaddle.height / 2)) {
            this.speedX *= -1;
    
        // Move the ball outside the paddle's bounds to prevent "sticking"
        if (newX < 0) { // Collision with left paddle
            newX = leftPaddle.playerMesh.position.x + 0.6; // Adjust 0.6 to ensure it's outside the collision bounds
        } else { // Collision with right paddle
            newX = rightPaddle.playerMesh.position.x - 0.6; // Adjust 0.6 to ensure it's outside the collision bounds
        }
    }
        // this.checkPaddleCollision(paddle);
        // console.log(leftPaddle.playerMesh.position.x);
        // Apply updated position
        this.mesh.position.set(newX, newY, this.mesh.position.z);
    }
    hasReachedPosition(targetY) {
        const threshold = 0.1; // Define a small threshold to account for floating-point inaccuracies
        const absTargetY = Math.abs(targetY);
        const deltaY = Math.abs(this.mesh.position.y - absTargetY);
        return deltaY <= threshold;
    }
    resetBall() {
        this.mesh.position.set(0, 0, 1); // Reset position to (0, 0, 1)
        this.speedY += 0.01;
        this.speedX += 0.01;
    }
    changeColorTemporarily() {
        const originalColor = this.material.color.getHex();
        const tempColor = 0x00ff00;

        this.mesh.material.color.setHex(tempColor);

        setTimeout(() => {
            this.mesh.material.color.setHex(originalColor);
        }, 3000); 
    
    }
}