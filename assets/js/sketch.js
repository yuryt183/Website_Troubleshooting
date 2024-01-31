let balls = [];
let bgImage; // Variable to store background image

function preload() {
  // Assuming the image is in the same directory as your sketch
  bgImage = loadImage('assets/img/background.jpeg'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create 20 balls
  for (let i = 0; i < 20; i++) {
    balls.push(new Ball());
  }
}

function draw() {
  // Draw the background image at position (0, 0) and resize it to the window's width and height
  image(bgImage, 0, 0, windowWidth, windowHeight);

  // Update and display balls
  balls.forEach(ball => {
    ball.update(mouseX, mouseY); // Pass the mouse position to each ball
    ball.display();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Ball {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.diameter = random(10, 50);
    this.color = [random(255), random(255), random(255), random(50, 150)]; // RGBA
  }

  // Update ball's position to follow the cursor
  update(targetX, targetY) {
    // Move towards the cursor using p5.Vector lerp
    let target = createVector(targetX, targetY);
    this.position.lerp(target, 0.05); // 0.05 is the amount of easing
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.diameter, this.diameter);
  }
}
