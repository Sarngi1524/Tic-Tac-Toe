let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "heart"; // heart = Me, ribbon = You
let gameOver = false;

function startGame() {
  resetGame();
  // hide the main menu window so frame-2 appears on its own
  const main = document.querySelector('.window');
  if (main) main.classList.add('closed');
  switchFrame("frame-game");
}

function switchFrame(id) {
  document.querySelectorAll(".frame").forEach(f => f.classList.remove("active"));
    const el = document.getElementById(id);
    if (!el) return;
    // remove visible from other frames
    document.querySelectorAll('.frame.visible').forEach(f => f.classList.remove('visible'));
    el.classList.add("active");
    // If this is a result frame (3,4,5) show it as an overlay to guarantee visibility
    if (id === 'frame-3' || id === 'frame-4' || id === 'frame-5') {
      el.classList.add('visible');
    }
    console.log('switchFrame ->', id);
}

function playMove(cell, index) {
  if (gameOver) return;
  if (board[index] !== "") return;

  const img = document.createElement("img");

  if (currentPlayer === "heart") {
    img.src = "assets/heart.png";
    board[index] = "H";
    currentPlayer = "ribbon";
  } else {
    img.src = "assets/ribbon.png";
    board[index] = "R";
    currentPlayer = "heart";
  }

  cell.appendChild(img);

  // check for a win or draw
  const result = checkWin();
  if (result) {
    gameOver = true;
    if (result === 'R') {
      // 'You' (ribbon) won => Me lost -> show frame 3
      console.log('Game result: R wins; opening frame-3');
      switchFrame('frame-3');
    } else if (result === 'draw') {
      // draw -> show frame 5
      console.log('Game result: draw; opening frame-5');
      switchFrame('frame-5');
    } else {
      // H won -> show frame 4
      console.log('Game result: H wins; opening frame-4');
      const title = document.querySelector('#frame-4 .lose-title');
      const text = document.querySelector('#frame-4 .lose-text');
      if (title) title.textContent = 'You Won!!';
      if (text) text.innerHTML = 'Nice one!<br>your prize is free<br>chocolate from me!!!';
      switchFrame('frame-4');
    }
  }
}

function checkWin() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (const [a,b,c] of wins) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // 'H' or 'R'
    }
  }
  // draw if no empty cells
  if (board.every(cell => cell !== '')) return 'draw';
  return null;
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = 'heart';
  gameOver = false;
  // clear UI
  document.querySelectorAll('.game-board .cell').forEach(c => {
    while (c.firstChild) c.removeChild(c.firstChild);
  });
}

// Dev helper to force the Draw frame for testing: call `showDrawFrame()` in the console.
function showDrawFrame() { switchFrame('frame-5'); }

// Wire up window controls (minimize / close)
function initControls() {
  document.querySelectorAll('.minimize-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const parent = e.currentTarget.closest('.window, .frame');
      if (!parent) return;
      parent.classList.toggle('minimized');
    });
  });

  document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const parent = e.currentTarget.closest('.window, .frame');
      if (!parent) return;
      // If it's a frame (the game), close it by removing the active class.
      if (parent.classList.contains('frame')) {
        parent.classList.remove('active');
        // if closing the game frame, restore the main window
        if (parent.id === 'frame-game') {
          const main = document.querySelector('.window');
          if (main) main.classList.remove('closed');
        }
      } else {
        // Otherwise hide the whole window (user can reload to get it back)
        parent.classList.add('closed');
      }
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initControls);
} else {
  initControls();
}


