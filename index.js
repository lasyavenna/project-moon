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
    }

    avatarBox.addEventListener("click", updateProgressBarManual);
});
