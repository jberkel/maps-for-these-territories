function init() {
    var projector = new THREE.Projector();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.x = 0.5;
    camera.position.y = 0.5;
    camera.position.z = 1.5;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    var controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', render);
    controls.target.x = 0.5;
    controls.target.y = 0.5;

    var map = new Map(camera, controls);

    for (var name in streets) {
        if (streets.hasOwnProperty(name)) {
            var data = streets[name];
            map.addStreet(name, data);
        }
    }

    var stats = new Stats();
    stats.domElement.id = "stats";
    document.body.appendChild(stats.domElement);

    soundModule = new SoundModule(map);

    function animate() {
        requestAnimationFrame(animate);
        TWEEN.update();
//        controls.update();

        render();
        soundModule.updateSpat(camera.position)
        stats.update();
    }

    function render() {
        renderer.render(map, camera);
    }

    function onDocumentMouseDown(event) {
        console.log(event);

        event.preventDefault();
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
        var first = names[0];
        map.zoomTo(first);
    }

    animate();

//    renderChanges(map, changes);

    document.body.appendChild(renderer.domElement);
    document.addEventListener('mousedown', onDocumentMouseDown, false);

    window.map = map;

    function zoomToRandomStreet(list) {
        var index = Math.round(Math.random() * list.length);
        var randomStreet = list[index];

        if (randomStreet) {
            console.log("zooming to "+randomStreet);
            map.zoomTo(randomStreet, function() {

                setTimeout(function() {
                    zoomToRandomStreet(list);
                }, Math.random() * 3000);
            });
        } else {
            console.log("not found");
        }
    }

    zoomToRandomStreet(Object.keys(streets));
}
