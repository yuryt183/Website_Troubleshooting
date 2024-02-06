document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'pongGame';
  canvas.width = 640;
  canvas.height = 480;
  document.getElementById('pong-game-container').appendChild(canvas);
  const ctx = canvas.getContext('2d');

  const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    velocityX: 5,
    velocityY: 5,
    speed: 7,
    color: 'WHITE'
  };

  const userPaddle = {
    x: 0, // left side of canvas
    y: (canvas.height - 100) / 2, // -100 the height of paddle
    width: 10,
    height: 100,
    color: 'WHITE',
    score: 0
  };

  const aiPaddle = {
    x: canvas.width - 10, // - width of paddle
    y: (canvas.height - 100) / 2, // -100 the height of paddle
    width: 10,
    height: 100,
    color: 'WHITE',
    score: 0
  };

  function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  }

  function drawArc(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }

  canvas.addEventListener('mousemove', (e) => {
    let rect = canvas.getBoundingClientRect();
    userPaddle.y = e.clientY - rect.top - userPaddle.height / 2;
  });

  function collisionDetect(paddle, ball) {
    paddle.top = paddle.y;
    paddle.bottom = paddle.y + paddle.height;
    paddle.left = paddle.x;
    paddle.right = paddle.x + paddle.width;

    ball.top = ball.y - ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;
    ball.right = ball.x + ball.radius;

    return ball.right > paddle.left && ball.top < paddle.bottom && ball.left < paddle.right && ball.bottom > paddle.top;
  }

  function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
  }

  function update() {
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
      ball.velocityY = -ball.velocityY;
    }

    if (ball.x < 0) {
      aiPaddle.score++;
      resetBall();
    } else if (ball.x > canvas.width) {
      userPaddle.score++;
      resetBall();
    }

    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    aiPaddle.y += ((ball.y - (aiPaddle.y + aiPaddle.height / 2))) * 0.1;

    let player = (ball.x < canvas.width / 2) ? userPaddle : aiPaddle;
    if (collisionDetect(player, ball)) {
      let collidePoint = (ball.y - (player.y + player.height / 2));
      collidePoint = collidePoint / (player.height / 2);

      let angleRad = (Math.PI / 4) * collidePoint;

      let direction = (ball.x < canvas.width / 2) ? 1 : -1;
      ball.velocityX = direction * ball.speed * Math.cos(angleRad);
      ball.velocityY = ball.speed * Math.sin(angleRad);
    }
  }

  function draw() {
    drawRect(0, 0, canvas.width, canvas.height, 'BLACK'); // Draw background
    drawRect(userPaddle.x, userPaddle.y, userPaddle.width, userPaddle.height, userPaddle.color);
    drawRect(aiPaddle.x, aiPaddle.y, aiPaddle.width, aiPaddle.height, aiPaddle.color);
    drawArc(ball.x, ball.y, ball.radius, ball.color);
  }

  function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
  }

  gameLoop(); // Start the game loop
});

