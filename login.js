function validateForm() {
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const errorMessage = document.getElementById('errorMessage');

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
    const phonePattern = /^[0-9]{10}$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;

    if (!username || !email || !phone || !password || !confirmPassword) {
        errorMessage.textContent = "All fields are required.";
        return false;
    }

    if (!emailPattern.test(email)) {
        errorMessage.textContent = "Invalid email format.";
        return false;
    }

    if (!phonePattern.test(phone)) {
        errorMessage.textContent = "Phone number must be 10 digits.";
        return false;
    }

    if (!passwordPattern.test(password)) {
        errorMessage.textContent = "Password must be at least 7 characters long, contain one uppercase letter, one digit, and one special character.";
        return false;
    }

    if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match.";
        return false;
    }

    alert("Form submitted successfully!");
    return true;
}
