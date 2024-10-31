// app.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(720, 1080);
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

    // Ограничиваем движение персонажа в пределах платформы
    if (player.position.x < -2.5) player.position.x = -2.5; // Левый край платформы
    if (player.position.x > 2.5) player.position.x = 2.5; // Правый край платформы
    if (player.position.z < -2.5) player.position.z = -2.5; // Задний край платформы
    if (player.position.z > 2.5) player.position.z = 2.5; // Передний край платформы

    renderer.render(scene, camera);
}


animate(); // Запускаем анимацию


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


let isJumping = false; // Флаг, указывающий, прыгает ли персонаж
const jumpHeight = 1; // Высота прыжка
const gravity = -0.05; // Сила тяжести

function animate() {
    requestAnimationFrame(animate);

    // Обновляем позицию персонажа
    player.position.add(playerVelocity);

    // Ограничиваем движение персонажа в пределах платформы
    if (player.position.x < -2.5) player.position.x = -2.5;
    if (player.position.x > 2.5) player.position.x = 2.5;
    if (player.position.z < -2.5) player.position.z = -2.5;
    if (player.position.z > 2.5) player.position.z = 2.5;

    // Обработка прыжка
    if (isJumping) {
        player.position.y += jumpHeight; // Поднимаем персонажа
        jumpHeight += gravity; // Применяем силу тяжести
        if (player.position.y <= 1) { // Если персонаж достиг земли
            player.position.y = 1; // Устанавливаем его на уровень платформы
            isJumping = false; // Завершаем прыжок
            jumpHeight = 1; // Сбрасываем высоту прыжка
        }
    }

    renderer.render(scene, camera);
}

// Обработка нажатия пробела для прыжка
document.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
        if (!isJumping) {
            isJumping = true; // Начинаем прыжок
        }
    }
});
