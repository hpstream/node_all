
/**
 * 渲染器（Renderer）
 * 场景（Scene）
 * 照相机（Camera）
 */


var renderer, camera, scene, light,stats;
function initThree() {
    // 创建一个 renderer渲染器
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(800, 600);
    // 相当于把这个canvas 放到body里面去
    document.getElementsByTagName('body')[0].appendChild(renderer.domElement);
    // 增加帧数
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.getElementsByTagName('body')[0].appendChild(stats.domElement);
}



// 创建 Scene 场景
function initScene() {
    scene = new THREE.Scene();
    scene.add(camera);
}

function initCamera() {
    // 创建一个相机
    camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 1000);
    camera.position.set(0, 0, 100);
}

function initLight() {
    // 创建一个灯光
    light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
    light.position.set(100, 100, 200);
    scene.add(light);
}
// 创建一个材料
var cube, timer = 0.01;
function initObject() {

    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, -20, 0));
    geometry.vertices.push(new THREE.Vector3(0, 20, 0));

    for (var i = 0; i <= 20; i++) {

        var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0xff0000, opacity: 1 }));
        line.position.x = (i * 5) - 50;
        scene.add(line);

        var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0xff0000, opacity: 1 }));
        line.position.y = (i * 5) - 50;
        line.rotation.z = 90 * Math.PI / 180;
        scene.add(line);

    }
}
// 添加材料贴图

// var texture = THREE.ImageUtils.loadTexture('./timg.jpg', {}, function() {
//     renderer.render(scene, camera);
// });
// var material = new THREE.MeshBasicMaterial({
//     map: texture,
//     overdraw: true
// });
// var cube = new THREE.Mesh(new THREE.SphereGeometry(1, 30, 30),material
// );

function threeStart() {
    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();
    // renderer.clear();
    animation();
}

function animation() {
    //renderer.clear();
    // camera.rotation.y = camera.rotation.y + 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animation);
    stats.update();
}

threeStart();
