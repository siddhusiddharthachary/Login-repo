// Initialize EmailJS with your user ID
emailjs.init('your_user_id'); // Replace 'your_user_id' with your EmailJS user ID

// Function to send OTP via EmailJS
// script.js

function sendOTP(event) {
    event.preventDefault();

    const email = document.querySelector('input[type="email"]').value;

    const OTP = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

    // Send OTP via EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', { to_email: email, otp: OTP })
        .then(function(response) {
            console.log('OTP sent successfully!', response.status, response.text);
            alert('OTP sent to your email. Please check and verify.');
        }, function(error) {
            console.error('Error sending OTP:', error);
            alert('Error sending OTP. Please try again.');
        });
}



// Function to generate a 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

// Function to display OTP input field and verify button
function displayOTPInput() {
    document.getElementById('otpInputContainer').style.display = 'block';
    document.getElementById('verifyOTPButton').style.display = 'block';
}

// Function to verify the entered OTP
function verifyOTP(event) {
    event.preventDefault();

    const enteredOTP = document.getElementById('otpInput').value;

    // Retrieve the stored generated OTP from localStorage
    const generatedOTP = localStorage.getItem('generatedOTP');

    // Validate entered OTP with the stored OTP
    if (enteredOTP === generatedOTP) {
        alert('OTP verified successfully. You can proceed with the application.');
        // Add logic to submit the form or redirect to the next page
    } else {
        alert('Invalid OTP. Please try again.');
    }
}
