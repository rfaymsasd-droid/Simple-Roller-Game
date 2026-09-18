var Game = {
  mode: "playing",
  levelNumber: 0
};

Game.startLevel = function (levelNumber) {
  Game.levelNumber = levelNumber;
  Level.build(levelNumber);
  Player.reset();
  SpikeWall.reset();
  Game.mode = "playing";
  Game.showMessage("");
};

Game.showMessage = function (text) {
  document.getElementById("message").textContent = text;
};

Game.update = function () {
  if (Input.restart) {
    Game.startLevel(Game.levelNumber);
    return;
  }

  if (Game.mode !== "playing") {
    return;
  }

  Player.update();
  SpikeWall.update();

  if (Player.y > CONFIG.CANVAS_H + 200) {
    var previousLevel = Math.max(0, Game.levelNumber - 1);
    Game.startLevel(previousLevel);
    return;
  }

  if (Player.isDead()) {
    Game.mode = "dead";
    Game.showMessage("You hit something. Press R to try again.");
    return;
  }

  if (Player.hasWon()) {
    var nextLevel = Game.levelNumber + 1;
    if (nextLevel >= Level.levels.length) {
      nextLevel = 0;
    }
    Game.startLevel(nextLevel);
    return;
  }
};

Game.loop = function () {
  Game.update();
  Draw.updateCamera();
  Draw.everything();
  window.requestAnimationFrame(Game.loop);
};