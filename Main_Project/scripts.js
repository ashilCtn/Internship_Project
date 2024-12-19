// Select form and inputs
const form = document.getElementById('registrationForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

// Event listener for form submission
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form from submitting
  validateForm();
});

// Add dynamic validation on input fields
fullName.addEventListener('input', () => validateField('nameError', fullName.value.trim().length >= 5));
email.addEventListener('input', () => validateField('emailError', email.value.includes('@')));
phone.addEventListener('input', () => validateField('phoneError', validatePhone(phone.value)));
password.addEventListener('input', () =>
  validateField(
    'passwordError',
    password.value.toLowerCase() !== 'password' &&
      password.value.toLowerCase() !== fullName.value.toLowerCase() &&
      password.value.length >= 8
  )
);
confirmPassword.addEventListener('input', () => validateField('confirmPasswordError', confirmPassword.value === password.value));

// Validate form function
function validateForm() {
  let isValid = true;

  // Validate Full Name
  if (fullName.value.trim().length < 5) {
    showError('nameError', 'Name must be at least 5 characters long');
    isValid = false;
  } else {
    clearError('nameError');
  }

  // Validate Email
  if (!email.value.includes('@')) {
    showError('emailError', 'Please enter a valid email with "@"');
    isValid = false;
  } else {
    clearError('emailError');
  }

  // Validate Phone Number
  if (!validatePhone(phone.value)) {
    showError('phoneError', 'Please enter a valid phone number');
    isValid = false;
  } else {
    clearError('phoneError');
  }

  // Validate Password
  if (
    password.value.toLowerCase() === 'password' ||
    password.value.toLowerCase() === fullName.value.toLowerCase() ||
    password.value.length < 8
  ) {
    showError('passwordError', 'Password must be at least 8 characters and not "password" or your name');
    isValid = false;
  } else {
    clearError('passwordError');
  }

  // Validate Confirm Password
  if (confirmPassword.value !== password.value) {
    showError('confirmPasswordError', 'Passwords do not match');
    isValid = false;
  } else {
    clearError('confirmPasswordError');
  }

  if (isValid) {
    alert('Form submitted successfully!');
    form.reset(); // Reset form after successful validation
  }
}

// Utility function to validate phone number
function validatePhone(number) {
  const phoneRegex = /^[0-9]{10,15}$/; // Accepts numbers with a length between 10 and 15
  return phoneRegex.test(number.trim());
}

// Utility functions to show and clear errors
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
}

function clearError(elementId) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = '';
}

// Utility function for dynamic validation
function validateField(elementId, isValid) {
  if (isValid) {
    clearError(elementId);
  }
}
