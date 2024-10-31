// app.js

        // Инициализация сцены, камеры и рендерера
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1920 / 1080, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();

        renderer.setSize(1920, 1080);
        document.body.appendChild(renderer.domElement);

        // Создание платформы
        const platformGeometry = new THREE.BoxGeometry(5, 0.5, 5);
        const platformMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const platform = new THREE.Mesh(platformGeometry, platformMaterial);
        platform.position.y = -0.25; // Позиционируем платформу
        scene.add(platform);

        // Создание персонажа
        const playerGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const playerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const player = new THREE.Mesh(playerGeometry, playerMaterial);
        player.position.y = 1; // Поднимаем персонажа над платформой
        scene.add(player);

        // Настройка камеры
        camera.position.z = 5; // Устанавливаем камеру на расстоянии 5 единиц по оси Z
        camera.position.y = 2; // Поднимаем камеру немного вверх
        camera.lookAt(new THREE.Vector3(0, 0, 0)); // Направляем камеру на центр сцены

        // Переменные для управления персонажем
        let playerVelocity = new THREE.Vector3(); // Вектор скорости персонажа
        const speed = 0.1; // Скорость перемещения
        let isJumping = false; // Флаг, указывающий, прыгает ли персонаж
        let jumpHeight = 0; // Высота прыжка
        const gravity = -0.05; // Сила тяжести

        // Обработка ввода с клавиатуры
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
                case 'Space': // Пробел для прыжка
                    if (!isJumping) {
                        isJumping = true; // Начинаем прыжок
                        jumpHeight = 0.5; // Устанавливаем начальную высоту прыжка
                    }
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

        // Функция анимации
        function animate() {
            requestAnimationFrame(animate);

            // Обновляем позицию персонажа
            player.position.add(playerVelocity);

            // Ограничиваем движение персонажа в пределах платформы
            if (player.position.x < -2.5) player.position.x = -2.5; // Левый край платформы
            if (player.position.x > 2.5) player.position.x = 2.5; // Правый край платформы
            if (player.position.z < -2.5) player.position.z = -2.5; // Задний край платформ
            if (player.position.z > 2.5) player.position.z = 2.5; // Передний край платформы

            // Обработка прыжка
            if (isJumping) {
                player.position.y += jumpHeight; // Поднимаем персонажа
                jumpHeight += gravity; // Применяем силу тяжести
                if (player.position.y <= 1) { // Если персонаж достиг уровня платформы
                    player.position.y = 1; // Устанавливаем его на уровень платформы
                    isJumping = false; // Завершаем прыжок
                    jumpHeight = 0; // Сбрасываем высоту прыжка
                }
            }

            renderer.render(scene, camera); // Рендерим сцену
        }

        animate(); // Запускаем анимацию