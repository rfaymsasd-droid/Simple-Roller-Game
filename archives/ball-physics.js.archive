const CONFIG = {
  MOVE_SPEED: 4,
  ACCEL: 0.35,
  GROUND_FRICTION: 0.96,
  AIR_FRICTION: 0.99,

  GRAVITY: 0.5,
  JUMP_POWER: 10,
  MAX_FALL: 11,

  BOUNCE: 0.5,
  BOUNCE_CUTOFF: 2.0,
  WALL_BOUNCE: 0.5,

  RADIUS: 10
};

function updateBallMovement(player, keys) {
  if (keys.left)  player.vx -= CONFIG.ACCEL;
  if (keys.right) player.vx += CONFIG.ACCEL;

  if (!keys.left && !keys.right){
    player.vx *= player.onGround ? CONFIG.GROUND_FRICTION : CONFIG.AIR_FRICTION;
    if (Math.abs(player.vx) < 0.05) player.vx = 0;

  if (player.vx >  CONFIG.MOVE_SPEED) player.vx =  CONFIG.MOVE_SPEED;
  if (player.vx < -CONFIG.MOVE_SPEED) player.vx = -CONFIG.MOVE_SPEED;

  player.spin = (player.spin || 0) + player.vx / CONFIG.RADIUS;
  }
}

function landOnFloor(player) {
  if (player.vy > CONFIG.BOUNCE_CUTOFF) {
    player.vy = -player.vy * CONFIG.BOUNCE;
  } else {
    player.vy = 0;
    player.onGround = true;
  }
}

function hitWall(player) {
  player.vx = -player.vx * CONFIG.WALL_BOUNCE;
}