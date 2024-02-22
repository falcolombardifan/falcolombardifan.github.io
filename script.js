var audio;
var progressBar;
var currentTimeLabel;
var durationLabel;
var volumeSlider;

document.addEventListener("DOMContentLoaded", function() {
  audio = document.getElementById("taco");
  progressBar = document.getElementById("progressBar");
  currentTimeLabel = document.getElementById("currentTime");
  durationLabel = document.getElementById("duration");
  volumeSlider = document.getElementById("volume-slider");

  // Check if audio is loaded and initialize the progress bar
  audio.addEventListener("loadedmetadata", function() {
    progressBar.max = audio.duration;
    durationLabel.textContent = formatTime(audio.duration);
  });

  // Update progress bar and current time label
  audio.addEventListener("timeupdate", function() {
    progressBar.value = audio.currentTime;
    currentTimeLabel.textContent = formatTime(audio.currentTime);
  });

  // Initialize volume slider
  var audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const source = audioCtx.createMediaElementSource(audio);

  // Create a gain node
  const gainNode = audioCtx.createGain();

  // Connect the audio element's output to the gain node
  audioSource.connect(gainNode);

  // Connect the gain node to the audio context's destination (speakers)
  gainNode.connect(audioContext.destination);

  // Set initial volume
  gainNode.gain.value = volumeSlider.value;

  // Update volume when slider value changes
  volumeSlider.addEventListener('input', function() {
    // Set the gain node value
    gainNode.gain.value = this.value;
  });
});

function playAudio() {
  if (audio.paused) {
    console.log("Attempting to play audio...");
    audio.play()
      .then(() => {
        console.log("Audio playback started successfully.");
      })
      .catch(error => {
        console.error("Error playing audio:", error);
      });
  } else {
    console.log("Audio is already playing.");
  }
}

function stopAudio() {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
    progressBar.value = 0;
    currentTimeLabel.textContent = formatTime(0);
  }
}

function formatTime(timeInSeconds) {
  var minutes = Math.floor(timeInSeconds / 60);
  var seconds = Math.floor(timeInSeconds % 60);
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return minutes + ":" + seconds;
}
