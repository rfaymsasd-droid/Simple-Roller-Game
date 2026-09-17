var SpikeWall = {
  x: 0,
  width: 0,
  active: false
};

SpikeWall.reset = function () {
  SpikeWall.width = CONFIG.SPIKE_WALL_WIDTH;
  SpikeWall.x = Level.startX - SpikeWall.width - CONFIG.TILE * 4;
  SpikeWall.active = false;
};

SpikeWall.update = function () {
  if (Player.vx !== 0) {
    SpikeWall.active = true;
  }

  if (SpikeWall.active) {
    SpikeWall.x += CONFIG.SPIKE_WALL_SPEED;
  }
};

SpikeWall.hitsPlayer = function () {
  if (!SpikeWall.active) { return false; }

  var playerRight = Player.x + CONFIG.PLAYER_SIZE;
  var wallRight = SpikeWall.x + SpikeWall.width;
  return Player.x < wallRight && playerRight > SpikeWall.x;
};

SpikeWall.draw = function () {
  if (!SpikeWall.active) { return; }

  var ctx = Draw.ctx;
  var top = 0;
  var bottom = CONFIG.CANVAS_H;

  ctx.fillStyle = "#2d89d0";
  ctx.fillRect(SpikeWall.x, top, SpikeWall.width, bottom);

  ctx.fillStyle = "#2d89d0";
  for (var y = 8; y < bottom; y += 32) {
    ctx.beginPath();
    ctx.moveTo(SpikeWall.x + SpikeWall.width, y);
    ctx.lineTo(SpikeWall.x + SpikeWall.width + 18, y + 16);
    ctx.lineTo(SpikeWall.x + SpikeWall.width, y + 32);
    ctx.closePath();
    ctx.fill();
  }
};
