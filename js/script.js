const dino = document.querySelector('.dino-game'); // Captura o Dinossauro
const rock = document.querySelector('.rock'); // Captura a Pedra
const containerGame = document.querySelector('.game-container'); // Captura o Container do Jogo
const windowWidth = window.innerWidth; // Captura a Largura da Janela
let gameover = false; // Inicia o jogo direto
let score = 0; // Inicializa com a pontuação de 0

// Atualiza a Pontuação
const updateScore = () => {
    const scoreElement = document.getElementById('scoreValue'); // Captura o elemento do Scora
    score += 10; // Adiciona a Pontuação
    scoreElement.textContent = score; // Coloca a pontuação na tela
};

// Faz o dinossauro pular
const jump = () => {
    if (!gameover && !dino.classList.contains('jump')) {
        dino.classList.add('jump'); // Adiciona a classe jump
        setTimeout(() => {
            dino.classList.remove('jump'); // Remove a classe jump
        }, 2000);
        updateScore(); // Atualiza a pontuação quando o dinossauro pular
    }
};

// Reinicializa o Jogo caso tenha uma colisão e mostra a pontuação
const restartGame = () => {
    gameover = false; // Reinicializa o Jogo
    score = 0; // Zera a Pontuação
    document.getElementById('scoreValue').textContent = score; // Zera a pontuação na tela
};

// Verifica se Há Colisões
const checkCollision = () => {
    const dinoBottom = parseInt(getComputedStyle(dino).getPropertyValue('bottom')); // Captura a posição do dinossauro
    const rockRight = parseInt(getComputedStyle(rock).getPropertyValue('right')); // Captura a posição da pedra
    const containerWidth = containerGame.offsetWidth; // Obtém a largura do containerGame em pixels
    let rockRightInitialAbs, rockRightFinalAbs;

    if (windowWidth < 480) {
        rockRightInitialAbs = containerWidth * 0.54; // 54% da largura do elemento pai
        rockRightFinalAbs = containerWidth * 0.79; // 79% da largura do elemento pai
    } else if (windowWidth >= 480 && windowWidth < 768) {
        rockRightInitialAbs = containerWidth * 0.72; // 72% da largura do elemento pai
        rockRightFinalAbs = containerWidth * 0.86; // 86% da largura do elemento pai
    } else if (windowWidth >= 768 && windowWidth < 1440) {
        rockRightInitialAbs = containerWidth * 0.65; // 65% da largura do elemento pai
        rockRightFinalAbs = containerWidth * 0.84; // 84% da largura do elemento pai
    } else if (windowWidth >= 1440 && windowWidth < 1920) {
        rockRightInitialAbs = containerWidth * 0.80; // 80% da largura do elemento pai
        rockRightFinalAbs = containerWidth * 0.91; // 91% da largura do elemento pai
    } else {
        rockRightInitialAbs = containerWidth * 0.65; // 65% da largura do elemento pai
        rockRightFinalAbs = containerWidth * 0.84; // 84% da largura do elemento pai
    }

    // Verificando as condições de colisão
    if (dinoBottom <= -32 && rockRight > rockRightInitialAbs && rockRight < rockRightFinalAbs) {
        gameover = true; // Game Over
        alert('Game Over! A sua pontuação é: ' + score); // Mostra a pontuação na tela
        restartGame(); // Inicializa o jogo novamente
    }

    if (!gameover) {
        requestAnimationFrame(checkCollision); // Checa colisões
    }
};

containerGame.addEventListener('click', jump); // Faz o Dinossauro pular se clicar na tela
checkCollision(); // Inicia a verificação contínua da colisão
