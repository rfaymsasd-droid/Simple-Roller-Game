var Game = {
  mode: "playing",
  levelNumber: 0
};

Game.startLevel = function (levelNumber) {
  Game.levelNumber = levelNumber;
  Level.build(levelNumber);
  Player.reset();
  Game.mode = "playing";
  Game.showMessage("");
};

Game.showMessage = function (text) {
  document.getElementById("message").textContent = text;
};

Game.update = function () {

  if (Input.nextLevel) {
    Input.nextLevel = false;

    if (Game.levelNumber < Level.levels.length - 1) {
      Game.startLevel(Game.levelNumber + 1);
    }

    return;
  }

  if (Input.previousLevel) {
    Input.previousLevel = false;

    if (Game.levelNumber > 0) {
      Game.startLevel(Game.levelNumber - 1);
    }

    return;
  }

  if (Input.restart) {
    Game.startLevel(Game.levelNumber);
    return;
  }

  if (Game.mode !== "playing") {
    return;
  }

  Player.update();

  if (Player.isDead()) {
    Game.mode = "dead";
    Game.showMessage("You hit something. Press R to try again.");
    return;
  }

  if (Player.hasWon()) {
    Game.mode = "won";
    Game.showMessage("You made it. Press R to play the next level.");
    return;
  }
};

Game.loop = function () {
  Game.update();
  Draw.updateCamera();
  Draw.everything();
  window.requestAnimationFrame(Game.loop);
};