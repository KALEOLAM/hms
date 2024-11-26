document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById("error-message");
  const loginContainer = document.getElementById("login-container");
  const mainContainer = document.getElementById("main-container");

  // 模拟的有效用户名和密码
  const VALID_USERNAME = "user";
  const VALID_PASSWORD = "password";

  // 表单提交事件处理程序
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // 阻止默认表单提交行为

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      // 隐藏登录页面，显示主内容
      loginContainer.classList.add("hidden");
      mainContainer.classList.remove("hidden");
    } else {
      // 显示错误信息
      errorMessage.textContent = "用戶名或密碼錯誤，請再試一次！";
    }
  });
});
