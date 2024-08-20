import { initGame, startARGame } from './game.js';
import { initAudio } from './audio.js';

document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const startGameButton = document.getElementById('start-game');
    const playerSetup = document.getElementById('player-setup');
    const startARGameButton = document.getElementById('start-ar-game');
    const gameContainer = document.getElementById('game-container');
    const gameUI = document.getElementById('game-ui');
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');

    initAudio();

    startGameButton.addEventListener('click', () => {
        splashScreen.style.display = 'none';
        playerSetup.style.display = 'flex';
        initGame();
    });

    startARGameButton.addEventListener('click', () => {
        playerSetup.style.display = 'none';
        gameContainer.style.display = 'block';
        gameUI.style.display = 'block';
        startARGame();
    });

    chatToggle.addEventListener('click', () => {
        chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
    });
});
