const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const FPS = 6;
let oldTime = 0;
let newTime = 0;
let deltaTime = 0;
let left = false;
let right = false;
let up = false;
let down = false;

document.body.appendChild(canvas);

canvas.width = 750;
canvas.height = 750;
const snakeSize = 30;
const foodSize = snakeSize;
let snake = [
  canvas.width / 2 - snakeSize / 2,
  canvas.height / 2 - snakeSize / 2,
];
let tail = [];
let food = [];

document.addEventListener("keydown", (e) => {
  if (e.key === "e") {
    tail.push([0, 0]);
  }

  if (e.key === "d" && !left) {
    right = true;

    left = false;
    up = false;
    down = false;
  }
  if (e.key === "a" && !right) {
    left = true;

    right = false;
    up = false;
    down = false;
  }
  if (e.key === "w" && !down) {
    up = true;

    right = false;
    left = false;
    down = false;
  }
  if (e.key === "s" && !up) {
    down = true;

    right = false;
    up = false;
    left = false;
  }
});

function rand(min, max, step) {
  var delta, range, rand;
  if (arguments.length < 2) {
    max = min;
    min = 0;
  }
  if (!step) {
    step = 1;
  }
  delta = max - min;
  range = delta / step;
  rand = Math.random();
  rand *= range;
  rand = Math.floor(rand);
  rand *= step;
  rand += min;
  return rand;
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  oldTime = newTime;
  newTime = performance.now();
  deltaTime = newTime - oldTime;
  ctx.fillText("FPS: " + (1 / deltaTime) * 1000, 50, 50);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = tail.length - 1; i >= 0; i--) {
    if (tail[i][0] === snake[0] & tail[i][1] === snake[1]){
        return location.reload()
    }
  

    if (i === 0) {
      tail[i][0] = snake[0];
      tail[i][1] = snake[1];
    } else {
      tail[i][0] = tail[i - 1][0];
      tail[i][1] = tail[i - 1][1];
    }
    ctx.fillStyle = "white";
    ctx.fillRect(tail[i][0], tail[i][1], snakeSize, snakeSize);
  }

  if (right) {
    snake[0] += 30;
  }
  if (left) {
    snake[0] -= 30;
  }
  if (up) {
    snake[1] -= 30;
  }
  if (down) {
    snake[1] += 30;
  }

  if (snake[0] > canvas.width) {
    snake[0] = 0;
  }

  if (snake[0] < 0) {
    snake[0] = canvas.width;
  }

  if (snake[1] > canvas.height) {
    snake[1] = 0;
  }

  if (snake[1] < 0) {
    snake[1] = canvas.height;
  }

  ctx.fillStyle = "white";
  ctx.fillRect(snake[0], snake[1], snakeSize, snakeSize);




  if(food.length && snake[0]=== food[0] && snake[1]=== food[1]){
    food = []
    tail.push([])
  }

  if(!food.length){
    food[0] = rand(0, 750, 30);
    food[1] = rand(0, 750, 30);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food[0], food[1], foodSize, foodSize);
}

setInterval(gameLoop, 1000 / FPS);
