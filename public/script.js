// 檢查用戶是否已經登入
if (!sessionStorage.getItem("loggedIn")) {
  document.body.innerHTML = `
    <div class="no-access">
      <h1>你沒有權限 No Access</h1>
    </div>
  `;
  setTimeout(() => {
    window.location.href = "index.html"; // 3秒後跳回登入頁面
  }, 3000);
}

// 模擬用戶數據
const users = {
  user: "password",
};

// 設定自動登出的計時器
let logoutTimer;
let logoutTimeRemaining = 600; // 600秒 (10分鐘)

function resetLogoutTimer() {
  clearTimeout(logoutTimer);
  logoutTimeRemaining = 600; // 重新設定為 600秒
  logoutTimer = setInterval(() => {
    if (logoutTimeRemaining > 0) {
      logoutTimeRemaining--;
      updateTime(); // 更新倒計時
    } else {
      alert("由於長時間未操作，您已被登出。");
      sessionStorage.removeItem("loggedIn");
      window.location.href = "index.html";
    }
  }, 1000); // 每秒更新倒計時
}

// 監聽使用者互動事件以重置登出計時器
["click", "keydown"].forEach((event) => {
  window.addEventListener(event, resetLogoutTimer);
});
resetLogoutTimer(); // 初始計時

// 更新香港時間與倒計時
function updateTime() {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" }));
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const timeString = `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
  document.getElementById("current-time").textContent = timeString;

  // 更新倒計時
  document.getElementById("logout-timer").textContent = `${logoutTimeRemaining}`;
}

// 處理登出邏輯
document.getElementById("logout-btn")?.addEventListener("click", function (e) {
  e.preventDefault();
  sessionStorage.removeItem("loggedIn");
  window.location.href = "index.html";
});

// 初始化日曆
function initCalendar() {
  const today = new Date();
  const currentMonth = today.toLocaleString("zh-Hant", { month: "long" });
  document.getElementById("current-month").textContent = currentMonth;

  const calendarTable = document.getElementById("calendar-table");
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  let tableContent = "<tr>";

  // 添加星期日到星期六的標題
  const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
  tableContent += weekdays.map((day) => `<th>${day}</th>`).join("");
  tableContent += "</tr><tr>";

  // 填充空白
  for (let i = 0; i < firstDayOfWeek; i++) {
    tableContent += "<td></td>";
  }

  // 填充日期
  for (let i = 1; i <= daysInMonth; i++) {
    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${i}`;
    tableContent += `<td class="calendar-day" data-date="${dateString}">${i}</td>`;
    if ((i + firstDayOfWeek) % 7 === 0) {
      tableContent += "</tr><tr>";
    }
  }
  tableContent += "</tr>";
  calendarTable.innerHTML = tableContent;

  // 高亮今天的日期
  const todayDate = today.getDate();
  const todayElement = document.querySelector(`[data-date='${today.getFullYear()}-${today.getMonth() + 1}-${todayDate}']`);
  if (todayElement) todayElement.classList.add("today");

  // 為每個日期設置選擇事件
  document.querySelectorAll(".calendar-day").forEach((cell) => {
    cell.addEventListener("click", function () {
      const selectedDate = this.getAttribute("data-date");
      sessionStorage.setItem("selectedDate", selectedDate); // 存儲用戶選擇的日期
      loadHomeworkData(selectedDate); // 加載家課資料
      updateSelectedDate(selectedDate); // 高亮選中的日期
    });
  });

  document.getElementById("loading-message").style.display = "none"; // 隱藏載入中訊息
}

// 高亮選中的日期
function updateSelectedDate(selectedDate) {
  document.querySelectorAll(".calendar-day").forEach((cell) => {
    cell.classList.remove("selected");
  });
  const selectedCell = document.querySelector(`[data-date='${selectedDate}']`);
  if (selectedCell) {
    selectedCell.classList.add("selected");
  }
}

// 加載家課數據
function loadHomeworkData(selectedDate) {
  fetch("homework_data.json")
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      const homeworkList = document.getElementById("homework-list");
      const todayHomework = data[selectedDate] || [];

      homeworkList.innerHTML = todayHomework.length
        ? todayHomework
            .map((homework) => `<div><strong>${homework.subject}</strong>: ${homework.description}</div>`)
            .join("")
        : "<div>當天沒有家課記錄。</div>";
    })
    .catch((error) => {
      document.getElementById("homework-list").innerHTML = `<div>無法加載家課數據。(${error.message})</div>`;
    });
}

// 初始化登入後的主頁面
document.addEventListener("DOMContentLoaded", () => {
  resetLogoutTimer();

  if (document.getElementById("current-time")) {
    initCalendar();
    updateTime();
    setInterval(updateTime, 1000); // 每秒更新時間與倒計時
  }

  // 歡迎訊息
  const username = sessionStorage.getItem("username") || "用戶";
  document.getElementById("welcome-message").textContent = `Hi! ${username} 歡迎回來`;
});

// 科目選擇改變時觸發的事件
document.getElementById("subject").addEventListener("change", function() {
  const subject = this.value;
  const groupContainer = document.getElementById("group-container");

  // 若科目是中文、英文或數學，顯示組別選擇框，否則隱藏
  if (["中文", "英文", "數學"].includes(subject)) {
    groupContainer.style.display = "block";
  } else {
    groupContainer.style.display = "none";
  }
});

// 初始化科目選擇
document.addEventListener("DOMContentLoaded", function() {
  const initialSubject = document.getElementById("subject").value;
  if (["中文", "英文", "數學"].includes(initialSubject)) {
    document.getElementById("group-container").style.display = "block";
  } else {
    document.getElementById("group-container").style.display = "none";
  }
});
