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
      // 顯示主介面
      loginContainer.classList.add("hidden");
      mainContainer.classList.remove("hidden");

      // 更新時間和生成日曆
      updateTime();
      generateCalendar();
    } else {
      errorMessage.textContent = "用戶名或密碼錯誤，請再試一次！";
    }
  });

  // 更新時間的函式
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

  // 生成日曆的函式
  function generateCalendar() {
    const calendarTable = document.getElementById("calendar-table");
    const currentMonthElement = document.getElementById("current-month");

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    currentMonthElement.textContent = `${year} 年 ${month + 1} 月`;

    calendarTable.innerHTML = ""; // 清空表格

    let dayCounter = 1;
    for (let i = 0; i < 6; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("td");
        if (i === 0 && j < firstDay || dayCounter > daysInMonth) {
          cell.textContent = "";
        } else {
          cell.textContent = dayCounter;
          if (dayCounter === now.getDate()) {
            cell.style.backgroundColor = "#FFD700"; // 高亮今天
          }
          dayCounter++;
        }
        row.appendChild(cell);
      }
      calendarTable.appendChild(row);
    }
  }
});
