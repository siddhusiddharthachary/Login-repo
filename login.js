const form = document.getElementById('loginForm');
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

  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return;
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], (err, results) => {
      connection.release();

      if (err) {
        console.error(err);
        return;
      }

      if (results.length === 0) {
        alert('User not found');
        return;
      }

      const user = results[0];
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) {
          console.error(err);
          return;
        }

        if (match) {
          // Redirect user to eamcet.html
          window.location.href = '/eamcet.html';
        } else {
          alert('Incorrect password');
        }
      });
    });
  });
});