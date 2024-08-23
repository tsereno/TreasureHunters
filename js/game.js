AFRAME.registerComponent('gesture-handler', {
    init: function () {
        this.isOpen = false;
        this.el.addEventListener('click', e => {
            this.toggleBox();
        });
    },
    toggleBox: function () {
        const model = this.el.object3D;
        const newRotation = this.isOpen ? -90 : 0;
        model.rotation.x = THREE.Math.degToRad(newRotation);
        this.isOpen = !this.isOpen;
        this.playSound(this.isOpen ? 'open' : 'close');
    },
    playSound: function (action) {
        // Here you would play the appropriate sound effect
        console.log(`Playing ${action} sound`);
    }
});
