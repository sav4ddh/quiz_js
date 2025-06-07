console.log("app started.!!");
const formErrorBox = document.getElementById("formErrorBox");

const getDomainUrl = () => {
  const getDomainUrl = () => {
    try {
      const url = new URL(window.location.href);
      const pathParts = url.pathname.split("/");
      pathParts.pop();
      const basePath = pathParts.join("/") + "/";

      return `${url.protocol}//${url.host}${basePath}`;
    } catch (error) {
      return null;
    }
  };
};

const userNameFromLocalStorage = localStorage.getItem("username");
if (userNameFromLocalStorage) {
  window.location.href = `http://${getDomainUrl()}play.html`;
}

const validateForm = (formData) => {
  const userName = formData.userName.value;
  if (userName === "" || userName === null || userName === undefined) {
    return (formErrorBox.style.display = "flex");
  }

  localStorage.setItem("username", userName);
  window.location.href = `http://${getDomainUrl()}play.html`;
};
