document.addEventListener('DOMContentLoaded', function() {
    // Signup Form Event Listener
    document.getElementById('registerForm').addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Basic form validation
        if (!username || !password || !confirmPassword) {
            alert('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        // Prepare data to be sent to the server
        const formData = {
            username: username,
            password: password
        };

        try {
            // Send data to the server via fetch API
            const response = await fetch('/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Check if the response is OK (status in the range 200-299)
            if (!response.ok) {
                const errorResult = await response.json();
                alert('Sign-up failed: ' + errorResult.message);
                return;
            }

            const result = await response.json();

            if (result.success) {
                // If sign-up is successful, redirect to stickit.html
                window.location.href = 'stickit.html'; // Redirect to the new page
            } else {
                alert('Sign-up failed: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during sign-up. Please try again.');
        }
    });

    // Login link redirect
    
});