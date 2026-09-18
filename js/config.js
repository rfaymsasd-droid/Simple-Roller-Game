var CONFIG = {

  TILE: 40,
  ROWS: 10,
  PIECE_COLS: 8,

  CANVAS_W: 800,
  CANVAS_H: 400,

  // Tuned for responsive movement while keeping jumps controllable.
  MOVE_SPEED: 4.5,
  GRAVITY: 0.65,
  // A jump of about three blocks (120 pixels) at this gravity.
  JUMP_POWER: 13,
  MAX_FALL: 12,

  PLAYER_SIZE: 32,
  PLAYER_RADIUS: 16,

  LINE_WIDTH: 3,
  DOT_DISTANCE: 0.55,

  // Slightly slower than the player so movement stays manageable.
  SPIKE_WALL_WIDTH: 48,
  SPIKE_WALL_SPEED: 2.8,

  START_LEVEL: 0
};
