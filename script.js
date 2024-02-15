const form = document.getElementById("quiz-form");
const answers = Array.from(document.querySelectorAll(".answer"));
const questionItems = document.querySelectorAll(".question-item");
const alert = document.querySelector("#alert");
const timer = document.querySelector("#btnn")

const timerDisplay = document.getElementById("timer-display");
let timerSeconds = 0;
let timerInterval;
function updateTimerDisplay() {
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
function startTimer() {
    timerInterval = setInterval(() => {
      timerSeconds++;
      updateTimerDisplay();
  }, 1000)
}
function stopTimer() {
  clearInterval(timerInterval);
}
startTimer();



form.addEventListener("submit", (e) => {
  e.preventDefault();

  form.querySelector("#btnn").disabled = true 
  if (timer.disabled){
    stopTimer()
    timer.style.backgroundColor = "#cacbd0"
  }

  questionItems.forEach((e) => {
    e.classList.add("incorrect");
    e.classList.remove("correct");
  });

  const checkedAnswers = answers.filter((e) => e.checked);
  checkedAnswers.forEach((e) => {
    const isCorrect = e.value === "true";
    const question = e.closest(".question-item");

    if (isCorrect) {
      question.classList.add("correct");
      question.classList.remove("incorrect");
    } else {
      question.classList.add("incorrect");
      question.classList.remove("correct");
    }

    const allTrue = checkedAnswers.every((e) => e.value === "true");
    const allAnswered = checkedAnswers.length === questionItems.length; 

    if (allTrue && allAnswered) {
      alert.classList.add("active");
      stopTimer();
      alert.innerText = `Congratulations!! Your time is: ${timerDisplay.textContent}. Try again to beat your record!`
    setTimeout(() => {
      alert.classList.remove("active");
    }, 4000);
  }
  });
});

document.querySelector("#resetButton").addEventListener("click", () => {
  location.reload()
})