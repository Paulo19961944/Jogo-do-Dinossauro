const dino = document.querySelector('.dino-game');
const rock = document.querySelector('.rock');
let gameover = false;
let score = 0;

const updateScore = () => {
    const scoreElement = document.getElementById('scoreValue');
    score += 10;
    scoreElement.textContent = score;
};

const jump = () => {
    if (!gameover && !dino.classList.contains('jump')) {
        dino.classList.add('jump')

        setTimeout(() => {
            dino.classList.remove('jump');
        }, 2000);

        const rockLeft = parseInt(getComputedStyle(rock).getPropertyValue('left'));
        if(rockLeft < 230){
            updateScore();
        }
    }
};

const restartGame = () => {
    gameover = false;
    score = 0;
    document.getElementById('scoreValue').textContent = score;
    // Reinicialize outros estados ou elementos, se necessário
};

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

document.addEventListener('keydown', (event) => {
    if (event.keyCode === 32) { // Barra de espaço
        jump();
    }
});

checkCollision(); // Inicia a verificação contínua da colisão
