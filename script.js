// Mock database
const users = [
  { username: "user", password: "password" }
];

const loginForm = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");
const loginContainer = document.getElementById("login-container");
const mainContainer = document.getElementById("main-container");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Validate credentials
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Success
    loginContainer.classList.add("hidden");
    mainContainer.classList.remove("hidden");
  } else {
    // Error
    errorMessage.textContent = "用戶名或密碼錯誤！請重試。";
    errorMessage.style.display = "block";
  }
});

