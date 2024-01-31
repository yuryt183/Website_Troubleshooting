let balls = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < 10; i++) {
        balls.push(new Ball());
    }
}

function draw() {
    background(255, 255, 255, 25); // Semi-transparent background (creates the trail effect)
    balls.forEach(ball => {
        ball.move();
        ball.display();
    });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Ball {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.diameter = random(10, 50);
        this.xSpeed = random(-2, 20);
        this.ySpeed = random(-2, 20);
        this.color = [random(255), random(255), random(255), random(50, 150)]; // RGBA
    }

    move() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.xSpeed *= -1;
        if (this.y < 0 || this.y > height) this.ySpeed *= -1;
    }

    display() {
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, this.diameter, this.diameter);
    }
}
