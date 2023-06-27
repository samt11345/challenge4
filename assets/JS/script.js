var startBtn = document.getElementById("start-btn");
var questionContainer = document.getElementById("question-container");
var Q = 0;
var score = 0;
var scoreList = [];
var scoreWrapper = document.getElementById("scoreWrapper");
var timeoutID; // Variable to store the timeout ID

scoreWrapper.style.display = "none";

var totalDuration = 120;
var timeLeft = 120;

function updateTimer() {
    var minutes = Math.floor(timeLeft / 60);
    var seconds = timeLeft % 60;
    var formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    document.getElementById("timer").textContent = formattedTime;

    if (timeLeft <= 0) {
        endQuiz();
    } else {
        timeLeft--;
        timeoutID = setTimeout(updateTimer, 1000);
    }
}

const checkAnswers = document.getElementById("check-answers");

function startGame() {
    document.getElementById("start-container").className = "hide";
    questionContainer.classList.remove("hide");

    updateTimer();

    askQuestion();
}

function askQuestion() {
    if (Q >= questions.length) {
        endQuiz();
        return;
    }

    scoreWrapper.style.display = "none";

    let answerCheck = "";
    document.getElementById("question").textContent = questions[Q].title;
    document.getElementById("answer-buttons").innerHTML = "";

    questions[Q].choices.forEach(function (choice) {
        var button = document.createElement("button");
        button.textContent = choice;
        button.setAttribute("value", choice);
        button.addEventListener("click", function () {
            if (this.value === questions[Q].correct) {
                answerCheck = "correct";
                checkAnswers.textContent = "Correct";
                score++;
            } else {
                answerCheck = "incorrect";
                checkAnswers.textContent = "Incorrect";
                timeLeft -= 10;
            }

            Q++;
            askQuestion();
        });

        document.getElementById("answer-buttons").appendChild(button);
    });
}

function endQuiz() {
    questionContainer.classList.add("hide");
    var initials = prompt("Enter your initials: ");
    var calcScore = score;

    clearTimeout(timeoutID); // Clear the timeout to stop the timer

    scoreWrapper.style.display = "block";
    scoreList.push({ initials: initials, score: score });
    displayScoreList();
}

function displayScoreList() {
    var scoreListContainer = document.getElementById("end-container");
    scoreListContainer.innerHTML = "";

    var ul = document.createElement("ul");
    scoreList.forEach(function (entry) {
        var li = document.createElement("li");
        li.textContent = entry.initials + ": " + entry.score;
        ul.appendChild(li);
    });
    scoreListContainer.appendChild(ul);
}

startBtn.addEventListener("click", startGame);
