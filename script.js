var audio;
var progressBar;
var currentTimeLabel;
var durationLabel;
var volumeSlider; 

function playAudio() {
  if (!audio) {
    audio = new Audio("music.mp3");
    progressBar = document.getElementById("progressBar");
    currentTimeLabel = document.getElementById("currentTime");
    durationLabel = document.getElementById("duration");
    volumeSlider = document.getElementById("volume-slider"); // Get volume slider element

    audio.addEventListener("loadedmetadata", function() {
      progressBar.max = audio.duration;
      progressBar.value = 0;
      durationLabel.textContent = formatTime(audio.duration);
      audio.addEventListener("timeupdate", updateProgressBar);
    });

    // Set initial volume to 1 (100%)
    audio.volume = volumeSlider.value;

    // Update volume when slider value changes
    volumeSlider.addEventListener('input', function() {
      // Set the volume of the audio element directly
      audio.volume = this.value;
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

setTimeout(function() {
  var backgroundElement = document.querySelector('.background');
  backgroundElement.classList.toggle('reverse');
}, 8000); 
