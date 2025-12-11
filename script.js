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
