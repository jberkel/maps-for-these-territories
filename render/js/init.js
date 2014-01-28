function init() {
    var map = new Map();
    var projector = new THREE.Projector();
    var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 1000);
    var controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', render);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    for (var name in streets) {
        if (streets.hasOwnProperty(name)) {
            var data = streets[name];
            map.addStreet(name, data);
        }
    }

    camera.position.z = 0.8;
    camera.position.x = 0.7;
    camera.position.y = 1.1;

    function animate() {
        requestAnimationFrame(animate);
        render();
        controls.update();
    }

    function render() {
        renderer.render(map, camera);
    }

    function onDocumentMouseDown(event) {
        event.preventDefault();
        console.log(event);
        var vector = new THREE.Vector3(
              ( event.clientX / window.innerWidth )  * 2 - 1,
            - ( event.clientY / window.innerHeight ) * 2 + 1,
            0.5
        );
        projector.unprojectVector(vector, camera);
        var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
        var intersects = raycaster.intersectObjects(map.children);

        if (intersects.length > 0) {
            var selected = [];
            for (var i = 0; i < intersects.length; i++) {
                var obj = intersects[i];
                if (selected.indexOf(obj.object.name) == -1) {
                    selected.push(obj.object.name);
                }
            }
            if (selected.length > 0) {
                onSelected(selected);
            }
        }
    }

    function onSelected(names) {
        console.log(names);
    }

    animate();

    renderChanges(map, changes);

    document.body.appendChild(renderer.domElement);
    document.addEventListener('mousedown', onDocumentMouseDown, false);
}
