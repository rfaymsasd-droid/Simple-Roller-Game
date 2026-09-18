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

  if (Player.isDead()) {
    Game.mode = "dead";
    Game.showMessage("You hit something. Press R to try again.");
    return;
  }

  if (Player.hasWon()) {
    var nextLevel = Game.levelNumber + 1;

    if (nextLevel < Level.levels.length) {
      Game.startLevel(nextLevel);
    } else {
      Game.mode = "won";
      Game.showMessage("You completed every level!");
    }
    return;
  }
};

Game.loop = function () {
  Game.update();
  Draw.updateCamera();
  Draw.everything();
  window.requestAnimationFrame(Game.loop);
};
