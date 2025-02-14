document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get form values
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const actionOption = document.getElementById('actionOption').value;
  const passkey = document.getElementById('passkey').value;

  // Basic validation
  if (!username || !password || !actionOption) {
      alert("Please fill in all required fields.");
      return;
  }

  // Validate passkey if "Enter Passkey" option is selected
  if (actionOption === "passkey" && !passkey) {
      alert("Please enter a passkey.");
      return;
  }

  // Prepare data to send to backend
  const loginData = {
      username: username,
      password: password,
      action: actionOption,
      passkey: actionOption === "passkey" ? passkey : null // Only include passkey if relevant
  };

  // Fetch request to login
  fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(loginData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log('Login Response:', data);
    if (data.success) {
      // If actionOption is "passkey", redirect to board2.html
      if (actionOption === "passkey") {
        window.location.href = "board2.html"; // Redirect to board2.html for passkey action
      } else {
        alert("Login successful! Redirecting to create board...");
        window.location.href = "board1.html"; // Redirect to create-board page
      }
    } else {
      alert("Login failed: " + data.message);
    }
  })
  .catch(error => {
    console.error("Error occurred during login:", error);
    alert("There was an error with your login. Please try again later.");
  });
});
