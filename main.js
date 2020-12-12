// Setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth/window.innerHeight,
	0.1,
	1000
);
camera.position.z = 5;
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#0075FF");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

function onWindowResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth/window.innerHeight;
	camera.updateProjectionMatrix();
}

window.addEventListener('resize', onWindowResize)

// ------------------------------------------------------------------------

let blocks = [];
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

// Adding Cube
let geometry = new THREE.BoxGeometry(1, 1, 1);
for (let i = -5; i <= 5; i++) {
	let material;
	let mesh;
	for (let j = -5; j <= 5; j++) {
		material = new THREE.MeshLambertMaterial(Math.abs(i+j)%2 == 0 ? {color: "#FFFFFF"} : {color: "#171520"});
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.y = j*1;
		mesh.position.x = i*1;
		mesh.position.z = -5;
		console.log(mesh.position)
		blocks.push(mesh);
		scene.add(mesh);
	}
}

// Adding Light
var light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(0,0,0);
scene.add(light);

var light = new THREE.PointLight(0xFFFFFF, 2, 500);
light.position.set(0,0,25);
scene.add(light);

let reverse = false;
function render() {
	requestAnimationFrame(render);
	// for (let i = 0; i < blocks.length; i++) {
	// 	let tl1 = new TimelineMax();
	// 	if(reverse) {
	// 		tl1.to(blocks[i].position, 1, {z: -1, ease: Expo.easeOut});
	// 		// blocks[i].position.z += Math.random()*0.1;
	// 	} else {
	// 		tl1.to(blocks[i].position, 1, {z: 1, ease: Expo.easeOut});
	// 		// blocks[i].position.z -= Math.random()*0.1;
	// 	}
	// 	// tl1.to(blocks[i].position, 1, {z: 0, ease: Expo.easeOut});
	// 	reverse = !reverse;
	// }
	renderer.render(scene, camera);
}

function onMouseMove(event) {
	event.preventDefault();
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
	raycaster.setFromCamera(mouse, camera);
	let intersects = raycaster.intersectObjects(scene.children, true);
	for(let i = 0; i < intersects.length; i++) {
		// intersects[i].object.material.color.set('#1ED760');
		let tl1 = new TimelineMax();
		tl1.to(intersects[i].object.scale, 1, {z: 5, ease: Expo.easeOut});
		tl1.to(intersects[i].object.scale, 1, {z: 1, ease: Expo.easeOut}, '=-.5');
		// tl1.to(intersects[i].object.position, .5, {x: intersects[i].object.position-1, ease: Expo.easeOut});
		// tl1.to(intersects[i].object.rotation, .5, {y: Math.PI*.5, ease: Expo.easeOut}, '=-1.5');
	}
}


window.addEventListener('mousemove', onMouseMove);
render();
