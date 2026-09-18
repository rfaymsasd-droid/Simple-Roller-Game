var CONFIG = {

  TILE: 40,
  ROWS: 10,
  PIECE_COLS: 8,

  CANVAS_W: 800,
  CANVAS_H: 400,

  // Tuned for steady, responsive movement without making the player fly
  // across the level or jump so high that platforms are easy to skip.
  MOVE_SPEED: 4,
  GRAVITY: 0.65,
  JUMP_POWER: 11,
  MAX_FALL: 12,

  PLAYER_SIZE: 32,
  PLAYER_RADIUS: 16,

  LINE_WIDTH: 3,
  DOT_DISTANCE: 0.55,

  // The moving spike wall is intentionally slower than a rolling player.
  SPIKE_WALL_WIDTH: 48,
  SPIKE_WALL_SPEED: 3.2,

  START_LEVEL: 0
};
