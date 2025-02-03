import * as THREE from 'https://unpkg.com/three@latest/build/three.module.js';

const scene = new THREE.Scene();
scene.background = null; // Set background to transparent

const camera = new THREE.PerspectiveCamera( 17, window.innerWidth / window.innerHeight, 0.9, 2000 );

const renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable transparency
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const light = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(1, 5, 5);
scene.add(directionalLight);

// Different materials
const materials = [
    new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 1.8, roughness: 0.2 }),
    new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.5, roughness: 0.5 }),
    new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.1, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.2, roughness: 0.8 }),
    new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.6, roughness: 0.4 })
];

// Adding multiple shapes
const shapes = [];
const geometries = [
    new THREE.BoxGeometry(1, 1, 5),
    new THREE.SphereGeometry(1.5, 12, 92),
    new THREE.ConeGeometry(1.5, 1, 92),
    new THREE.TorusGeometry(5, 0.01,16, 200),
    new THREE.DodecahedronGeometry(1.7)
];

for (let i = 0; i < 40; i++) {
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    const material = materials[Math.floor(Math.random() * materials.length)];
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
        (Math.random() - 2.1) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5
    );
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    scene.add(mesh);
    shapes.push(mesh);
}

camera.position.z = 10;

function animate() {
    shapes.forEach(shape => {
        shape.rotation.x += 0.001;
        shape.rotation.y += 0.0001;
    });
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
