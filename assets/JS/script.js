let startButton = document.getElementById("startButton");
let submitButton = document.getElementById("submit")
let codeQuiz = document.getElementById("codeQuiz");
let instructions = document.getElementById("instructions");
let question1 = document.getElementById("question1");
let question2 = document.getElementById("question2");
let question3 = document.getElementById("question3");
let question4 = document.getElementById("question4");
let question5 = document.getElementById("question5");
let questions = [question1, question2, question3, question4, question5];
let messageDiv = document.getElementById("correct")
let timer = document.getElementById("timer")
let score = document.getElementById("score")
let form = document.getElementById("form")
let finalScore
let timeRemaining = 76
let currentQuestion = 0;
let options = document.querySelectorAll("h4");
let lastQuestion = false
console.log(options)

startButton.addEventListener("click", function () {
    startTimer()
    codeQuiz.classList.add("hide")
    instructions.classList.add("hide")
    startButton.classList.add("hide")
    nextQuestion()

});

function startTimer() {
    let x = setInterval(function () {
        if (timeRemaining > 0) {
            timeRemaining--
        }
        timer.textContent = timeRemaining
        if (timeRemaining === 0 || lastQuestion === true) {
            clearInterval(x)
            for (let i = 0; i < questions.length; i++) {
                questions[i].classList.add("hide")
            }
            form.classList.remove("hide")
            finalScore = timer.textContent
            console.log(finalScore)
            score.textContent = "You scored " + finalScore + " points."
        }
    }, 1000)
}

function nextQuestion() {
    questions[currentQuestion].classList.remove("hide")
    if (currentQuestion > 0) {
        questions[currentQuestion - 1].classList.add("hide")
    }
    currentQuestion++
}
for (let i = 0; i < options.length; i++) {
    options[i].addEventListener("click", function (e) {
        if (e.target.getAttribute("value") === "correct") {
            messageDiv.textContent = "Correct!"
        } else {
            messageDiv.textContent = "Incorrect"
            if (timeRemaining >= 15) {
                timeRemaining -= 15
            }
            else (timeRemaining = 0)
        }
        wait()
        console.log("wait function called")
    })
}

function wait() {
    let waitTime = 1
    let y = setInterval(function () {
        waitTime--
        if (waitTime === 0) {
            clearInterval(y)
            console.log("wait timer stopped")
            messageDiv.textContent = ""
        }
        if (currentQuestion < questions.length) {
            nextQuestion()
            console.log("next question loaded " + currentQuestion)
        } else {
            lastQuestion = true
            console.log("quiz over!")
            form.classList.remove("hide")
            question5.classList.add("hide")
            console.log(finalScore)
        }
    }, 1000)

}

let initials = "";
finalScore = 0;
if (localStorage.getItem("userData") === null) {
    let userData = [];
    localStorage.setItem("userData", JSON.stringify(userData));
}

submitButton.addEventListener("click", function () {
    initials = document.getElementById("initials").value
    if (initials === "") {
        return
    }

    userData = JSON.parse(localStorage.getItem("userData"));

    newEntryObj = {
        "initials": initials,
        "finalScore": finalScore
    }

    userData.push(newEntryObj);

    console.log(userData)

    localStorage.setItem("userData", JSON.stringify(userData))
})

