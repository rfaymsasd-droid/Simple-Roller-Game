var Invaders = {
  enemies: [],
  bullets: [],
  direction: 1,
  shotTimer: 0
};

Invaders.reset = function () {
  Invaders.enemies = [];
  Invaders.bullets = [];
  Invaders.direction = 1;
  Invaders.shotTimer = 0;

  // Keep the invaders in the upper part of the world so the player can see
  // and dodge their shots while moving along the level.
  var spacing = CONFIG.TILE * 3;
  var startX = CONFIG.TILE * 5;
  for (var row = 0; row < CONFIG.INVADER_ROWS; row++) {
    for (var col = 0; col < CONFIG.INVADERS_PER_ROW; col++) {
      Invaders.enemies.push({
        x: startX + col * spacing,
        y: CONFIG.TILE + row * CONFIG.TILE,
        alive: true
      });
    }
  }
};

Invaders.update = function () {
  var left = Infinity;
  var right = -Infinity;
  var aliveCount = 0;

  for (var i = 0; i < Invaders.enemies.length; i++) {
    var enemy = Invaders.enemies[i];
    if (!enemy.alive) { continue; }
    enemy.x += CONFIG.INVADER_SPEED * Invaders.direction;
    left = Math.min(left, enemy.x);
    right = Math.max(right, enemy.x + CONFIG.INVADER_SIZE);
    aliveCount++;
  }

  if (aliveCount > 0) {
    if (left < 0 || right > Level.pixelWidth()) {
      Invaders.direction *= -1;
      for (var j = 0; j < Invaders.enemies.length; j++) {
        if (Invaders.enemies[j].alive) {
          Invaders.enemies[j].x += CONFIG.INVADER_SPEED * Invaders.direction * 2;
        }
      }
    }
  }

  Invaders.shotTimer++;
  if (Invaders.shotTimer >= CONFIG.INVADER_SHOT_INTERVAL) {
    Invaders.shotTimer = 0;
    Invaders.shootAtPlayer();
  }

  for (var b = Invaders.bullets.length - 1; b >= 0; b--) {
    var bullet = Invaders.bullets[b];
    bullet.x += bullet.vx;
    bullet.y += bullet.vy;

    if (bullet.y < -CONFIG.TILE || bullet.y > CONFIG.CANVAS_H + CONFIG.TILE ||
        bullet.x < 0 || bullet.x > Level.pixelWidth()) {
      Invaders.bullets.splice(b, 1);
      continue;
    }

    var col = Math.floor(bullet.x / CONFIG.TILE);
    var row = Math.floor(bullet.y / CONFIG.TILE);
    if (Level.isSolid(col, row)) {
      Level.destroyBlock(col, row);
      Invaders.bullets.splice(b, 1);
      continue;
    }
  }
};

Invaders.shootAtPlayer = function () {
  var shooter = null;
  var bestDistance = Infinity;
  for (var i = 0; i < Invaders.enemies.length; i++) {
    var enemy = Invaders.enemies[i];
    if (!enemy.alive) { continue; }
    var distance = Math.abs(enemy.x - Player.x);
    if (distance < bestDistance) {
      bestDistance = distance;
      shooter = enemy;
    }
  }
  if (!shooter) { return; }

  var startX = shooter.x + CONFIG.INVADER_SIZE / 2;
  var startY = shooter.y + CONFIG.INVADER_SIZE;
  var targetX = Player.x + CONFIG.PLAYER_SIZE / 2;
  var targetY = Player.y + CONFIG.PLAYER_SIZE / 2;
  var dx = targetX - startX;
  var dy = targetY - startY;
  var length = Math.sqrt(dx * dx + dy * dy) || 1;

  Invaders.bullets.push({
    x: startX,
    y: startY,
    vx: dx / length * CONFIG.INVADER_SHOT_SPEED,
    vy: dy / length * CONFIG.INVADER_SHOT_SPEED
  });
};

Invaders.hitsPlayer = function () {
  var left = Player.x;
  var right = Player.x + CONFIG.PLAYER_SIZE;
  var top = Player.y;
  var bottom = Player.y + CONFIG.PLAYER_SIZE;

  for (var i = 0; i < Invaders.bullets.length; i++) {
    var bullet = Invaders.bullets[i];
    if (bullet.x >= left && bullet.x <= right &&
        bullet.y >= top && bullet.y <= bottom) {
      return true;
    }
  }
  return false;
};

Invaders.draw = function () {
  var ctx = Draw.ctx;
  for (var i = 0; i < Invaders.enemies.length; i++) {
    var enemy = Invaders.enemies[i];
    if (!enemy.alive) { continue; }

    ctx.fillStyle = "#7fe7ff";
    ctx.fillRect(enemy.x + 4, enemy.y + 6, 16, 12);
    ctx.fillRect(enemy.x, enemy.y + 10, 24, 8);
    ctx.fillRect(enemy.x + 7, enemy.y + 18, 4, 6);
    ctx.fillRect(enemy.x + 13, enemy.y + 18, 4, 6);
    ctx.fillStyle = "#03070a";
    ctx.fillRect(enemy.x + 7, enemy.y + 10, 3, 3);
    ctx.fillRect(enemy.x + 14, enemy.y + 10, 3, 3);
  }

  ctx.fillStyle = "#ffdd55";
  for (var j = 0; j < Invaders.bullets.length; j++) {
    var bullet = Invaders.bullets[j];
    ctx.fillRect(bullet.x - 2, bullet.y - 4, 4, 8);
  }
};
