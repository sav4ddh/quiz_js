console.log("app started.!!");
const formErrorBox = document.getElementById("formErrorBox");

const getDomainUrl = () => {
  try {
    const urlObject = new URL(window.location.href);
    return urlObject.host;
  } catch (error) {
    return null;
  }
};

const userNameFromLocalStorage = localStorage.getItem("username");
if (userNameFromLocalStorage) {
  window.location.href = `http://${getDomainUrl()}/play.html`;
}

const validateForm = (formData) => {
  const userName = formData.userName.value;
  if (userName === "" || userName === null || userName === undefined) {
    return (formErrorBox.style.display = "flex");
  }

  localStorage.setItem("username", userName);
  window.location.href = `http://${getDomainUrl()}/play.html`;
};
