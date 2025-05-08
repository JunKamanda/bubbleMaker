let counter = 0;

const bubbleMaker = ()=>{
  const bubble =  document.createElement("span");
  bubble.classList.add("bubble"),
  document.body.appendChild(bubble);
  
  const size = Math.random() * 200 + 100 + "px";
  bubble.style.width = size;
  bubble.style.height = size;
  
  bubble.style.top = Math.random() * 100 + 50 + "%";
  bubble.style.left = Math.random() * 100 + "%";
  
  const plusMunis = Math.random() > 0.5 ? 1 : -1;
  bubble.style.setProperty('--left', Math.random() * 100 * plusMunis + "%");

  bubble.addEventListener("click", ()=>{
    counter++;
    counterDisplay.textContent = counter;
    bubble.remove();
  })

  setTimeout (()=>{
    bubble.remove()
  },8000);

}

setInterval(() => {
  bubbleMaker()
}, 3000);