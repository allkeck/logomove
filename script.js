const yaLogoCanvas = document.getElementById('yaLogo');
const ctx = yaLogoCanvas.getContext('2d');

const RECT_WIDTH = 16;
const GAP = 22;
const LOGO_WIDTH = 176;
const LOGO_HEIGHT = 188;
const DELTA = 25;

const yaLogoState = {
  x: yaLogoCanvas.width / 2,
  y: yaLogoCanvas.height / 2,
  pressedKeys: {
    ArrowLeft: false,
    ArrowUp: false,
    ArrowRight: false,
    ArrowDown: false,
  },
};

function logoDraw(center) {
  // ctx.save();

  ctx.fillStyle = '#ffffff';

  ctx.fillRect(center.x - LOGO_WIDTH / 2 + RECT_WIDTH + GAP, center.y - LOGO_HEIGHT / 2, 100, RECT_WIDTH);
  ctx.fillRect(center.x - LOGO_WIDTH / 2, RECT_WIDTH + GAP + center.y - LOGO_HEIGHT / 2, RECT_WIDTH, 150);
  ctx.fillRect(center.x - LOGO_WIDTH / 2 + 160, RECT_WIDTH + GAP + center.y - LOGO_HEIGHT / 2, RECT_WIDTH, 150);

  // ctx.restore();
}

function isWrapedDraw(drawingCallback) {
  drawingCallback(yaLogoState);

  if (yaLogoState.x - LOGO_WIDTH / 2 <= 0) {
    drawingCallback({ x: yaLogoCanvas.width + yaLogoState.x, y: yaLogoState.y });
  }

  if (yaLogoState.x + LOGO_WIDTH / 2 >= yaLogoCanvas.width) {
    drawingCallback({ x: yaLogoState.x - yaLogoCanvas.width, y: yaLogoState.y });
  }

  if (yaLogoState.y - LOGO_WIDTH / 2 <= 0) {
    drawingCallback({ x: yaLogoState.x, y: yaLogoCanvas.height + yaLogoState.y });
  }

  if (yaLogoState.y + LOGO_WIDTH / 2 >= yaLogoCanvas.height) {
    drawingCallback({ x: yaLogoState.x, y: yaLogoState.y - yaLogoCanvas.height });
  }
}

function update() {
  // if (yaLogoState.x + LOGO_WIDTH / 2 >= yaLogoCanvas.width) {
  //   deltaX = -2;
  // } else if (yaLogoState.x - LOGO_WIDTH / 2 <= 0) {
  //   deltaX = 2;
  // }

  // yaLogoState.x += deltaX;

  pressedKeysHandler();

  correctBoundaries();

  if (
    yaLogoState.pressedKeys.ArrowLeft &&
    yaLogoState.pressedKeys.ArrowRight &&
    yaLogoState.pressedKeys.ArrowUp &&
    yaLogoState.pressedKeys.ArrowDown
  ) {
    console.log('loh');
  }
}

function keyboardHandler(event) {
  yaLogoState.pressedKeys[event.code] = event.type === 'keydown' ? true : false;

  console.log(yaLogoState);
}

window.addEventListener('keydown', keyboardHandler, false);
window.addEventListener('keyup', keyboardHandler, false);

function pressedKeysHandler() {
  if (yaLogoState.pressedKeys.ArrowLeft) {
    yaLogoState.x -= DELTA;
  }
  if (yaLogoState.pressedKeys.ArrowRight) {
    yaLogoState.x += DELTA;
  }
  if (yaLogoState.pressedKeys.ArrowUp) {
    yaLogoState.y -= DELTA;
  }
  if (yaLogoState.pressedKeys.ArrowDown) {
    yaLogoState.y += DELTA;
  }
}

function correctBoundaries() {
  if (yaLogoState.x < 0) {
    yaLogoState.x += yaLogoCanvas.width;
  }
  if (yaLogoState.x > yaLogoCanvas.width) {
    yaLogoState.x -= yaLogoCanvas.width;
  }
  if (yaLogoState.y < 0) {
    yaLogoState.y += yaLogoCanvas.height;
  }
  if (yaLogoState.y > yaLogoCanvas.height) {
    yaLogoState.y -= yaLogoCanvas.height;
  }
}

function animate() {
  ctx.clearRect(0, 0, yaLogoCanvas.width, yaLogoCanvas.height);

  isWrapedDraw(logoDraw);

  update();

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
