
/**
 * 渲染器（Renderer）
 * 场景（Scene）
 * 照相机（Camera）
 */


var renderer, camera, scene, light, stats;
function initThree() {
    // 创建一个 renderer渲染器
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('rgba(255,255,255,1)', 1.0);
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
    camera.position.set(0, 0, 0);
}

function initLight() {
    // 创建一个灯光
    light = new THREE.DirectionalLight(0xffffff, 1.0, 1);
    light.position.set(100, 100, 200);
    scene.add(light);
}
// 创建一个材料
var cube, timer = 0.01;


var rouletteScene;
function initObject() {

    // var geometry = new THREE.Geometry();
    // geometry.vertices.push(new THREE.Vector3(0, -20, 0));
    // geometry.vertices.push(new THREE.Vector3(0, 20, 0));

    // for (var i = 0; i <= 20; i++) {

    //     var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0xff0000, opacity: 1 }));
    //     line.position.x = (i * 5) - 50;
    //     scene.add(line);

    //     var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0xff0000, opacity: 1 }));
    //     line.position.y = (i * 5) - 50;
    //     line.rotation.z = 90 * Math.PI / 180;
    //     scene.add(line);
    // }
    var loader = new THREE.ColladaLoader();
    loader.load("./model/model.dae", function (collada) {
        rouletteScene = collada.scene;
        rouletteScene.position.set(-4, -4, -40);
        rouletteScene.rotation.set(-90 * Math.PI / 180, 0, 0);
        scene.add(rouletteScene);
    })
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
var isdown = false;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var x0 = 0, y0 = 0, x1 = 0, y1 = 0, x = 0, y = 0;
function animation() {
    //renderer.clear();
    if (rouletteScene) {
        // rouletteScene.rotation.x = x1;
        // rouletteScene.rotation.y = y1;

    }

    // update the picking ray with the camera and mouse position

    renderer.render(scene, camera);
    requestAnimationFrame(animation);
    stats.update();
}

threeStart();



function onMouseMove(event) {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

}
renderer.domElement.addEventListener('mousedown', function (e) {
    isdown = true;
    x0 = e.clientX;
    y0 = e.clientY;
})
renderer.domElement.addEventListener('mousemove', function (e) {
    if (isdown) {
        x1 = (e.clientX - x0) * Math.PI / 180;
        y1 = (e.clientY - y0) * Math.PI / 180;
        mouse.x = x1;
        mouse.y = y1;
        camera.position.x = x + x1;
        camera.position.y = y + y1;

    }
})
renderer.domElement.addEventListener('mouseup', function (e) {
    isdown = false;
    x = camera.position.x;
    y = camera.position.y;
})
