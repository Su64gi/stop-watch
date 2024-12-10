// script.js

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;

// Get references to the DOM elements
const timeDisplay = document.getElementById("time-display");
const startPauseBtn = document.getElementById("start-pause-btn");
const resetBtn = document.getElementById("reset-btn");
const lapBtn = document.getElementById("lap-btn");
const lapsList = document.getElementById("laps");

// Format time to display
function formatTime(time) {
  const milliseconds = time % 1000;
  const seconds = Math.floor(time / 1000) % 60;
  const minutes = Math.floor(time / (1000 * 60)) % 60;
  const hours = Math.floor(time / (1000 * 60 * 60));

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
    .toString()
    .padStart(3, "0")}`;
}

// Start or Pause the stopwatch
function startPauseStopwatch() {
  if (isRunning) {
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
    startPauseBtn.textContent = "Start";
    lapBtn.disabled = true;
  } else {
    startTime = Date.now();
    timerInterval = setInterval(updateTime, 10);
    startPauseBtn.textContent = "Pause";
    lapBtn.disabled = false;
    resetBtn.disabled = false;
  }
  isRunning = !isRunning;
}

// Update the displayed time
function updateTime() {
  const currentTime = Date.now();
  const time = elapsedTime + (currentTime - startTime);
  timeDisplay.textContent = formatTime(time);
}

// Reset the stopwatch
function resetStopwatch() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  startTime = 0;
  timeDisplay.textContent = formatTime(0);
  lapsList.innerHTML = "";
  startPauseBtn.textContent = "Start";
  resetBtn.disabled = true;
  lapBtn.disabled = true;
  isRunning = false;
}

// Record a lap
function recordLap() {
  const currentTime = elapsedTime + (Date.now() - startTime);
  const lapTime = formatTime(currentTime);
  const lapItem = document.createElement("li");
  lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
  lapsList.appendChild(lapItem);
}

// Attach event listeners
startPauseBtn.addEventListener("click", startPauseStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", recordLap);
