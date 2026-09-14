Draw.setup();

Level.loadData(function () {
  Game.startLevel(CONFIG.START_LEVEL);
  Game.loop();
});
