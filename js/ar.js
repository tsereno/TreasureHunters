// js/ar.js

export function initAR() {
    const marker = document.querySelector('a-marker');

    // Create AR objects
    createRainbowArch(marker);
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
}
