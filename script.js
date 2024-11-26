document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById("error-message");
  const loginContainer = document.getElementById("login-container");
  const mainContainer = document.getElementById("main-container");

  // 模擬的用戶名和密碼
  const VALID_USERNAME = "user";
  const VALID_PASSWORD = "password";

  // 登入事件
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // 阻止表單默認提交行為

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      loginContainer.classList.add("hidden");
      mainContainer.classList.remove("hidden");
    } else {
      errorMessage.textContent = "用戶名或密碼錯誤，請再試一次！";
    }
  });
});
