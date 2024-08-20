// js/game.js

import { initAR } from './ar.js';
import { Player } from './player.js';

let players = [];
let currentPlayer = 0;

export function initGame() {
    // Create player setup forms
    const playerForms = document.getElementById('player-forms');
    for (let i = 0; i < 4; i++) {
        const form = createPlayerForm(i + 1);
        playerForms.appendChild(form);
    }
}

function createPlayerForm(playerNumber) {
    const form = document.createElement('div');
    form.innerHTML = `
        <h3>Player ${playerNumber}</h3>
        <input type="text" id="player${playerNumber}-name" placeholder="Enter name">
        <select id="player${playerNumber}-avatar">
            <option value="avatar1">Avatar 1</option>
            <option value="avatar2">Avatar 2</option>
            <option value="avatar3">Avatar 3</option>
        </select>
    `;
    return form;
}

export function startARGame() {
    // Initialize players
    for (let i = 1; i <= 4; i++) {
        const name = document.getElementById(`player${i}-name`).value;
        const avatar = document.getElementById(`player${i}-avatar`).value;
        if (name) {
            players.push(new Player(name, avatar));
        }
    }

    // Initialize AR environment
    initAR();
	
    const scene = document.querySelector('a-scene');
    scene.addEventListener('click', onSceneClick);

    // Set up game loop
    gameLoop();
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