// Check if current user is logged in and redirect to dashboard
if (localStorage.getItem("currentUser")) {
    window.location.href = "dashboard.html";
  }
  
  // Signup Page Implementation
  const signupForm = document.querySelector("#signup-form");
  
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();
    const confirmPassword = document.querySelector("#confirm-password").value.trim();
    const name = document.querySelector("#name").value.trim();
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format!");
      return;
    }
  
    // Password validation
    if (password.length < 6) {
      alert("Password should be at least 6 characters long!");
      return;
    }
  
    // Confirm password validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    // Name validation
    if (name.length === 0) {
      alert("Name cannot be empty!");
      return;
    }
  
    // Get users from local storage or initialize empty array
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Check if user with the same email already exists
    if (users.some((user) => user.email === email)) {
      alert("User with the same email already exists!");
      return;
    }
  
    // Create user object and add to users array
    const user = { email, password, name };
    users.push(user);
  
    // Save users array to local storage
    localStorage.setItem("users", JSON.stringify(users));
  
    alert("Signup successful! Please log in.");
    window.location.href = "login.html";
  });
  
  // Login Page Implementation
  const loginForm = document.querySelector("#login-form");
  
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();
  
    // Get users from local storage or initialize empty array
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Check if user with provided email and password exists
    const currentUser = users.find((user) => user.email === email && user.password === password);
  
    if (currentUser) {
      // Create token for current user
      const token = Math.random().toString(36).substring(2, 18);
  
      // Save current user and token to local storage
      localStorage.setItem("currentUser", JSON.stringify({ ...currentUser, token }));
  
      alert("Login successful!");
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid email or password!");
    }
  });
  
//   // Dashboard Page Implementation
//   const dashboardContainer = document.querySelector("#dashboard-container");
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
//   if (!currentUser) {
//     alert("Please log in to access dashboard!");
//     window.location.href = "login.html";
//   } else {
//     const welcomeMessage = document.createElement("h2");
//     welcomeMessage.textContent = `Welcome, ${currentUser.name}!`;
  
//     const passwordForm = document.createElement("form");
//     const oldPasswordInput = document.createElement("input");
//     oldPasswordInput.setAttribute("type", "password");
//     oldPasswordInput.setAttribute("id", "old-password");
//     oldPasswordInput.setAttribute("placeholder", "Old Password");
//     const newPasswordInput = document.createElement("input");
//     newPasswordInput.setAttribute("type", "password");
//     newPasswordInput.setAttribute("id", "new
  
// Function to handle password change form submission
function handlePasswordChange(e) {
    e.preventDefault(); // Prevent default form submission behavior
    
    // Get form values
    const oldPassword = document.querySelector("#old-password").value.trim();
    const newPassword = document.querySelector("#new-password").value.trim();
    const confirmPassword = document.querySelector("#confirm-password")
    .value.trim();
    
    // Validate form input
    if (!oldPassword) {
    setErrorFor("#old-password", "Please enter your old password");
    return;
    }
    
    if (!newPassword) {
    setErrorFor("#new-password", "Please enter a new password");
    return;
    }
    
    if (!confirmPassword) {
    setErrorFor("#confirm-password", "Please confirm your new password");
    return;
    }
    
    if (newPassword !== confirmPassword) {
    setErrorFor(
    "#confirm-password",
    "New passwords do not match"
    );
    return;
    }
    
    // Get currentUser from localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    // Check if old password matches
    if (currentUser.password !== oldPassword) {
    setErrorFor("#old-password", "Old password is incorrect");
    return;
    }
    
    // Update user object
    currentUser.password = newPassword;
    
    // Update currentUser in localStorage
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    
    // Show success message
    showSuccess("#password-change-form", "Password updated successfully!");
    }
    
    // Function to handle logout button click
    function handleLogout() {
    // Remove currentUser from localStorage
    localStorage.removeItem("currentUser");
    
    // Redirect to login page
    window.location.href = "login.html";
    }
    
    // Function to check if user is logged in
    function checkLoggedIn() {
    // Get currentUser from localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    // If currentUser does not exist, redirect to login page
    if (!currentUser) {
    window.location.href = "login.html";
    }
    }
    
    // Function to set error message for form field
    function setErrorFor(field, message) {
    const formControl = document.querySelector(field).parentNode;
    const errorText = formControl.querySelector(".error-text");
    
    formControl.classList.add("error");
    errorText.innerText = message;
    }
    
    // Function to show success message for form submission
    function showSuccess(form, message) {
    const formEl = document.querySelector(form);
    const successMessage = document.createElement("p");
    
    successMessage.classList.add("success");
    successMessage.innerText = message;
    
    formEl.appendChild(successMessage);
    }
    
    // Function to validate email format
    function isValidEmail(email) {
    const emailRegex =
    /^([a-zA-Z0-9_-.+])+([a-zA-Z0-9_-.+])+@([a-zA-Z0-9_-])+.([a-zA-Z]{2,})$/;
    return emailRegex.test(email);
    }
    
    // Event listeners
    document.querySelector("#signup-form").addEventListener("submit", handleSignup);
    document.querySelector("#login-form").addEventListener("submit", handleLogin);
    document.querySelector("#password-change-form").addEventListener("submit", handlePasswordChange);
    document.querySelector("#logout-btn").addEventListener("click", handleLogout);
    
    // Check if user is logged in on load
    checkLoggedIn();