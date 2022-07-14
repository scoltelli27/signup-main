const form = document.getElementById("form");
const nameEl = document.getElementById("firstname");
const lastNameEl = document.getElementById("lastname");
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");

//Utility functions

//Returns true if the input is empty
const isRequired = (value) => (value === "" ? false : true);

//Returns false if the length is not between min and max
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

//Valid email with Regex
const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

//Valid password
const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};

//Error function
const showError = (input, message) => {
  const formField = input.parentElement;

  formField.classList.remove("success");
  formField.classList.add("error");

  const error = formField.querySelector("small");
  error.textContent = message;
};

//Success function
const showSuccess = (input) => {
  const formField = input.parentElement;

  formField.classList.remove("error");
  formField.classList.add("success");

  const error = formField.querySelector("small");
  error.textContent = "";
};

//Name and last name validation
const checkUsername = () => {
  let valid = false;
  const min = 3,
    max = 25;
  const username = nameEl.value.trim();

  if (!isRequired(username)) {
    showError(nameEl, "First name cannot be blank.");
  } else if (!isBetween(username.length, min, max)) {
    showError(
      nameEl,
      `First name must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(nameEl);
    valid = true;
  }
  return valid;
};

const checkLastName = () => {
  let valid = false;
  const min = 3,
    max = 25;
  const lastName = lastNameEl.value.trim();

  if (!isRequired(lastName)) {
    showError(lastNameEl, "Last name cannot be blank.");
  } else if (!isBetween(lastName.length, min, max)) {
    showError(
      lastNameEl,
      `Last name must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(lastNameEl);
    valid = true;
  }
  return valid;
};

//Validate email
const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Email cannot be blank.");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Email is not valid.");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

//Validate password
const checkPassword = () => {
  let valid = false;

  const password = passwordEl.value.trim();

  if (!isRequired(password)) {
    showError(passwordEl, "Password cannot be blank.");
  } else if (!isPasswordSecure(password)) {
    showError(
      passwordEl,
      "Password must have at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
    );
  } else {
    showSuccess(passwordEl);
    valid = true;
  }

  return valid;
};

//Submit handler
form.addEventListener("submit", function (e) {
  // prevent the form from submitting
  e.preventDefault();

  // validate forms
  let isUsernameValid = checkUsername(),
    isLastNameValid = checkLastName(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword();

  let isFormValid =
    isUsernameValid && isEmailValid && isPasswordValid && isLastNameValid;

  // submit to the server if the form is valid
  if (isFormValid) {
    form.submit();
  }
});
