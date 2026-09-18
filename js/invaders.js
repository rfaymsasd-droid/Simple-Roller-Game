var Invaders = {
  enemies: [],
  bullets: [],
  shotTimer: 0,
  shooting: false
};

Invaders.reset = function () {
  Invaders.enemies = [];
  Invaders.bullets = [];
  Invaders.shotTimer = 0;
  Invaders.shooting = false;

  var spacing = CONFIG.TILE * 2;
  var formationWidth = (CONFIG.INVADERS_PER_ROW - 1) * spacing + CONFIG.INVADER_SIZE;
  var startOffset = -formationWidth / 2;

  for (var row = 0; row < CONFIG.INVADER_ROWS; row++) {
    for (var col = 0; col < CONFIG.INVADERS_PER_ROW; col++) {
      Invaders.enemies.push({
        offsetX: startOffset + col * spacing,
        x: 0,
        y: 18 + row * (CONFIG.INVADER_SIZE + 8),
        alive: true
      });
    }
  }

  Invaders.followPlayer();
};

Invaders.followPlayer = function () {
  var formationWidth = (CONFIG.INVADERS_PER_ROW - 1) * CONFIG.TILE * 2 + CONFIG.INVADER_SIZE;
  var centerX = Player.x + CONFIG.PLAYER_SIZE / 2;
  var left = centerX - formationWidth / 2;
  var maxLeft = Math.max(0, Level.pixelWidth() - formationWidth);

  if (left < 0) { left = 0; }
  if (left > maxLeft) { left = maxLeft; }

  for (var i = 0; i < Invaders.enemies.length; i++) {
    var enemy = Invaders.enemies[i];
    enemy.x = left + formationWidth / 2 + enemy.offsetX - CONFIG.INVADER_SIZE / 2;
    // Keep the formation at the top of the canvas above the player.
    enemy.y = 18 + Math.floor(i / CONFIG.INVADERS_PER_ROW) * (CONFIG.INVADER_SIZE + 8);
  }
};

Invaders.update = function () {
  Invaders.followPlayer();

  // Invaders remain quiet until the player actually starts rolling.
  // Existing bullets continue moving, so the player can still dodge them.
  if (Player.vx !== 0) {
    Invaders.shooting = true;
    Invaders.shotTimer++;
    if (Invaders.shotTimer >= CONFIG.INVADER_SHOT_INTERVAL) {
      Invaders.shotTimer = 0;
      Invaders.shootAtPlayer();
    }
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
