//toggle active function
//remove active function when click else where
const toggleActive = (button, toggler, close = false) => {
  button.onclick = function () {
    if (Array.isArray(toggler))
      toggler.forEach(ele => ele.classList.toggle('active'));
    else
      toggler.classList.toggle('active');
  };
  if (close) {
    this.addEventListener('click', (e) => {
      if (e.target !== button && e.target !== toggler) {
        toggler.classList.remove('active');
      }
    });
  }
};


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

if (dropdown) toggleActive(dropdown, dropdownMenu);


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


//dashboard sidebar toggler work
const sidebarToggler = document.getElementById('sidebar-toggler');
const dashboardSidebar = document.querySelector('.dashboard-layout .row>div:first-child');
const dashboardContent = document.querySelector('.dashboard-layout .row>div:last-child');
const dashboardHeaderList = document.querySelector('.dashboard-layout .row>div:last-child .dashboard-header ul');

//toggle during click
if (sidebarToggler) sidebarToggler.onclick = function () {
  sidebarToggler.classList.toggle('active');
  if (sidebarToggler.classList.contains('active')) {
    dashboardSidebar.style.display = 'none';
    dashboardContent.classList = 'col-12 col-md-10 col-lg-9 pe-0';
    dashboardHeaderList.classList.add('px-2');
  } else {
    dashboardSidebar.style.display = 'block';
    dashboardContent.classList = 'col-8 col-sm-9 col-md-10 px-0';
    dashboardHeaderList.classList.remove('px-2');
  }
};


//management toggle active dashboard sidebar
const usersButton = document.getElementById('sidebar-users-button');
const productsButton = document.getElementById('sidebar-products-button');
const ordersButton = document.getElementById('sidebar-orders-button');
const usersManagement = document.getElementById('users-management');
const productsManagement = document.getElementById('products-management');
const ordersManagement = document.getElementById('orders-management');

if (usersButton) toggleActive(usersButton, [usersManagement, usersButton]);
if (productsButton) toggleActive(productsButton, [productsManagement, productsButton]);
if (ordersButton) toggleActive(ordersButton, [ordersManagement, ordersButton]);


//toggle active to dashboard sidebar to shrink it
const shrinkToggler = document.getElementById('shrink-toggler');

if (shrinkToggler) shrinkToggler.addEventListener('click', () => {
  shrinkToggler.classList.toggle('active');
  if (shrinkToggler.classList.contains('active')) {
    dashboardSidebar.classList.add('shrink');
    dashboardContent.classList.add('grow');
    [usersManagement, productsManagement, ordersManagement].forEach(ele => {
      ele.classList.add('management-float');
    });
  } else {
    dashboardSidebar.classList.remove('shrink');
    dashboardContent.classList.remove('grow');
    [usersManagement, productsManagement, ordersManagement].forEach(ele => {
      ele.classList.remove('management-float');
    });
  }
});


//toggle search box from none display to block and float in dashboard
const searchToggler = document.getElementById('search-toggler');
const searchForm = document.getElementById('search-box');

if (searchToggler) toggleActive(searchToggler, searchForm, true);


//message center toggler add and remove active
const messageToggler = document.getElementById('message-toggler');
const dropdownMessages = document.getElementById('dropdown-messages');

if (messageToggler) toggleActive(messageToggler, dropdownMessages, true);



//get data by fetching it and filter it functions
const adminTable = document.querySelector('#admin-table tbody');
const adminTableSelect = document.getElementById('admin-table-select');
// const adminTableSearch = document.getElementById('admin-search-admin');
const adminTableInfo = document.getElementById('admin-table-info');
// const adminTablePrevious = document.getElementById('admin-table-previous');
// const adminTableNext = document.getElementById('admin-table-next');

const createRow = (data) => {
  const tr = document.createElement('tr');
  const tdContent = [`${data.fName} ${data.lName}`, data.phoneNum, data.email, data.city || 'no address', data.createdAt.split('T')[0]];

  tdContent.forEach(content => {
    const cell = document.createElement('td');
    cell.innerHTML = content;
    cell.classList.add('text-nowrap');
    tr.appendChild(cell);
  });

  tr.setAttribute('role', 'button');
  adminTable.appendChild(tr);
};

let showAdmins;
if (adminTableSelect) adminTableSelect.addEventListener('change', () => {
  showAdmins = +adminTableSelect.value;
  adminTable.innerHTML = '';
  getAllUsers();
});

const getAllUsers = async () => {
  const res = await fetch(`http://127.0.0.1:3000/en/dash-board/users/getAll`, {
    method: 'GET'
  });
  try {
    const data = await res.json();
    const showAdminsNumber = showAdmins || +adminTableSelect.value;
    let allAdmins = data.admins;

    if (showAdminsNumber < allAdmins.length) {
      allAdmins = data.admins.slice(0, showAdminsNumber);
    } else {
      //next will be disabled and previous too
    }

    allAdmins.forEach(admin => {
      createRow(admin);
    });

    adminTableInfo.innerHTML = `Showing ${1} to ${allAdmins.length} of ${data.admins.length} entires`;
  } catch (err) {
    console.log('error', err);
  }
};

if (adminTable) getAllUsers();

