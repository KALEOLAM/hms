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

// 處理登出邏輯
document.getElementById("logout-btn").addEventListener("click", function (e) {
  e.preventDefault();
  sessionStorage.removeItem("loggedIn"); // 清除登入狀態
  window.location.href = "index.html"; // 重定向到登入頁面
});
