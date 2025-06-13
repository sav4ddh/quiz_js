const username = localStorage.getItem("username");
const welcomeUser = document.getElementById("welcomeUser");

const questionNumber = document.getElementById("questionNumber");
const timeLeft = document.getElementById("timeLeft");
const questionTitle = document.getElementById("questionTitle");
const questionOptions = document.getElementById("questionOptions");
const nextQnButton = document.getElementById("nextQnButton");
const questionPopUp = document.getElementById("questionPopUp");
const loadingQuestionPopUp = document.getElementById("loadingQuestionPopUp");
const scoreResultContainer = document.getElementById("scoreResultContainer");

let questions = [];
let currentIndex = 0;
let noOfQuestions = 10;
let score = 0;
let showNextQn = false;
let currentSecond = 10;
let timerID = null;

if (!username) {
  window.location.href = `https://sav4ddh.github.io/quiz_js/index.html`;
}

async function getQuestions() {
  questionPopUp.classList.add("hide");
  loadingQuestionPopUp.classList.remove("hide");

  const url =
    "https://opentdb.com/api.php?amount=100&category=17&difficulty=easy&type=multiple";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      getQuestions();
    }

    const data = await response.json();
    questions = await data.results;

    loadQuestions();
  } catch (error) {
    // console.log(error);
  }
}

getQuestions();

async function loadQuestions() {
  const randomIndex = Math.floor(
    Math.random() * questions[currentIndex].incorrect_answers.length
  );
  questions[currentIndex].incorrect_answers.splice(
    randomIndex,
    0,
    questions[currentIndex].correct_answer
  );

  // console.log("Correct Answer Is: ", questions[currentIndex].correct_answer);

  if (currentIndex === 9) {
    nextQnButton.innerHTML = "Submit & View Score.";
  }

  questionNumber.innerHTML = `(${currentIndex + 1}/10)`;
  questionTitle.innerHTML = `Q: ${await questions[currentIndex]?.question}`;
  questionOptions.innerHTML = "";
  questionPopUp.classList.remove("hide");
  loadingQuestionPopUp.classList.add("hide");

  clearInterval(timerID);
  timerID = setInterval(() => {
    currentSecond -= 1;
    timeLeft.innerHTML = `(Time Left: ${currentSecond}s)`;

    if (currentSecond <= 0) {
      clearInterval(timerID);
      if (!showNextQn) {
        alert("Time is up!!");
        const allOptions = document.querySelectorAll("li.option");
        if (allOptions.length > 0) {
          const randomOption =
            allOptions[Math.floor(Math.random() * allOptions.length)];
          // console.log(randomOption);

          randomOption.click();
        }
      }
    }
  }, 1000);

  await questions[currentIndex].incorrect_answers.forEach((element) => {
    const li = document.createElement("li");
    questionOptions.appendChild(li);
    li.textContent = element;
    li.classList.add("option");

    li.addEventListener("click", () => {
      const isCorrectAnswer = checkAnswer(element, currentIndex);
      showNextQn = true;

      const allOptions = document.querySelectorAll("li");
      allOptions.forEach((option) => {
        option.style.pointerEvents = "none";
      });

      if (isCorrectAnswer) {
        li.classList.add("right");
        score += 1;
      } else {
        li.classList.add("wrong");

        allOptions.forEach((option) => {
          if (
            option.textContent.trim() ==
            decodeHTMLEntities(questions[currentIndex].correct_answer)
          ) {
            option.classList.add("right");
          }
        });
      }

      // console.log(score);
    });
  });
}

function decodeHTMLEntities(text) {
  const txt = document.createElement("textarea");
  txt.innerText = text;
  return txt.value;
}

function checkAnswer(givenAnswer, currentIndex) {
  const isTrue = givenAnswer == questions[currentIndex].correct_answer;
  return isTrue;
}

const refreshQuiz = (removeUser) => {
  if (removeUser) localStorage.removeItem("username");
  window.location.reload();
};

const showResult = () => {
  // console.log(scoreResultContainer);

  scoreResultContainer.classList.remove("hide");
  questionPopUp.classList.add("hide");
  // console.log("helllo");

  scoreResultContainer.innerHTML = `
    <div class="score">
      <p class="scorePercentage" id="scorePercentage">${score * 10}/100</p>
      <p>(${score} out of 10 Qns Corrected.)</p>
    </div>
    <h2>Congragulations, ${username}!! 🎉</h2>
    <p class="message">${
      score >= 70 ? "Great Job! Try again" : "Keeps Improving. Try again."
    }</p>
    <button class="retryButton" onclick="refreshQuiz(false)">Try Again</button>
    <p class="clearAndRestart" onclick="refreshQuiz(true)">Try again with another username</p>
  `;

  // console.log(`You Have Scored ${score * 10} Out Of 100`);
};

function nextQn() {
  if (currentIndex < noOfQuestions - 1 && showNextQn === true) {
    showNextQn = false;
    currentIndex += 1;
    currentSecond = 11;
    loadQuestions();
  } else if (!showNextQn) {
    alert("You Should Choose Any One Option :)");
  } else {
    showResult();
  }
}
