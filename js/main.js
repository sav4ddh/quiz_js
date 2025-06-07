const username = localStorage.getItem("username");
const welcomeUser = document.getElementById("welcomeUser");

const questionNumber = document.getElementById("questionNumber");
const timeLeft = document.getElementById("timeLeft");
const questionTitle = document.getElementById("questionTitle");
const questionOptions = document.getElementById("questionOptions");
const nextQnButton = document.getElementById("nextQnButton");
const questionPopUp = document.getElementById("questionPopUp");
const loadingQuestionPopUp = document.getElementById("loadingQuestionPopUp");

let questions = [];
let currentIndex = 0;
let noOfQuestions = 10;
let score = 0;

const getDomainUrl = () => {
  try {
    const urlObject = new URL(window.location.href);
    return urlObject.host;
  } catch (error) {
    return null;
  }
};

if (!username) {
  window.location.href = `http://${getDomainUrl()}/index.html`;
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
    console.log(data.results);

    loadQuestions();
  } catch (error) {
    console.log(error);
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

  console.log("Correct Answer Is: ", questions[currentIndex].correct_answer);

  questionNumber.innerHTML = `(${currentIndex + 1}/10)`;
  questionTitle.innerHTML = `Q: ${await questions[currentIndex]?.question}`;
  questionOptions.innerHTML = "";
  questionPopUp.classList.remove("hide");
  loadingQuestionPopUp.classList.add("hide");
  await questions[currentIndex].incorrect_answers.forEach((element) => {
    const li = document.createElement("li");
    questionOptions.appendChild(li);
    li.textContent = element;
    li.classList.add("option");

    li.addEventListener("click", () => {
      const isCorrectAnswer = checkAnswer(element, currentIndex);

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

      console.log(score);
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

const showResult = () => {
  console.log(`You Have Scored ${score * 10} Out Of 100`);
};

function nextQn() {
  if (currentIndex < noOfQuestions - 1) {
    currentIndex += 1;
    loadQuestions();
  } else {
    showResult();
  }
}

// setTimeout(() => {
// localStorage.removeItem("username");
// }, 10000);
