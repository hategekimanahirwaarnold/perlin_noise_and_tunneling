
import { noise } from '@chriscourses/perlin-noise'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

let { cos, sin, PI, abs } = Math
let center = {
  x: canvas.width / 2,
  y: canvas.height / 2
}
// Event Listeners
addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})


addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
  init()
})

// Objects
class Particle {
  constructor(x, y, radius, color, angle, distance) {
    this.x = x 
    this.y = y 
    this.radius = radius
    this.color = color
    this.dx = cos(angle);
    this.dy = sin(angle);
    this.distance = distance;
    this.timeToLeave = 1000;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
    this.x += this.dx;
    this.y += this.dy;
    this.timeToLeave--;
  }

}

// Implementation
let particles;
let hueAngle = Math.random();
let hueSpeed = 0.0003;
let time = 0;
function newParticles() { 
  let particlesCount = 60;
  for (let i = 0; i < particlesCount; i++) {
    let angle = (2 * PI / particlesCount) * i
    let color = `hsl(${360 * abs(sin(hueAngle))}, 50%, 50%)`;
    let y = noise(time + 20) * canvas.height;
    let x = noise(time) * canvas.width;
    // console.log("x: ", x, "y: ", y);
    particles.push(new Particle(x, y, 3, color, angle, i / 100))
    hueAngle += hueSpeed;
    time += 0.0002;
  }
}

function init() {
  particles = [];
  newParticles();
}

function makeParticles() {
  setTimeout(makeParticles, 200);
  newParticles();
}
// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'rgba(0, 0, 0, 0.3)'
  c.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, i) => {
    if (particle.timeToLeave > 0) {
      particle.update();
    }
    else
      particles.splice(i, 1);
 })
}

init()
animate()
makeParticles()