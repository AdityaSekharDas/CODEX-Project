const startBtn = document.getElementById("startBtn");
const rightBox = document.getElementById("gameArea");

startBtn.addEventListener("click", function () {

  setInterval(function () {
    let bubble = document.createElement("div");
    bubble.className = "bubble";

    const maxLeft = rightBox.clientWidth - 60;
    bubble.style.left = Math.floor(Math.random() * maxLeft) + "px";

    rightBox.appendChild(bubble);

    setTimeout(function () {
      bubble.remove();
    }, 3000);

  }, 600);

});
// ======= Updated script.js (replace your old file with this) =======

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const rightBox = document.getElementById("gameArea");
const stackBox = document.getElementById("stackBox");
const sortedBox = document.getElementById("sortedBox");

let bubbleInterval = null;   // will hold the interval id
const stack = [];            // store clicked numbers

// helper: random integer 1..100
function getRandomInt() {
  return Math.floor(Math.random() * 100) + 1;
}

/* ---------------- START logic ---------------- */
startBtn.addEventListener("click", function () {
  // prevent starting again if already running
  if (bubbleInterval) return;

  // create bubbles every 600ms
  bubbleInterval = setInterval(function () {
    let bubble = document.createElement("div");
    bubble.className = "bubble";

    // place bubble across full width of rightBox
    const maxLeft = Math.max(0, rightBox.clientWidth - 60);
    bubble.style.left = Math.floor(Math.random() * maxLeft) + "px";

    rightBox.appendChild(bubble);

    // remove bubble automatically after 3s
    setTimeout(function () {
      if (bubble.parentNode) bubble.remove();
    }, 3000);

  }, 600);
});

/* ---------------- Stop logic (stop creating bubbles and finish game) ---------------- */
stopBtn.addEventListener("click", function () {
  // stop creating new bubbles
  if (bubbleInterval) {
    clearInterval(bubbleInterval);
    bubbleInterval = null;
  }

  // remove all existing bubbles from the screen
  const existing = rightBox.querySelectorAll(".bubble");
  existing.forEach(b => b.remove());

  // mark game finished: disable start button so user can't restart accidentally
  startBtn.disabled = true;
  startBtn.style.opacity = "0.5";    // visual hint (optional)
});

/* ---------------- Event delegation: handle bubble clicks ----------------
   (works for bubbles created after page load)
*/
rightBox.addEventListener("click", function (e) {
  if (!e.target.classList || !e.target.classList.contains("bubble")) return;

  const bubble = e.target;

  // generate random number and store it
  const num = getRandomInt();
  stack.push(num);

  // show number in stackBox (visual)
  if (stackBox) {
    const item = document.createElement("div");
    item.textContent = num;
    item.style.margin = "5px 0";
    item.style.padding = "6px";
    item.style.background = "#333";
    item.style.borderRadius = "6px";
    item.style.color = "#fff";
    item.style.fontWeight = "600";
    stackBox.appendChild(item);
  }

  // remove the clicked bubble immediately
  bubble.remove();
});

/* ---------------- Sorting on stop (optional) ----------------
   If you want the sorted list to appear when stop is clicked,
   this block will sort and display current stack at stop time.
   If you prefer to keep sorting separate, comment out or remove this.
*/
stopBtn.addEventListener("click", function showSortedOnStop() {
  if (!sortedBox) return;

  // copy and bubble-sort (ascending)
  const arr = stack.slice();
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        const tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }

  // display sorted numbers
  sortedBox.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    const s = document.createElement("div");
    s.textContent = arr[i];
    s.style.padding = "8px";
    s.style.background = "#222";
    s.style.border = "1px solid rgba(255,255,255,0.05)";
    s.style.borderRadius = "6px";
    s.style.minWidth = "40px";
    s.style.textAlign = "center";
    s.style.color = "#fff";
    s.style.fontWeight = "700";
    s.style.marginRight = "8px";
    s.style.display = "inline-block";
    sortedBox.appendChild(s);
  }
});
