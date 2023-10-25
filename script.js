var audio;
var progressBar;
var currentTimeLabel;
var durationLabel;
var volumeSlider; // New line to get volume slider element
var audio = document.getElementById("taco");
audio.play();

function playAudio() {
  if (!audio) {
    audio = new Audio("music.mp3");
    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    var audioSource = audioContext.createMediaElementSource(audio);
    var gainNode = audioContext.createGain();

    // Connect the audio source to the gain node
    audioSource.connect(gainNode);
    // Connect the gain node to the audio context's destination (speakers)
    gainNode.connect(audioContext.destination);

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

    // Set initial volume
    gainNode.gain.value = volumeSlider.value;

    // Update volume when slider value changes
    volumeSlider.addEventListener('input', function() {
      // Set the gain node value
      gainNode.gain.value = this.value;
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
