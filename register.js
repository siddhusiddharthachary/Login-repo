const form = document.getElementById('registerForm');
const pool = require('./dbConfig');
const emailjs = require('emailjs-com');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

emailjs.init(process.env.EMAILJS_USERNAME, process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_KEY);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = form.email.value;
  const password = form.password.value;
  const mobile_number = form.mobile_number.value;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error(err);
      return;
    }

    pool.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        return;
      }

      const query = 'INSERT INTO users (email, password, mobile_number) VALUES (?, ?, ?)';
      connection.query(query, [email, hash, mobile_number], (err, result) => {
        connection.release();

        if (err) {
          console.error(err);
          return;
        }

        // Send OTP to user's email
        const otp = Math.floor(100000 + Math.random() * 900000);
        const message = `Your OTP for registration is: ${otp}`;
        emailjs.send('service_1s4dyjm', 'template_8rbnesl', { to_email: email, message: message })
          .then((response) => {
            console.log('OTP sent to email:', response.status);
            // Redirect user to login page
            window.location.href = '/loginpage.html';
          }, (error) => {
            console.error('Error sending OTP:', error);
          });
      });
    });
  });
});