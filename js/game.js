// js/game.js

import { initAR } from './ar.js';
import { Player } from './player.js';
import { playAudio } from './audio.js';

let players = [];
let currentPlayerIndex = 0;
let gameTimer;
const GAME_DURATION = 300; // 5 minutes in seconds

export function initGame() {
    const startButton = document.getElementById('start-game');
    startButton.addEventListener('click', startARGame);
}

function startARGame() {
    // Initialize players (you can add more player initialization logic here)
    players.push(new Player("Player 1", "avatar1"));

    // Hide start screen and show game UI
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-ui').style.display = 'block';
    document.getElementById('ar-scene').style.display = 'block';

    // Initialize AR environment
    initAR();

    // Set up game loop
    gameLoop();

    // Add event listener for object interactions
    const scene = document.querySelector('a-scene');
    scene.addEventListener('click', onSceneClick);

    // Start game timer
    startGameTimer();

    // Initial UI update
    updateUI();

    // Play game start audio
    playAudio('gameStart');
}

function onSceneClick(event) {
    const clickedEl = event.detail.intersectedEl;
    if (clickedEl && clickedEl.classList.contains('collectable')) {
        collectObject(clickedEl);
    } else if (clickedEl && clickedEl.classList.contains('avoid')) {
        avoidObject(clickedEl);
    }
}

function collectObject(object) {
    const currentPlayer = players[currentPlayerIndex];
    const objectType = object.getAttribute('data-type');
    
    if (currentPlayer.addToBackpack(objectType)) {
        // Successfully added to backpack
        object.parentNode.removeChild(object);
        currentPlayer.updateScore(10);  // Add 10 points for collecting an object
        playAudio('collect');
        updateUI();
    } else {
        // Backpack is full
        showMessage("Backpack is full! Use or discard an item first.");
    }
}

function avoidObject(object) {
    const currentPlayer = players[currentPlayerIndex];
    currentPlayer.updateScore(-5);  // Subtract 5 points for touching an object to avoid
    playAudio('avoid');
    updateUI();
}

function gameLoop() {
    // Update game state
    updateGameState();

    // Render game
    render();

    // Schedule next frame
    requestAnimationFrame(gameLoop);
}

function updateGameState() {
    // Update player positions, check for collisions, etc.
    // This will be implemented in more detail later
}

function render() {
    // Update UI elements (score, timer, backpack)
    updateUI();
}

function updateUI() {
    const currentPlayer = players[currentPlayerIndex];
    const scoreContainer = document.getElementById('score-container');
    const backpackElement = document.getElementById('backpack');

    // Update scores
    scoreContainer.innerHTML = players.map(player => 
        `${player.name}: ${player.score}${player === currentPlayer ? ' (Current)' : ''}`
    ).join('<br>');

    // Update backpack
    backpackElement.innerHTML = `Backpack: ${currentPlayer.backpack.join(', ') || 'Empty'}`;
}

function showMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.position = 'absolute';
    messageElement.style.top = '50%';
    messageElement.style.left = '50%';
    messageElement.style.transform = 'translate(-50%, -50%)';
    messageElement.style.background = 'rgba(0, 0, 0, 0.7)';
    messageElement.style.color = 'white';
    messageElement.style.padding = '10px';
    messageElement.style.borderRadius = '5px';
    document.body.appendChild(messageElement);
    setTimeout(() => document.body.removeChild(messageElement), 2000);
}

function playAudio(type) {
    // This function will be implemented in the audio.js file
    console.log(`Playing ${type} audio`);
}
