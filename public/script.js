// 檢查用戶是否已經登入
if (!sessionStorage.getItem("loggedIn")) {
  // 未登入，顯示 "No Access" 並重定向到 index.html
  document.body.innerHTML = "<h1>你沒有權限 No Access</h1>";
  setTimeout(() => {
    window.location.href = "index.html";  // 3秒後跳回登入頁面
  }, 3000);
}

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
    // 登入成功，將登入狀態保存在 sessionStorage
    sessionStorage.setItem("loggedIn", true);
    // 登入成功，重定向至主頁
    window.location.href = "dashboard.html";
  } else {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "用戶名或密碼錯誤，請重試！";
    errorMessage.style.display = "block";
  }
});

// 更新香港時間
function updateTime() {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" }));

  // 格式化為 "YYYY年MM月DD日 HH:mm:ss"
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 月份從 0 開始，所以加 1
  const day = now.getDate();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  const timeString = `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
  document.getElementById("current-time").textContent = timeString;
}

// 初始化日曆
function initCalendar() {
  const today = new Date();
  const currentMonth = today.toLocaleString("zh-Hant", { month: "long" });
  document.getElementById("current-month").textContent = currentMonth;

  const calendarTable = document.getElementById("calendar-table");
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  let tableContent = "<tr>";

  // 添加星期一至日的標題
  const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
  tableContent += weekdays.map(day => `<th>${day}</th>`).join('');
  tableContent += "</tr><tr>";

  for (let i = 1; i <= daysInMonth; i++) {
    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${i}`;
    tableContent += `<td class="calendar-day" data-date="${dateString}">${i}</td>`;
    if ((i + new Date(today.getFullYear(), today.getMonth(), 1).getDay()) % 7 === 0) {
      tableContent += "</tr><tr>";
    }
  }
  tableContent += "</tr>";
  calendarTable.innerHTML = tableContent;

  // 高亮今天的日期
  const todayDate = today.getDate();
  const todayElement = document.querySelector(`[data-date='${today.getFullYear()}-${today.getMonth() + 1}-${todayDate}']`);
  if (todayElement) todayElement.classList.add('today');

  // 為每個日期設置選擇事件
  document.querySelectorAll('.calendar-day').forEach(cell => {
    cell.addEventListener('click', function () {
      const selectedDate = this.getAttribute('data-date');
      sessionStorage.setItem('selectedDate', selectedDate); // 存儲用戶選擇的日期
      loadHomeworkData(selectedDate); // 加載家課資料
      updateSelectedDate(selectedDate); // 高亮顯示選中的日期
    });
  });
}

// 高亮顯示選中的日期
function updateSelectedDate(selectedDate) {
  const allCells = document.querySelectorAll('.calendar-day');
  allCells.forEach(cell => {
    cell.classList.remove('selected');
  });
  const selectedCell = document.querySelector(`[data-date='${selectedDate}']`);
  if (selectedCell) {
    selectedCell.classList.add('selected');
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

// 提交表單並將數據儲存到 JSON 文件
document.getElementById("homework-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const subject = document.getElementById("subject").value;
  const group = document.getElementById("group").value;
  const homework = document.getElementById("homework").value;
  const note = document.getElementById("note").value || "";  // 備注為空時設為空字符串

  if (!homework) {
    alert("功課內容不可空缺！");
    return;
  }

  const date = new Date().toISOString().split('T')[0]; // 獲取當前日期 (YYYY-MM-DD)
  
  // 取得已儲存的資料，若無則初始化為空物件
  const data = JSON.parse(localStorage.getItem("homeworkData")) || {};

  // 將資料儲存到當天的日期
  if (!data[date]) {
    data[date] = [];
  }
  data[date].push({ subject, group, homework, note });

  // 將更新後的資料儲存回 localStorage
  localStorage.setItem("homeworkData", JSON.stringify(data));

  alert("家課內容已成功提交！");

  // 重新加載頁面或進行其他操作
  window.location.reload();
});

// 初始化登入後的主頁面
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("current-time")) {
    // 僅在 dashboard.html 中執行
    initCalendar();
    updateTime();
    setInterval(updateTime, 1000); // 每秒更新一次時間

    // 加載選擇的日期家課記錄
    const selectedDate = sessionStorage.getItem('selectedDate');
    if (selectedDate) {
      loadHomeworkData(selectedDate);
      updateSelectedDate(selectedDate);
    }
  }
});
