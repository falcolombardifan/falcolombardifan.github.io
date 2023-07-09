var audio;
var progressBar;
var currentTimeLabel;
var durationLabel;

function playAudio() {
  if (!audio) {
    audio = new Audio("music.mp3");
    progressBar = document.getElementById("progressBar");
    currentTimeLabel = document.getElementById("currentTime");
    durationLabel = document.getElementById("duration");

    audio.addEventListener("loadedmetadata", function() {
      progressBar.max = audio.duration;
      progressBar.value = 0;
      durationLabel.textContent = formatTime(audio.duration);
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
    currentTimeLabel.textContent = formatTime(0);
  }
}

function updateProgressBar() {
  progressBar.value = audio.currentTime;
  currentTimeLabel.textContent = formatTime(audio.currentTime);
}

function formatTime(timeInSeconds) {
  var minutes = Math.floor(timeInSeconds / 60);
  var seconds = Math.floor(timeInSeconds % 60);
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return minutes + ":" + seconds;
}
