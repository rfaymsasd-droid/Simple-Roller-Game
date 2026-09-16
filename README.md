# ROLLER - the base game

A circle with an off-center dot rolls through a black and white world.
It can move, jump, land on platforms, and die on spikes. It wins by
touching the flag.

That is the whole game. Everything else is yours to add.

## How to play it

Push your changes, then open your GitHub Pages link.
Press `Ctrl + Shift + R` to hard refresh, or you will see the old version.

- LEFT / RIGHT arrow - roll
- SPACE or UP arrow - jump
- R - restart the level

## Where everything lives

| If you want to change... | Open this file |
|---|---|
| how high it jumps, how fast it moves, how heavy gravity feels | `js/config.js` |
| which keys do what | `js/input.js` |
| the shape of the levels | `data/levels.json` |
| the level pieces themselves | `data/pieces.json` |
| how the world is built out of pieces | `js/level.js` |
| whether something counts as a hit | `js/collide.js` |
| how the player moves, jumps, and dies | `js/player.js` |
| how anything LOOKS | `js/draw.js` |
| the rules, the win and lose conditions, the loop | `js/game.js` |
| the page around the game | `index.html` and `style.css` |

## How levels work

A level is a list of piece names, in order, left to right.
Open `data/levels.json` and you will see something like this:

    "pieces": ["start", "flat", "gap", "flat", "spikes", "finish"]

Every one of those names is a little picture in `data/pieces.json`.
Each picture is 8 columns wide and 10 rows tall:

    "gap": [
      "........",
      "........",
      "........",
      "........",
      "........",
      "........",
      "........",
      "........",
      "###..###",
      "###..###"
    ]

- `.` is empty air
- `#` is a solid block
- `^` is a spike
- `S` is where the player starts
- `F` is the finish

To make a new level: change the list of names.
To make a new piece: copy one, rename it, redraw the picture, then use
that name in a level.

## Things to know before you change anything

- The player is a **box** for collisions and a **circle** for drawing.
  That is on purpose. Boxes are easier to check and nobody can tell.
- Every file is loaded in order at the bottom of `index.html`.
  If you add a new file, add it to that list too.
- The level data is loaded with `fetch()`, which only works over http.
  Use your GitHub Pages link. Opening `index.html` straight off your
  hard drive will not load the levels.

AI VERSION:

# EMBER

A coal rolls downhill. Everything else is friction.

A momentum platformer built on the bones of a simple roller game: a circle with an
off-centre dot moves, jumps, lands on platforms, dies on spikes, and wins by touching
the flag. Same skeleton, considerably more muscle.

**[Play it](https://rfaymsasd-droid.github.io/EMBER/)** — replace with your Pages URL.

---

## What is in here

| File | What it is |
| --- | --- |
| `index.html` | The entire game. Markup, styles, levels, and engine in one file. |
| `README.md` | This. |

That is the whole repository. No build step, no dependencies, no asset folder.

## Controls

| Key | Does |
| --- | --- |
| `←` `→` or `A` `D` | Roll |
| `Space`, `↑`, or `W` | Jump — hold for height, release early to cut it short |
| `R` | Restart the level |
| `Esc` | Pause |
| `M` | Mute |

On a phone the touch pads appear automatically.

## What it does that the base game did not

**Jump feel.** Three things separate a platformer that feels good from one that fights you,
and all three are here:

- *Coyote time* — you can still jump for 0.10s after walking off a ledge.
- *Input buffering* — a jump pressed up to 0.12s before you land still fires.
- *Variable height* — releasing the button early cuts your rise, so tapping hops and
  holding leaps. Gravity also eases off near the top of the arc, which is what makes a
  jump hang instead of snapping back down.

**Everything else.** Five levels with per-level best times and ember counts saved in your
browser. Particles for dust, trails, and death. Screen shake and a brief freeze on impact.
A camera that looks ahead in the direction you are moving. Parallax background. Sound
synthesised at runtime with the Web Audio API, which is why the repo contains no `.wav`
files. Squash and stretch on the ball, and rotation driven by real horizontal speed so
the roll always matches the movement.

**One fix worth naming.** The original loaded its levels with `fetch()`, which silently
fails when you open `index.html` from your hard drive — the README had to warn you about
it. Everything here is inline, so it runs identically from a file path and from Pages.

## Changing how it feels

Every number that decides the physics lives in one object near the top of the script:

```js
const CFG = {
  gravity: 2000,
  runAccel: 3200,
  maxRun: 300,
  jumpVel: 620,
  jumpCut: 0.45,     // how hard an early release cuts the jump
  coyote: 0.10,      // grace after leaving a ledge
  buffer: 0.12,      // grace for an early jump press
  apexGravity: 0.70, // lighter gravity at the top of the arc
  bounceVel: 900,
  ...
};
```

Raise `jumpVel` and the ball floats. Raise `gravity` and it gets heavy and precise. Drop
`coyote` to 0 and you will feel immediately why it is there.

## Level format

A level is 18 rows of characters. The engine pads short rows, so they do not have to be
the same length.

| Char | Is |
| --- | --- |
| `.` | empty air |
| `#` | solid block |
| `-` | one-way platform — you land on it from above and jump up through it |
| `^` | spikes |
| `b` | bounce pad, throws you higher than you can jump |
| `o` | ember to collect |
| `S` | where you start |
| `F` | the flag |

Levels are the `LEVELS` array at the top of the script. To add one, push another
`{ name, hint, rows }` object.

## Designing a level that is fair

Possible and fair are different things. Three rules, all derived from the physics rather
than guessed at — with `jumpVel: 620` and `gravity: 2000` a jump rises 96px (3.4 tiles)
and carries 186px (6.6 tiles):

1. **No gap wider than about 5 tiles.** 6.6 is the absolute ceiling, so anything past 5
   leaves no room for error.
2. **At least 4 clear tiles either side of a gap.** You need runway to reach full speed
   before it and somewhere safe to land after it.
3. **Keep spike clusters either touching or 7+ tiles apart.** In between is a trap: the
   jump that clears the first hazard lands you exactly on the second. This one is not
   obvious from looking at a level — it only shows up when you play it, or when you test
   for it.

## Credits

Built from the `Simple-Roller-Game` base, which supplied the original idea: a circle with
an off-centre dot so you can see it roll. That detail is still here.

Engine, levels, art, and sound written for this version with the help of Claude.