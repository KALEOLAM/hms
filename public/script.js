// 模擬用戶數據
const users = {
  user: "password",
};

// 登入表單邏輯
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (users[username] && users[username] === password) {
    document.getElementById("login-container").classList.add("hidden");
    document.getElementById("main-container").classList.remove("hidden");
    initCalendar();
    updateTime();
    setInterval(updateTime, 1000);
    loadHomeworkData(); // 加載家課數據
  } else {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "用戶名或密碼錯誤，請重試！";
    errorMessage.style.display = "block";
  }
});

// 動態生成日曆
function initCalendar() {
  const today = new Date();
  const currentMonth = today.toLocaleString("zh-Hant", { month: "long" });
  document.getElementById("current-month").textContent = currentMonth;
}

// 更新香港時間
function updateTime() {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" }));
  const timeString = now.toLocaleTimeString("zh-Hant", { hour12: false });
  document.getElementById("current-time").textContent = timeString;
}

// 加載家課數據
function loadHomeworkData() {
  fetch("homework_data.json")
    .then((response) => response.json())
    .then((data) => {
      const homeworkList = document.getElementById("homework-list");
      homeworkList.innerHTML = "";

      const today = new Date().toISOString().split("T")[0];
      const todayHomework = data[today] || [];

      if (todayHomework.length) {
        todayHomework.forEach((homework) => {
          const li = document.createElement("li");
          li.innerHTML = `<strong>${homework.subject}</strong>: ${homework.description}`;
          homeworkList.appendChild(li);
        });
      } else {
        homeworkList.innerHTML = "<li>今天沒有家課記錄。</li>";
      }
    })
    .catch(() => {
      document.getElementById("homework-list").innerHTML = "<li>無法加載家課數據。</li>";
    });
}
