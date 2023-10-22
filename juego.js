// Version: 1.7
// Autor: Iker Lobo Pérez
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const squareSize = 50;
let x = canvas.width / 2 - squareSize / 2;
let y = canvas.height - squareSize;

// Posición inicial del cuadrado rojo
let redSquareX = Math.random() * (canvas.width - squareSize);
let redSquareY = Math.random() * (canvas.height - squareSize);
let redSquareXDirection = 0; // Dirección horizontal (0, -1 o 1)
let redSquareYDirection = 0; // Dirección vertical (0, -1 o 1)

// Posición inicial del cuadrado azul
let blueSquareX = Math.random() * (canvas.width - squareSize);
let blueSquareY = Math.random() * (canvas.height - squareSize);

// Velocidad del cuadrado rojo y azul
const redSquareSpeed = 2;
const blueSquareSpeed = 1.5; // Reducido la velocidad del cuadrado azul

// Función para dibujar el cuadrado azul
function drawBlueSquare() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(blueSquareX, blueSquareY, squareSize, squareSize);
}

// Función para dibujar el cuadrado rojo
function drawRedSquare() {
    ctx.fillStyle = 'red';
    ctx.fillRect(redSquareX, redSquareY, squareSize, squareSize);
}

// Función para mover el cuadrado rojo con dirección controlada por teclas
function moveRedSquareWithArrowKeys() {
    redSquareX += redSquareSpeed * redSquareXDirection;
    redSquareY += redSquareSpeed * redSquareYDirection;

    // Verificar y cambiar la dirección de rebote en los límites de la pantalla
    if (redSquareX <= 0 || redSquareX + squareSize >= canvas.width) {
        redSquareXDirection = 0;
    }

    if (redSquareY <= 0 || redSquareY + squareSize >= canvas.height) {
        redSquareYDirection = 0;
    }

    // Llama a esta función nuevamente después de un intervalo
    requestAnimationFrame(moveRedSquareWithArrowKeys);
}


function reset() {
    // Restablece la posición inicial del cuadrado rojo
    redSquareX = Math.random() * (canvas.width - squareSize);
    redSquareY = Math.random() * (canvas.height - squareSize);

    // Restablece la posición inicial del cuadrado azul
    blueSquareX = Math.random() * (canvas.width - squareSize);
    blueSquareY = Math.random() * (canvas.height - squareSize);

    // Detiene el movimiento de ambos cuadrados
    redSquareXDirection = 0;
    redSquareYDirection = 0;

    // Borra el contenido del canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibuja los cuadrados en sus nuevas posiciones
    drawBlueSquare();
    drawRedSquare();
}

// Función para mover el cuadrado azul hacia el cuadrado rojo en todo momento
function moveBlueSquareTowardsRed() {
    const deltaX = redSquareX - blueSquareX;
    const deltaY = redSquareY - blueSquareY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance > 0) {
        const ratio = blueSquareSpeed / distance;
        blueSquareX += deltaX * ratio;
        blueSquareY += deltaY * ratio;
    }

    // Llama a esta función nuevamente después de un intervalo
    requestAnimationFrame(moveBlueSquareTowardsRed);
}

// Inicializa el control del cuadrado rojo con las teclas de flecha
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            redSquareYDirection = -1;
            break;
        case 'ArrowDown':
            redSquareYDirection = 1;
            break;
        case 'ArrowLeft':
            redSquareXDirection = -1;
            break;
        case 'ArrowRight':
            redSquareXDirection = 1;
            break;
    }
});

document.addEventListener('keyup', (event) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        redSquareXDirection = 0;
        redSquareYDirection = 0;
    }
});

// Dibuja los cuadrados por separado
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBlueSquare();
    drawRedSquare();
    requestAnimationFrame(draw);
}

function resetGame() {
    // Llama a la función de reset para restablecer el juego
    reset();
}

// Inicializa el dibujo de los cuadrados
draw();



