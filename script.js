// 模拟用户数据
const users = {
  user: "password",
};

// 登录表单逻辑
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
    loadHomeworkData(); // 登录成功后加载家课数据
  } else {
    errorMessage.textContent = "用戶名或密碼錯誤，請重試！";
    errorMessage.style.display = "block";
  }
});

// 动态生成日历
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

// 更新香港时间
function updateTime() {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" }));
  const timeString = now.toLocaleTimeString("zh-Hant", { hour12: false });
  const dateString = now.toLocaleDateString("zh-Hant", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  document.getElementById("current-time").textContent = `${dateString} ${timeString}`;
}

// 加载家课数据
function loadHomeworkData() {
  fetch('/api/homework')
    .then(response => response.json())
    .then(data => {
      const homeworkList = document.getElementById("homework-list");
      homeworkList.innerHTML = ''; // 清空现有的列表
      if (data.length > 0) {
        data.forEach(homework => {
          const li = document.createElement("li");
          li.innerHTML = `<strong>${homework.subject} (${homework.class})</strong><br>${homework.description}`;
          homeworkList.appendChild(li);
        });
      } else {
        const li = document.createElement("li");
        li.textContent = "今天沒有家課。";
        homeworkList.appendChild(li);
      }
    })
    .catch(error => {
      console.error('Error fetching homework data:', error);
      const homeworkList = document.getElementById("homework-list");
      const li = document.createElement("li");
      li.textContent = "無法加載家課資料";
      homeworkList.appendChild(li);
      document.getElementById("db-status").textContent = "資料庫狀態 : 🔴 連接失敗";
    });
}
