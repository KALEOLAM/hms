<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>主頁 - Maryknoll Homework Management System</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>Maryknoll Homework Management System</h1>
      <div class="current-time" id="current-time"></div>
    </header>
    <div id="loading-message" style="display: none;">載入中...</div> <!-- 載入中訊息 -->
    <div class="content">
      <!-- 日曆區域 -->
      <div class="calendar">
        <h3 id="current-month">載入中...</h3>
        <table id="calendar-table"></table>
      </div>
      <!-- 家課記錄區域 -->
      <div class="homework-section">
        <h2>家課記錄</h2>
        <ul class="task-list" id="homework-list"></ul>
      </div>

      <!-- 新增的登出和功課上載選項 -->
      <div class="action-buttons">
        <a href="#" id="logout-btn">登出</a>
        <a href="nms.html" id="upload-homework-btn">功課上載</a>
      </div>
    </div>
    <footer>
      <p>© 2024 Maryknoll Homework Management System</p>
    </footer>
  </div>
  <script src="script.js"></script>
</body>
</html>
