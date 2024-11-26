// 模擬用戶數據
const users = {
  user: "password",
};

// 登入表單邏輯
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  if (users[username] && users[username] === password) {
    document.getElementById("login-container").classList.add("hidden");
    document.getElementById("main-container").classList.remove("hidden");
    initCalendar();
    updateTime();
    setInterval(updateTime, 1000);
    fetchHomework();  // 登入後立即從資料庫拉取當天家課
  } else {
    errorMessage.textContent = "用戶名或密碼錯誤，請重試！";
    errorMessage.style.display = "block";
  }
});

// 動態生成日曆
function initCalendar() {
  const today = new Date();
  const currentMonth = today.toLocaleString("zh-Hant", { month: "long" });
  const year = today.getFullYear();
  const firstDay = new Date(year, today.getMonth(), 1).getDay();
  const daysInMonth = new Date(year, today.getMonth() + 1, 0).getDate();

  document.getElementById("current-month").textContent = `${currentMonth} ${year}`;
  const table = document.getElementById("calendar-table");
  table.innerHTML = "<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>";

  let row = document.createElement("tr");
  for (let i = 0; i < firstDay; i++) {
    row.appendChild(document.createElement("td"));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("td");
    cell.textContent = day;
    if (day === today.getDate()) {
      cell.classList.add("today");
    }
    row.appendChild(cell);
    if ((firstDay + day) % 7 === 0) {
      table.appendChild(row);
      row = document.createElement("tr");
    }
  }
  table.appendChild(row);
}

// 更新香港時間
function updateTime() {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" }));
  const timeString = now.toLocaleTimeString("zh-Hant", { hour12: false });
  const dateString = now.toLocaleDateString("zh-Hant", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  document.getElementById("current-time").textContent = `${dateString} ${timeString}`;
}

// 從資料庫獲取當天的家課紀錄
async function fetchHomework() {
  try {
    const response = await fetch('/api/homework');  // 假設 API 路徑是 /api/homework
    if (response.ok) {
      const homeworkData = await response.json();
      displayHomework(homeworkData);
    } else {
      throw new Error('無法獲取家課資料');
    }
  } catch (error) {
    console.error('獲取家課資料失敗:', error);
    const homeworkList = document.getElementById('homework-list');
    homeworkList.innerHTML = '<li>無法加載家課資料</li>';
  }
}

// 顯示家課紀錄
function displayHomework(homeworkData) {
  const homeworkList = document.getElementById('homework-list');
  homeworkList.innerHTML = '';  // 清空原有列表

  if (homeworkData && homeworkData.length > 0) {
    homeworkData.forEach(homework => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<strong>${homework.subject}</strong><br>${homework.assignment}`;
      homeworkList.appendChild(listItem);
    });
  } else {
    homeworkList.innerHTML = '<li>今天沒有家課紀錄</li>';
  }
}
