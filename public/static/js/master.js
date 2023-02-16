//check screen size and hide the wrong header file
const wideAppearance = document.getElementById('wide-appearance');
const smallAppearance = document.getElementById('small-appearance');

//check inner width
if (wideAppearance && smallAppearance)
  if (window.innerWidth >= 900) {
    wideAppearance.style.display = 'block';
    smallAppearance.style.display = 'none';
  } else {
    wideAppearance.style.display = 'none';
    smallAppearance.style.display = 'block';
  }

//toggle dropdown menu for language change in small appearance file
const dropdown = document.querySelector('#dropdown-lang button');
const dropdownMenu = document.getElementById('dropdown-menu');

if (dropdown) dropdown.addEventListener('click', () => {
  dropdownMenu.classList.toggle('active');
});

//create form validation for register
const registerForm = document.querySelector('.register-content .register-form');
const fNameInput = document.getElementById('f-name');
const lNameInput = document.getElementById('l-name');
const phoneNumInput = document.getElementById('phone-number');
const emailInput = document.getElementById('exampleInputEmail1');
const passOneInput = document.getElementById('exampleInputPassword1');
const passTwoInput = document.getElementById('exampleInputPassword2');
const registerCheckbox = document.getElementById('exampleCheck1');

/*
  green border function
  remove border-danger class
  add border-color class
  display none the message
*/
const greenBorder = (input, message) => {
  input.classList.remove('border-danger');
  input.classList.add('border-color');
  message.classList.add('d-none');
};

/*
  green border function
  add border-danger class
  display block the message
*/
const redBorder = (input, message) => {
  input.classList.add('border-danger');
  message.classList.remove('d-none');
};

//check first name and last name validation function
const validName = (input, message) => {
  input.addEventListener('input', (e) => {
    if (!e.target.value.match(/^[a-zA-Z]\S*$/) || e.target.value.length <= 2) {
      redBorder(input, message);
    } else {
      greenBorder(input, message);
    }
  });
};

//check first name validation
if (fNameInput) validName(fNameInput, document.querySelector('.register-content .register-form .fName-message'));

//check last name validation
if (lNameInput) validName(lNameInput, document.querySelector('.register-content .register-form .lName-message'));

//check phone number validation
if (phoneNumInput) phoneNumInput.addEventListener('input', (e) => {
  if (!e.target.value.match(/^[0-9]\S*$/) || e.target.value.length < 10) {
    redBorder(e.target, document.querySelector('.register-content .register-form .phoneNum-message'));
  } else {
    greenBorder(e.target, document.querySelector('.register-content .register-form .phoneNum-message'));
  }
});

//check email address validation
if (emailInput) emailInput.addEventListener('input', (e) => {
  if (!e.target.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
    redBorder(e.target, document.querySelector('.register-content .register-form .email-message'));
  } else {
    greenBorder(e.target, document.querySelector('.register-content .register-form .email-message'));
  }
});

//check password validation
if (passOneInput) passOneInput.addEventListener('input', (e) => {
  if (e.target.value.length >= 8 && e.target.value.length <= 20) {
    greenBorder(e.target, document.querySelector('.register-content .register-form .passOne-message'));
  } else {
    redBorder(e.target, document.querySelector('.register-content .register-form .passOne-message'));
  }
});

//check new password match the previous one
if (passTwoInput) passTwoInput.addEventListener('input', (e) => {
  if (e.target.value === passOneInput.value) {
    greenBorder(e.target, document.querySelector('.register-content .register-form .passTwo-message'));
  } else {
    redBorder(e.target, document.querySelector('.register-content .register-form .passTwo-message'));
  }
});

//a function to use with each input to remove d-none if input is valid
const removeNone = (inputVAl, event, selector) => {
  if (!inputVAl) {
    event.preventDefault();
    document.querySelector(selector).classList.remove('d-none');
  }
};

//check if all inputs are valid or not
if (registerForm) registerForm.addEventListener('submit', (e) => {
  removeNone(fNameInput.value, e, '.register-content .register-form .fName-message');
  removeNone(lNameInput.value, e, '.register-content .register-form .lName-message');
  removeNone(phoneNumInput.value, e, '.register-content .register-form .phoneNum-message');
  removeNone(emailInput.value, e, '.register-content .register-form .email-message');
  removeNone(passOneInput.value, e, '.register-content .register-form .passOne-message');
  removeNone(passTwoInput.value, e, '.register-content .register-form .passTwo-message');
  removeNone(registerCheckbox.checked, e, '.register-content .register-form .check-message');
});

