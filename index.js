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
