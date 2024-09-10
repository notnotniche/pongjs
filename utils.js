import * as THREE from 'three';

export function getMousePosition(event, camera, scene) {
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    // Calculate normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Set the raycaster's origin and direction based on the mouse position
    raycaster.setFromCamera(mouse, camera);

    // Find all intersected objects
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        // Return the position of the first intersected object
        return intersects[0].point;
    }
    return null;
}