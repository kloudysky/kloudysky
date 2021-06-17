// Import all plugins
import * as bootstrap from "bootstrap";

// Particle Three js

import * as THREE from "three";

// Texture Loader
const loader = new THREE.TextureLoader();
const crossParticle = loader.load("./assets/particle.png");

// Canvas
const canvas = document.querySelector("#bg");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 70000;

const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * (Math.random() * 7);
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(posArray, 3)
);

// Materials

const material = new THREE.PointsMaterial({ size: 0.01, color: "grey" });

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.002,
  transparent: true,
  color: "grey",
});

// Mesh
const sphere = new THREE.Points(geometry, material);
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(sphere, particlesMesh);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(new THREE.Color("#ed944d"), 1);

//Mouse
const animateParticles = (event) => {
  mouseY = event.clientY;
  mouseX = event.clientX;
};

document.addEventListener("mousemove", animateParticles);

let mouseX = 0;
let mouseY = 0;

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;
  sphere.rotation.x = 0.5 * elapsedTime;
  sphere.rotation.z = 0.5 * elapsedTime;
  particlesMesh.rotation.y = 0.008 * elapsedTime;
  particlesMesh.rotation.x = -0.01 * elapsedTime;
  particlesMesh.rotation.z = -0.006 * elapsedTime;

  if (mouseX > 0) {
    particlesMesh.rotation.x = -mouseY * (elapsedTime * 0.000004);
    particlesMesh.rotation.y = -mouseX * (elapsedTime * 0.000004);
  }

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

//fade in on scroll
$(window).on("load", function () {
  /* Every time the window is scrolled ... */
  $(window).on("scroll", function () {
    /* Check the location of each desired element */
    $(".hideme").each(function (i) {
      const bottom_of_object =
        $(this).position().top + $(this).outerHeight() / 2.5;
      const bottom_of_window = $(window).scrollTop() + $(window).height();

      /* If the object is completely visible in the window, fade it it */
      if (bottom_of_window > bottom_of_object) {
        $(this).animate({ opacity: "1" }, 300);
      }
    });
  });
});
