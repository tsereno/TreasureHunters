// js/ar.js

export function initAR() {
    const marker = document.querySelector('a-marker');

    // Create AR objects
    createRainbowArch(marker);
    createTreasureChest(marker);
    addRandomObjects(marker, 10);
    addAvoidObjects(marker, 5);
}

function createRainbowArch(parent) {
    const rainbow = document.createElement('a-entity');
    rainbow.setAttribute('geometry', {
        primitive: 'torus',
        radius: 0.5,
        radiusTubular: 0.01,
        arc: 180,
        segmentsTubular: 50
    });
    rainbow.setAttribute('material', {
        shader: 'standard',
        color: '#ff0000',
        emissive: '#ff0000',
        emissiveIntensity: 0.5
    });
    rainbow.setAttribute('position', '0 0.25 0');
    rainbow.setAttribute('rotation', '0 90 0');
    parent.appendChild(rainbow);
}

function addRandomObjects(parent, count) {
    const objects = ['coin', 'gem', 'key', 'potion'];
    for (let i = 0; i < count; i++) {
        const object = document.createElement('a-entity');
        const type = objects[Math.floor(Math.random() * objects.length)];
        object.setAttribute('geometry', {primitive: 'box', width: 0.1, height: 0.1, depth: 0.1});
        object.setAttribute('material', {color: getColorForType(type)});
        object.setAttribute('position', `${Math.random() - 0.5} ${Math.random() * 0.5} ${Math.random() - 0.5}`);
        object.setAttribute('class', 'collectable');
        object.setAttribute('data-type', type);
        parent.appendChild(object);
    }
}

function addAvoidObjects(parent, count) {
    for (let i = 0; i < count; i++) {
        const object = document.createElement('a-entity');
        object.setAttribute('geometry', {
            primitive: 'sphere',
            radius: 0.05
        });
        object.setAttribute('material', {
            color: 'red',
            opacity: 0.7
        });
        object.setAttribute('position', `${Math.random() - 0.5} ${Math.random() * 0.5} ${Math.random() - 0.5}`);
        object.setAttribute('class', 'avoid');
        parent.appendChild(object);
    }
}

function getColorForType(type) {
    switch(type) {
        case 'coin': return 'gold';
        case 'gem': return 'purple';
        case 'key': return 'silver';
        case 'potion': return 'green';
        default: return 'gray';
    }

function createTreasureChest(parent) {
    const chest = document.createElement('a-entity');
    chest.setAttribute('id', 'treasure-chest');
    
    // Create the main body of the chest
    const body = document.createElement('a-box');
    body.setAttribute('width', '0.3');
    body.setAttribute('height', '0.2');
    body.setAttribute('depth', '0.2');
    body.setAttribute('color', '#8B4513');
    body.setAttribute('position', '0 0.1 0');
    
    // Create the lid of the chest
    const lid = document.createElement('a-box');
    lid.setAttribute('width', '0.32');
    lid.setAttribute('height', '0.05');
    lid.setAttribute('depth', '0.22');
    lid.setAttribute('color', '#8B4513');
    lid.setAttribute('position', '0 0.225 -0.01');
    
    // Create golden details
    const detailFront = document.createElement('a-box');
    detailFront.setAttribute('width', '0.05');
    detailFront.setAttribute('height', '0.05');
    detailFront.setAttribute('depth', '0.01');
    detailFront.setAttribute('color', 'gold');
    detailFront.setAttribute('position', '0 0.1 0.101');
    
    // Add all parts to the chest entity
    chest.appendChild(body);
    chest.appendChild(lid);
    chest.appendChild(detailFront);
    
    // Position the chest in the scene
    chest.setAttribute('position', '0 0 -0.5');
    chest.setAttribute('rotation', '0 0 0');
    chest.setAttribute('scale', '0.5 0.5 0.5');
    
    // Make the chest interactable
    chest.setAttribute('class', 'interactable');
    
    parent.appendChild(chest);
}
