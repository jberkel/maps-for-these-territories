function init() {
    var map = new Map();
    var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 1000);
    var controls = new THREE.OrbitControls(camera);
//    var controls = new THREE.FlyControls(camera, render.domElement);
    controls.addEventListener('change', render);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    for (var name in streets) {
        if (streets.hasOwnProperty(name)) {
            var data = streets[name];
            map.addStreet(name, data);
        }
    }
//    camera.lookAt(map.position);
    camera.position.z = 0.8;
    camera.position.x = 0.7;
    camera.position.y = 1.1;

    document.body.appendChild(renderer.domElement);

    function animate() {
        requestAnimationFrame(animate);
        render();
        controls.update();
    }

    function render() {
        renderer.render(map, camera);
    }

    animate();

    renderChanges(map, changes);
}
