var Level = {
  pieces: null,
  levels: null,
  grid: [],
  cols: 0,
  name: "",
  startX: 0,
  startY: 0
};

Level.loadData = function (whenDone) {
  function loadJson(path) {
    return fetch(path, { cache: "no-store" }).then(function (response) {
      if (!response.ok) {
        throw new Error(path + " returned HTTP " + response.status);
      }
      return response.json();
    });
  }

  loadJson("./data/pieces.json")
    .then(function (piecesFile) {
      Level.pieces = piecesFile;
      return loadJson("./data/levels.json");
    })
    .then(function (levelsFile) {
      if (!levelsFile || !Array.isArray(levelsFile.levels)) {
        throw new Error("data/levels.json does not contain a levels array");
      }
      Level.levels = levelsFile.levels;
      whenDone();
    })
    .catch(function (error) {
      var message = document.getElementById("message");
      message.textContent = "Could not load the level files. " + error.message;
      console.error("Level loading failed:", error);
    });
};

Level.build = function (levelNumber) {
  var level = Level.levels[levelNumber];
  Level.name = level.name;
  Level.grid = [];
  Level.cols = level.pieces.length * CONFIG.PIECE_COLS;

  for (var row = 0; row < CONFIG.ROWS; row++) {
    Level.grid.push("");
  }

  for (var p = 0; p < level.pieces.length; p++) {
    var pieceName = level.pieces[p];
    var piece = Level.pieces[pieceName];

    if (!piece) {
      console.error("No piece named '" + pieceName + "' in data/pieces.json");
      piece = Level.pieces["flat"];
    }

    for (var row = 0; row < CONFIG.ROWS; row++) {
      Level.grid[row] = Level.grid[row] + piece[row];
    }
  }

  Level.findStart();
};

Level.findStart = function () {
  for (var row = 0; row < CONFIG.ROWS; row++) {
    for (var col = 0; col < Level.cols; col++) {
      if (Level.charAt(col, row) === "S") {
        Level.startX = col * CONFIG.TILE;
        Level.startY = row * CONFIG.TILE;
        return;
      }
    }
  }
  Level.startX = 0;
  Level.startY = 0;
};

Level.charAt = function (col, row) {
  if (row < 0 || row >= CONFIG.ROWS) { return "."; }
  if (col < 0 || col >= Level.cols)  { return "."; }
  return Level.grid[row].charAt(col);
};

Level.isSolid  = function (col, row) { return Level.charAt(col, row) === "#"; };
Level.isSpike  = function (col, row) { return Level.charAt(col, row) === "^"; };
Level.isFinish = function (col, row) { return Level.charAt(col, row) === "F"; };

Level.pixelWidth = function () { return Level.cols * CONFIG.TILE; };
