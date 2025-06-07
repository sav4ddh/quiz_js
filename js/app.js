console.log("app started.!!");
const formErrorBox = document.getElementById("formErrorBox");

const userNameFromLocalStorage = localStorage.getItem("username");
if (userNameFromLocalStorage) {
  window.location.href = `https://sav4ddh.github.io/quiz_js/play.html`;
}

const validateForm = (formData) => {
  const userName = formData.userName.value;
  if (userName === "" || userName === null || userName === undefined) {
    return (formErrorBox.style.display = "flex");
  }

  localStorage.setItem("username", userName);
  window.location.href = `https://sav4ddh.github.io/quiz_js/play.html`;
};
