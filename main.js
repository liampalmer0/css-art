(function setCurrentTime() {
  document.querySelector(".time").innerHTML = new Date().toLocaleTimeString();
  // setTimeout(setCurrentTime, 1000);
})();
