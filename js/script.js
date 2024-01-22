const dino = document.querySelector('.dino-game');
const rock = document.querySelector('.rock');
let gameover = false;
let score = 0;

// Atualiza a Pontuação
const updateScore = () => {
    const scoreElement = document.getElementById('scoreValue');
    score += 10;
    scoreElement.textContent = score;
};

// Faz o dinossauro pular
const jump = () => {
    if (!gameover && !dino.classList.contains('jump')) {
        dino.classList.add('jump')

        setTimeout(() => {
            dino.classList.remove('jump');
        }, 2000);

        // Validação para a pontuação
        const rockLeft = parseInt(getComputedStyle(rock).getPropertyValue('left'));
        if (rockLeft < 250) {
            updateScore();
        }
    }
};

// Reinicializa o Jogo caso tenha uma colisão e mostra a pontuação
const restartGame = () => {
    gameover = false;
    score = 0;
    document.getElementById('scoreValue').textContent = score;
};

// Verifica se Há Colisões
const checkCollision = () => {
    const dinoBottom = parseInt(getComputedStyle(dino).getPropertyValue('bottom'));
    const rockLeft = parseInt(getComputedStyle(rock).getPropertyValue('left'));

    if (dinoBottom < 9 && rockLeft > 3 && rockLeft < 180) {
        gameover = true;
        alert('Game Over! A sua pontuação é: ' + score);
        restartGame();
    }

    if (!gameover) {
        requestAnimationFrame(checkCollision);
    }
};

// Adiciona a Barra de Espaço
document.addEventListener('keydown', (event) => {
    if (event.keyCode === 32) { // Barra de espaço
        jump();
    }
});

checkCollision(); // Inicia a verificação contínua da colisão
