const SAFE_PIECES   = ["flat", "flat", "flat"];
const HAZARD_PIECES = ["gap", "spikes"];

function isHazard(name) {
  return HAZARD_PIECES.indexOf(name) !== -1;
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function makeLevel(round) {
  const middleCount = Math.min(6 + round, 14);

  const hazardChance = Math.min(0.20 + round * 0.05, 0.55);

  const pieces = ["start"];
  let previous = "start";

  for (let i = 0; i < middleCount; i++) {
    let next;

    if (Math.random() < hazardChance) {
      next = pick(HAZARD_PIECES);
    } else {
      next = pick(SAFE_PIECES);
    }

    if (isHazard(next) && isHazard(previous)) {
      next = pick(SAFE_PIECES);
    }

    pieces.push(next);
    previous = next;
  }

  if (isHazard(previous)) {
    pieces.push(pick(SAFE_PIECES));
  }

  pieces.push("finish");

  return {
    name: "Level " + (round + 1),
    pieces: pieces
  };
}