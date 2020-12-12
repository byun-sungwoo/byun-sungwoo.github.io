import React, { Component } from 'react';

import * as THREE from 'three';
import { Expo, TimelineMax } from "gsap";

// props.action is "flip", "push", "pull"
export default class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			color: props.color !== undefined && props.color !== null ? props.color : '#0f1011',
			action: props.action !== undefined && props.action !== null ? props.action : 'flip'
		}
		console.log(this.state);
	}

	componentDidMount() {
		const color = this.state.color;
		const action = this.state.action;
		console.log(action, color)

		// Setup
		const width = this.mount.clientWidth;
		const height = this.mount.clientHeight;
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera(
			75,
			width/height,
			0.1,
			1000
		);
		camera.position.z = 5;
		var renderer = new THREE.WebGLRenderer({antialias: true});
		renderer.setClearColor(this.state.color);
		renderer.setSize(width, height);

		this.mount.appendChild(renderer.domElement);

		function onWindowResize() {
			renderer.setSize(width, height);
			camera.aspect = width/height;
			camera.updateProjectionMatrix();
		}

		window.addEventListener('resize', onWindowResize)

		let blocks = [];
		let raycaster = new THREE.Raycaster();
		let mouse = new THREE.Vector2();

		// Adding Cube
		let geometry = new THREE.BoxGeometry(1, 1, 1);
		for (let i = -20; i <= 20; i++) {
			let material;
			let mesh;
			for (let j = -10; j <= 10; j++) {
				material = new THREE.MeshLambertMaterial({color: color});
				mesh = new THREE.Mesh(geometry, material);
				mesh.position.y = j*1;
				mesh.position.x = i*1;
				mesh.position.z = -5;
				blocks.push(mesh);
				scene.add(mesh);
			}
		}

		// Adding Light
		let light = new THREE.PointLight(0xFFFFFF, 1, 500);
		light.position.set(0,0,0);
		scene.add(light);

		light = new THREE.PointLight(0xFFFFFF, 2, 500);
		light.position.set(0,0,25);
		scene.add(light);

		function drawScene() {
			requestAnimationFrame(drawScene);
			renderer.render(scene, camera);
		}

		function onMouseMove(event) {
			event.preventDefault();
			mouse.x = (event.clientX / width) * 2 - 1;
			mouse.y = - (event.clientY / height) * 2 + 1;
			raycaster.setFromCamera(mouse, camera);
			let intersects = raycaster.intersectObjects(scene.children, true);
			for(let i = 0; i < intersects.length; i++) {
				// intersects[i].object.material.color.set('#1ED760');
				let tl1 = new TimelineMax();
				if(action !== undefined && action !== null && action === 'pull') {
					tl1.to(intersects[i].object.position, 1, {z: -4.5, ease: Expo.easeOut});
					tl1.to(intersects[i].object.position, 1, {z: -5, ease: Expo.easeOut});
				} else if(action !== undefined && action !== null && action === 'push') {
					tl1.to(intersects[i].object.position, 1, {z: -5.5, ease: Expo.easeOut});
					tl1.to(intersects[i].object.position, 1, {z: -5, ease: Expo.easeOut});
				} else {
					tl1.to(intersects[i].object.rotation, 1.5, {y: Math.PI*.5, ease: Expo.easeOut});
					// tl1.to(intersects[i].object.rotation, 1, {x: Math.PI*.5, ease: Expo.easeOut}, '=-.1');
					tl1.to(intersects[i].object.rotation, 0, {y: 0, ease: Expo.easeOut});
					// tl1.to(intersects[i].object.rotation, 0, {x: 0, ease: Expo.easeOut});
				}
				// tl1.to(intersects[i].object.position, .5, {x: intersects[i].object.position-, ease: Expo.easeOut});
			}
		}
		window.addEventListener('mousemove', onMouseMove);
		drawScene();
	}

	render() {
		return (
			<div
				style={{
					// width: "200px",
					// height: "200px",
					margin: '0',
					height: '100vh'
				}}
				ref={mount => { this.mount = mount}}
			/>
		)
	}
}