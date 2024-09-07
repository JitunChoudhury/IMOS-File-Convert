function showToast(message) {
  var container = document.getElementById("toast-container");

  var toast = document.createElement("div");
  toast.classList.add("toast");

  var messageElement = document.createElement("div");
  messageElement.classList.add("toast-message");
  messageElement.textContent = message;

  var timerBar = document.createElement("div");
  timerBar.classList.add("timer-bar");

  toast.appendChild(messageElement);
  toast.appendChild(timerBar);
  container.insertBefore(toast, container.firstChild);

  setTimeout(function () {
      toast.classList.add("active");

      setTimeout(function () {
          toast.classList.remove("active");
          setTimeout(function () {
              container.removeChild(toast);
          }, 300);
      }, 3000);
  }, 100);

  if (container.children.length > 5) {
      container.removeChild(container.lastChild);
  }
}

{/* <div class="toast-container" id="toast-container"></div> */}
