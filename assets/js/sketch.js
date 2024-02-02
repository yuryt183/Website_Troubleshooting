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

  // Draw Paddle
  function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  }

  // Draw Ball
  function drawArc(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
  }

  // Control user paddle
  canvas.addEventListener('mousemove', (e) => {
    let rect = canvas.getBoundingClientRect();
    userPaddle.y = e.clientY - rect.top - userPaddle.height / 2;
  });

  // Reset ball to center after scoring
  function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
  }

  // Update function, to update objects positions
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

    // AI to control the aiPaddle (very simple AI)
    aiPaddle.y += ((ball.y - (aiPaddle.y + aiPaddle.height / 2))) * 0.1;

    // Collision detection on paddles
    let player = (ball.x < canvas.width / 2) ? userPaddle : aiPaddle;
    if (collisionDetect(player, ball)) {
      let collidePoint = (ball.y - (player.y + player.height / 2));
      collidePoint = collidePoint / (player.height / 2);

      let angleRad = (Math.PI / 4) * collidePoint;

      let direction = (ball.x < canvas.width / 2) ? 1 : -1;
      ball.velocityX = direction * ball.speed * Math.cos(angleRad);
     
