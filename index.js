// function updateProressBar(progressBar, value) {
//     value = Math.round(value);
//     progressBar.querySelector(".progress-bar-fill").style.width = `${value}%`;
// }


document.addEventListener("DOMContentLoaded", () => {
    const avatarBox = document.querySelector(".avatar");
    const progressFill = document.querySelector(".progress-bar-fill");

    let progress = 0;

    function updateProgressBarManual() {
        progress = Math.min(progress + 3, 100);
        progressFill.style.width = `${progress}%`;
        
        if (progress == 100) {
            progress = 0;
        }
    }

    avatarBox.addEventListener("click", updateProgressBarManual);
});

const addBtn = document.getElementById("add-task");
const taskField = document.getElementById("task-field");
const taskList = document.getElementById("task-list");

addBtn.addEventListener("click", () => {
    const taskText = taskField.value.trim();
    if (taskText == "") return;

    const li = document.createElement("li");

    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="complete-btn">✓</button>
    `;

    taskList.appendChild(li);
    taskField.value = "";

    li.querySelector(".complete-btn").addEventListener("click", () => { 
        li.classList.toggle("task-complete"); 

        // moving completed tasks to bottom
        requestAnimationFrame(() => {
            if (li.classList.contains("task-complete")) {
                taskList.appendChild(li);
            } else {
                const completedTasks = [...taskList.querySelectorAll(".task-complete")]; 
                if (completedTasks.length > 0) { 
                    taskList.insertBefore(li, completedTasks[0]); 
                } else { 
                    taskList.insertBefore(li, taskList.firstChild); 
                }
            }
        });
    });
});

taskField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addBtn.click();
    }
});

// hamburger menu
const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("side-menu");

hamburger.addEventListener("click", () => {
    sideMenu.classList.toggle("open");
});

document.getElementById("avatar-page").addEventListener("click", () => {
    window.location.href = "avatar/avatar.html"; 
});

// --Timer functionality--
const DEFAULT_TIME = 25 * 60;

let timeLeft = DEFAULT_TIME;
let timerInterval = null;
let isRunning = false;

const timerDisplay = document.getElementById("timer-display");
const timerButton = document.getElementById("timer-button");
const resetButton = document.getElementById("reset-button");

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timeLeft);
}

function startTimer() {
    if (isRunning) return;

    isRunning = true;

    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            isRunning = false;
            alert("Time’s up! 🌙 Take a break.");
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = DEFAULT_TIME;
    updateTimerDisplay();
}

timerButton.addEventListener("click", () => {
    if (!isRunning) {
        startTimer();
        timerButton.textContent = "Pause";
    } else {
        pauseTimer();
        timerButton.textContent = "Start";
    }
});

resetButton.addEventListener("click", () => {
    resetTimer();
    timerButton.textContent = "Start";
});

// Initial render
updateTimerDisplay();
