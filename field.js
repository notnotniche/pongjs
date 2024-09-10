import * as THREE from 'three';

export class Field {
    constructor(width, height, depth) {
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.field = null;
        this.net = null;
    }

    createField(scene) {
        const fieldGeometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
        const fieldMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.field = new THREE.Mesh(fieldGeometry, fieldMaterial);
        scene.add(this.field);
    }

    createNet(scene) {
        const netGeometry = new THREE.BoxGeometry(0.5, 2, 2);
        const netMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        this.net = new THREE.Mesh(netGeometry, netMaterial);
        scene.add(this.net);
    }
}
