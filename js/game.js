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

  if (Input.restart) {
    Game.startLevel(Game.levelNumber);
    return;
  }

  if (Game.mode !== "playing") { return; }

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

Endless.next(); = function () {
    Game.update();
    Draw.updateCamera();
    Draw.everything();
    window.requestAnimationFrame(Endless.next());
};