var audio;
var progressBar;

function playAudio() {
  if (!audio) {
    audio = new Audio("music.mp3");
    progressBar = document.getElementById("progressBar");
    audio.addEventListener("loadedmetadata", function() {
      progressBar.max = audio.duration;
      progressBar.value = 0;
      audio.addEventListener("timeupdate", updateProgressBar);
    });
  }
  audio.play();
}

function stopAudio() {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
    progressBar.value = 0;
  }
}

function updateProgressBar() {
  progressBar.value = audio.currentTime;
}
