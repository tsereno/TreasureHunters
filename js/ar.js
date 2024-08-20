// js/ar.js

export function initAR() {
    const scene = document.querySelector('a-scene');

    // Wait for the scene to load before adding entities
    scene.addEventListener('loaded', () => {
        // Create a rainbow arch
        createRainbowArch(scene);

        // Add some random AR objects to find
        addRandomObjects(scene, 10);

        // Add objects to avoid
        addAvoidObjects(scene, 5);
    });
}

function createRainbowArch(scene) {
    const rainbow = document.createElement('a-entity');
    rainbow.setAttribute('geometry', {
        primitive: 'torus',
        radius: 5,
        radiusTubular: 0.1,
        arc: 180,
        segmentsTubular: 50
    });
    rainbow.setAttribute('material', {
        shader: 'standard',
        color: '#ff0000',
        emissive: '#ff0000',
        emissiveIntensity: 0.5
    });
    rainbow.setAttribute('position', '0 2.5 -10');
    rainbow.setAttribute('rotation', '0 90 0');
    scene.appendChild(rainbow);
}

function addRandomObjects(scene, count) {
    const objects = ['coin', 'gem', 'key', 'potion'];
    for (let i = 0; i < count; i++) {
        const object = document.createElement('a-entity');
        const type = objects[Math.floor(Math.random() * objects.length)];
        object.setAttribute('gltf-model', `#${type}-model`);
        object.setAttribute('scale', '0.1 0.1 0.1');
        object.setAttribute('position', `${Math.random() * 10 - 5} ${Math.random() * 2} ${Math.random() * -10 - 5}`);
        object.setAttribute('class', 'collectable');
        object.setAttribute('data-type', type);
        
        // Make object interactive
        object.setAttribute('clickable', '');
        
        object.addEventListener('model-error', function(e) {
            console.error(`Error loading model for ${type}:`, e);
            this.setAttribute('geometry', {primitive: 'box', width: 0.5, height: 0.5, depth: 0.5});
            this.setAttribute('material', {color: getColorForType(type)});
        });
        
        scene.appendChild(object);
    }
}

function addAvoidObjects(scene, count) {
    for (let i = 0; i < count; i++) {
        const object = document.createElement('a-entity');
        object.setAttribute('geometry', {
            primitive: 'sphere',
            radius: 0.5
        });
        object.setAttribute('material', {
            color: 'red',
            opacity: 0.7
        });
        object.setAttribute('position', `${Math.random() * 10 - 5} ${Math.random() * 2} ${Math.random() * -10 - 5}`);
        object.setAttribute('class', 'avoid');
        
        // Make object interactive
        object.setAttribute('clickable', '');
        
        scene.appendChild(object);
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

AFRAME.registerComponent('clickable', {
    init: function () {
        this.el.addEventListener('click', function (evt) {
            // This event will bubble up to the scene
        });
    }
});