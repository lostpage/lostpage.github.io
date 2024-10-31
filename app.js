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
    requestAnimationFrame(animate);

    // Обновляем позицию персонажа
    player.position.add(playerVelocity);

    renderer.render(scene, camera);
}





let playerVelocity = new THREE.Vector3(); // Вектор скорости персонажа
const speed = 0.1; // Скорость перемещения

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            playerVelocity.z = -speed; // Двигаем персонажа вперед
            break;
        case 'ArrowDown':
            playerVelocity.z = speed; // Двигаем персонажа назад
            break;
        case 'ArrowLeft':
            playerVelocity.x = -speed; // Двигаем персонажа влево
            break;
        case 'ArrowRight':
            playerVelocity.x = speed; // Двигаем персонажа вправо
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
            playerVelocity.z = 0; // Останавливаем движение по оси Z
            break;
        case 'ArrowLeft':
        case 'ArrowRight':
            playerVelocity.x = 0; // Останавливаем движение по оси X
            break;
    }
});


animate(); // Запускаем анимацию