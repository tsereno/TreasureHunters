// js/audio.js

export function playAudio(type) {
    console.log(`Playing ${type} audio`);
    // Implement actual audio playing logic here
    // For example:
    let sound;
    switch(type) {
        case 'gameStart':
            sound = new Audio('audio/game-start.mp3');
            break;
        case 'collect':
            sound = new Audio('audio/collect.mp3');
            break;
        case 'avoid':
            sound = new Audio('audio/avoid.mp3');
            break;
        case 'treasureFound':
            sound = new Audio('audio/treasure-found.mp3');
            break;
        case 'gameEnd':
            sound = new Audio('audio/game-end.mp3');
            break;
        default:
            console.log('Unknown audio type');
            return;
    }
    sound.play().catch(e => console.error("Error playing audio:", e));
}
