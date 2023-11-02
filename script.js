const yaLogoCanvas = document.getElementById('canvas');
const ctx = yaLogoCanvas.getContext('2d');

const VERTICAL_LINE_LENGTH = 150;
const HORIZONTAL_LINE_LENGTH = 100;
const GAP = 22;
const LINE_WIDTH = 16;
const LINE_WIDTH_HALF = LINE_WIDTH / 2;

const LOGO_WIDTH = 176;
const LOGO_HEIGHT = 188;

const DELTA = 25;

const yaLogoState = {
  x: 112,
  y: 106,
  pressedKeys: {
    ArrowLeft: false,
    ArrowUp: false,
    ArrowRight: false,
    ArrowDown: false,
  },
};

function drawLogoByLines(position) {
  ctx.save();

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = LINE_WIDTH;

  ctx.beginPath();
  ctx.moveTo(position.x + LINE_WIDTH + GAP, position.y + LINE_WIDTH_HALF);
  ctx.lineTo(position.x + LINE_WIDTH + GAP + HORIZONTAL_LINE_LENGTH, position.y + LINE_WIDTH_HALF);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(position.x + LINE_WIDTH_HALF, position.y + LINE_WIDTH + GAP);
  ctx.lineTo(position.x + LINE_WIDTH_HALF, position.y + LINE_WIDTH + GAP + VERTICAL_LINE_LENGTH);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(position.x + LOGO_WIDTH - LINE_WIDTH_HALF, position.y + LINE_WIDTH + GAP);
  ctx.lineTo(position.x + LOGO_WIDTH - LINE_WIDTH_HALF, position.y + LINE_WIDTH + GAP + VERTICAL_LINE_LENGTH);
  ctx.stroke();

  ctx.restore();
}

function wrapedDraw(drawingCallback) {
  const logoOrigins = [yaLogoState];

  if (yaLogoState.x - LINE_WIDTH_HALF <= 0) {
    logoOrigins.push({ x: yaLogoCanvas.width + yaLogoState.x, y: yaLogoState.y });
  } else if (yaLogoState.x + LINE_WIDTH_HALF + LOGO_WIDTH >= yaLogoCanvas.width) {
    logoOrigins.push({ x: yaLogoState.x - yaLogoCanvas.width, y: yaLogoState.y });
  }

  if (yaLogoState.y - LINE_WIDTH_HALF <= 0) {
    logoOrigins.push(...logoOrigins.map(origin => ({ x: origin.x, y: yaLogoCanvas.height + origin.y })));
  } else if (yaLogoState.y + LINE_WIDTH_HALF + LOGO_HEIGHT >= yaLogoCanvas.height) {
    logoOrigins.push(...logoOrigins.map(origin => ({ x: origin.x, y: origin.y - yaLogoCanvas.height })));
  }

  logoOrigins.map(origin => drawingCallback(origin));
}

function update() {
  pressedKeysHandler();

  correctBoundaries();

  // if (
  //   yaLogoState.pressedKeys.ArrowLeft &&
  //   yaLogoState.pressedKeys.ArrowRight &&
  //   yaLogoState.pressedKeys.ArrowUp &&
  //   yaLogoState.pressedKeys.ArrowDown
  // ) {
  //   console.log('отпути');
  // }
}

function keyboardHandler(event) {
  if (Object.keys(yaLogoState.pressedKeys).includes(event.code)) {
    yaLogoState.pressedKeys[event.code] = event.type === 'keydown' ? true : false;

    console.log('yaLogoState:', yaLogoState);
  }
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

  ctx.save();

  ctx.fillStyle = '#000000';

  ctx.fillRect(0, 0, yaLogoCanvas.width, yaLogoCanvas.height);

  ctx.restore();

  update();

  wrapedDraw(drawLogoByLines);

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
