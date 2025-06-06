const username = localStorage.getItem("username");
const welcomeUser = document.getElementById("welcomeUser");

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

welcomeUser.innerHTML = `Welcome ${username}`;
