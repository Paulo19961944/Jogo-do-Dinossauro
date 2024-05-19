const dino = document.querySelector('.dino-game'); // Captura o Dinossauro
const obstaculo = document.querySelector('.obstaculo'); // Captura a Pedra
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
        }, 1500);
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
    const obstaculoRight = parseInt(getComputedStyle(obstaculo).getPropertyValue('right')); // Captura a posição da pedra
    const containerWidth = containerGame.offsetWidth; // Obtém a largura do containerGame em pixels
    let obstaculoRightInitialAbs, obstaculoRightFinalAbs;

    if (windowWidth < 480) {
        obstaculoRightInitialAbs = containerWidth * 0.55; // 55% da largura do elemento pai
        obstaculoRightFinalAbs = containerWidth * 0.72; // 72% da largura do elemento pai
    } else if (windowWidth >= 480 && windowWidth < 768) {
        obstaculoRightInitialAbs = containerWidth * 0.71; // 71% da largura do elemento pai
        obstaculoRightFinalAbs = containerWidth * 0.84; // 84% da largura do elemento pai
    } else if (windowWidth >= 768 && windowWidth < 1440) {
        obstaculoRightInitialAbs = containerWidth * 0.68; // 68% da largura do elemento pai
        obstaculoRightFinalAbs = containerWidth * 0.82; // 82% da largura do elemento pai
    } else if (windowWidth >= 1440 && windowWidth < 1920) {
        obstaculoRightInitialAbs = containerWidth * 0.81; // 81% da largura do elemento pai
        obstaculoRightFinalAbs = containerWidth * 0.90; // 90% da largura do elemento pai
    } else {
        obstaculoRightInitialAbs = containerWidth * 0.67; // 67% da largura do elemento pai
        obstaculoRightFinalAbs = containerWidth * 0.82; // 82% da largura do elemento pai
    }

    // Verificando as condições de colisão
    if (dinoBottom <= -2 && obstaculoRight > obstaculoRightInitialAbs && obstaculoRight < obstaculoRightFinalAbs) {
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
