class Ball {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.speed = random(0.5, 5); // Assign a random speed to each ball
    this.diameter = random(10, 50);
    this.radius = this.diameter / 2;
    this.color = [random(255), random(255), random(255), random(50, 150)];
  }

  update() {
    // Add randomness to the movement
    if (random(1) < 0.05) { // 5% chance to change direction
      this.velocity.add(p5.Vector.random2D());
    }
    this.velocity.setMag(this.speed); // Set the magnitude of velocity to the ball's speed

    this.position.add(this.velocity);

    // Bounce off walls
    if (this.position.x - this.radius < 0 || this.position.x + this.radius > width) {
      this.velocity.x *= -1;
    }
    if (this.position.y - this.radius < 0 || this.position.y + this.radius > height) {
      this.velocity.y *= -1;
    }

    // Check for collision with other balls
    for (let other of balls) {
      if (other !== this && this.isColliding(other)) {
        this.handleCollision(other);
      }
    }
  }

  isColliding(other) {
    let distance = p5.Vector.dist(this.position, other.position);
    return distance < this.radius + other.radius;
  }

  handleCollision(other) {
    // Exchange velocities
    let temp = this.velocity.copy();
    this.velocity = other.velocity.copy();
    other.velocity = temp;

    // Adjust positions to avoid overlap
    let overlap = (this.radius + other.radius) - p5.Vector.dist(this.position, other.position);
    let adjustment = p5.Vector.sub(this.position, other.position).normalize().mult(overlap / 2);
    this.position.add(adjustment);
    other.position.sub(adjustment);
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.diameter, this.diameter);
  }
}

// Rest of your setup and draw functions remain the same


