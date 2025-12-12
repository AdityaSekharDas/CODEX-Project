const startBtn = document.getElementById("startBtn");
const rightBox = document.getElementById("gameArea");
const stopBtn = document.getElementById("stopBtn");
const stackBox = document.getElementById("stackBox");
const sortedBox = document.getElementById("sortedBox");

let stack=[];
let intervalId=null;

startBtn.addEventListener("click", function () {
if(intervalId) 
 return;

stack=[];
stackBox.innerHTML="";
sortedBox.innerHTML = "";
rightBox.innerHTML = ""; 

intervalId=setInterval(function () {
   let bubble = document.createElement("div");
    bubble.className = "bubble";

    const maxLeft = rightBox.clientWidth - 60;
    bubble.style.left = Math.floor(Math.random() * maxLeft) + "px";

    bubble.addEventListener("mousedown", function() {
        let num = Math.floor(Math.random() * 100) + 1;
        stack.push(num);
        let stackItem = document.createElement("div");
        stackItem.innerText = num;
        stackBox.appendChild(stackItem);
        bubble.remove();
    });

     rightBox.appendChild(bubble);
       
     setTimeout(function () {
       bubble.remove();
    }, 7000);

  }, 600);

});

stopBtn.addEventListener("click",function (){
  if(!intervalId) 
    return;

  clearInterval(intervalId);
  intervalId=null;
  rightBox.innerHTML = "";
  performBubbleSort();
  displaySortedOutput();
});

function performBubbleSort(){
for(let i=0;i<stack.length;i++){
  for(let j=0;j<stack.length;j++){
    if(stack[j]>stack[j+1]){
       let temp = stack[j];
       stack[j] = stack[j + 1];
       stack[j + 1] = temp;
    }
  }
}
}

function displaySortedOutput(){
   stack.forEach((num, index) => {
        setTimeout(() => {
            let item = document.createElement("div");
            item.innerText = num;
            sortedBox.appendChild(item);
        }, index * 300);
    });
}
