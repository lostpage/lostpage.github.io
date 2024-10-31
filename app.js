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


const playerGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const playerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.y = 1; // Поднимаем персонажа над платформой
scene.add(player);


camera.position.z = 5; // Устанавливаем камеру на расстоянии 5 единиц по оси Z
camera.position.y = 2; // Поднимаем камеру немного вверх
camera.lookAt(new THREE.Vector3(0, 0, 0)); // Направляем камеру на центр сцены


function animate() {
    requestAnimationFrame(animate); // Запрашиваем следующий кадр анимации

    // Здесь можно добавить логику для перемещения персонажа

    renderer.render(scene, camera); // Рендерим сцену с использованием камеры
}

animate(); // Запускаем анимацию
