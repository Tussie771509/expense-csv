// Validate email format before submission
document.getElementById('registerForm').addEventListener('submit', (e) => {
  const email = document.getElementById('email').value;
  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  if (!emailPattern.test(email)) {
    e.preventDefault();
    alert('Please enter a valid email address.');
  }
});
