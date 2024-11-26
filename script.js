document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById("error-message");
  const loginContainer = document.getElementById("login-container");
  const mainContainer = document.getElementById("main-container");

  // 預設的用戶名與密碼
  const VALID_USERNAME = "user";
  const VALID_PASSWORD = "password";

  // 表單提交事件
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // 防止表單默認提交行為

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // 驗證用戶名與密碼
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      // 隱藏登入畫面，顯示主介面
      loginContainer.classList.add("hidden");
      mainContainer.classList.remove("hidden");

      // 更新時間與日曆
      updateTime();
      generateCalendar();
    } else {
      // 顯示錯誤訊息
      errorMessage.textContent = "用戶名或密碼錯誤，請再試一次！";
    }
  });

  // 時間更新函數
  function updateTime() {
    const currentTimeElement = document.getElementById("current-time");
    setInterval(() => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Hong_Kong",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      currentTimeElement.textContent = new Intl.DateTimeFormat("zh-Hant", options).format(now);
    }, 1000);
  }

  // 動態生成日曆
  function generateCalendar() {
    const calendarTable = document.getElementById("calendar-table");
    const date = new Date();
    const currentMonth = date.toLocaleString("zh-Hant", { month: "long" });
    const currentYear = date.getFullYear
