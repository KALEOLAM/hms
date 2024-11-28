// 模擬用戶數據
const users = {
  user: "password",
};

// 登入表單邏輯
document.getElementById("login-form")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (users[username] && users[username] === password) {
    // 登入成功，重定向至主頁
    window.location.href = "dashboard.html";
  } else {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "用戶名或密碼錯誤，請重試！";
    errorMessage.style.display = "block";
  }
});

// 初始化日曆
function initCalendar() {
  const today = new Date();
  const currentMonth = today.toLocaleString("zh-Hant", { month: "long" });
  document.getElementById("current-month").textContent = currentMonth;

  const calendarTable = document.getElementById("calendar-table");
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  let tableContent = "<tr>";

  for (let i = 1; i <= daysInMonth; i++) {
    tableContent += `<td>${i}</td>`;
    if (i % 7 === 0) {
      tableContent += "</tr><tr>";
    }
  }
  tableContent += "</tr>";
  calendarTable.innerHTML = tableContent;
}

// 更新時間
function updateTime() {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" }));
  const timeString = now.toLocaleTimeString("zh-Hant", { hour12: false });
  document.getElementById("current-time").textContent = timeString;
}

// 加載家課數據
function loadHomeworkData() {
  fetch("homework_data.json")
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      const homeworkList = document.getElementById("homework-list");
      const today = new Date().toISOString().split("T")[0];
      const todayHomework = data[today] || [];

      homeworkList.innerHTML = todayHomework.length
        ? todayHomework
            .map((homework) => `<li><strong>${homework.subject}</strong>: ${homework.description}</li>`)
            .join("")
        : "<li>今天沒有家課記錄。</li>";
    })
    .catch((error) => {
      document.getElementById("homework-list").innerHTML = `<li>無法加載家課數據。(${error.message})</li>`;
    });
}

// 初始化登入後的主頁面
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("current-time")) {
    // 僅在 dashboard.html 中執行
    initCalendar();
    updateTime();
    setInterval(updateTime, 1000);
    loadHomeworkData();
  }
});
