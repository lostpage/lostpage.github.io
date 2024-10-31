// app.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const platformGeometry = new THREE.BoxGeometry(5, 0.5, 5);
const platformMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const platform = new THREE.Mesh(platformGeometry, platformMaterial);
platform.position.y = -0.25; // Позиционируем платформу
scene.add(platform);