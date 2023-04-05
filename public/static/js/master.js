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

//select all adminTable elements
const adminTable = document.querySelector('#admin-table tbody');
const adminTableSelect = document.getElementById('admin-table-select');
const adminTableSearch = document.getElementById('admin-search-admin');
const adminTableInfo = document.getElementById('admin-table-info');
const adminTablePrevious = document.getElementById('admin-table-previous');
const adminTableNext = document.getElementById('admin-table-next');

//select all customerTable elements
const customerTable = document.querySelector('#customer-table tbody');
const customerTableSelect = document.getElementById('customer-table-select');
const customerTableSearch = document.getElementById('customer-search-admin');
const customerTableInfo = document.getElementById('customer-table-info');
const customerTablePrevious = document.getElementById('customer-table-previous');
const customerTableNext = document.getElementById('customer-table-next');

//select all new user Table elements
const newUserTable = document.querySelector('#newUser-table tbody');
const newUserTableSelect = document.getElementById('newUser-table-select');
const newUserTableSearch = document.getElementById('newUser-search-newUser');
const newUserTableInfo = document.getElementById('newUser-table-info');
const newUserTablePrevious = document.getElementById('newUser-table-previous');
const newUserTableNext = document.getElementById('newUser-table-next');

const createRow = (table, data, url, status = false) => {
  const tr = document.createElement('tr');
  const tdContent = [`${data.fName} ${data.lName}`, data.phoneNum, data.email, data.city || 'no address'];

  if (status) {
    data.online ? tdContent.push('online') : tdContent.push('offline');
  } else {
    tdContent.push(data.createdAt.split('T')[0]);
  }

  tdContent.forEach(content => {
    const cell = document.createElement('td');
    cell.innerHTML = content;
    cell.classList.add('text-nowrap');
    tr.appendChild(cell);
  });

  tr.setAttribute('role', 'button');
  table.appendChild(tr);

  //open user profile when click on it's row
  tr.addEventListener('click', async () => {
    location.href = url;
  });
};


//admin table activation
//search option in admin table
let searchAdminValue;
if (adminTableSearch) adminTableSearch.addEventListener('input', () => {
  searchAdminValue = adminTableSearch.value;
  adminTable.innerHTML = '';
  getAllAdmins(false, false, searchAdminValue);
});

//table rows adjust in admin table
let showAdmins;
if (adminTableSelect) adminTableSelect.addEventListener('change', () => {
  showAdmins = +adminTableSelect.value;
  adminTable.innerHTML = '';
  getAllAdmins(false, false, searchAdminValue);
});


const getAllAdmins = async (previous, next, search) => {
  const res = await fetch(`http://127.0.0.1:3000/en/dash-board/users/getAllAdmins` + `?search=${search}`, {
    method: 'GET'
  });
  try {
    const data = await res.json();
    const showAdminsNumber = showAdmins || +adminTableSelect.value;
    let allAdmins = data.admins;

    if (allAdmins.length === 0) {
      adminTable.innerHTML =
        '<tr class="text-muted text-center"><td colspan="5">No matching records found</td></tr>';
    }

    if (showAdminsNumber < allAdmins.length) {
      if (next) {
        lastLength = sessionStorage.getItem('showAdmins');
        allAdmins = data.admins.slice(+lastLength, (+lastLength + showAdminsNumber));
        sessionStorage.setItem('lastAdmin', +lastLength + allAdmins.length);
        adminTablePrevious.parentElement.classList.remove('disabled');

        if (data.admins.length <= (+lastLength + showAdminsNumber)) {
          adminTableNext.parentElement.classList.add('disabled');
        } else {
          lastLength = sessionStorage.setItem('showAdmins', +lastLength + showAdminsNumber);
        }
      } else if (previous) {
        lastLength = sessionStorage.getItem('showAdmins');
        allAdmins = data.admins.slice((+lastLength - showAdminsNumber), showAdminsNumber);
        sessionStorage.setItem('lastAdmin', +lastLength);
        adminTableNext.parentElement.classList.remove('disabled');

        if (+lastLength === showAdminsNumber) {
          adminTablePrevious.parentElement.classList.add('disabled');
        } else {
          sessionStorage.setItem('showAdmins', +lastLength - allAdmins.length);
        }
      } else {
        allAdmins = data.admins.slice(0, showAdminsNumber);
        sessionStorage.setItem('showAdmins', allAdmins.length);
        sessionStorage.setItem('lastAdmin', allAdmins.length);
        adminTablePrevious.parentElement.classList.add('disabled');
        adminTableNext.parentElement.classList.remove('disabled');
      }
    } else {
      sessionStorage.setItem('showAdmins', data.admins.length);
      sessionStorage.setItem('lastAdmin', data.admins.length);
      adminTablePrevious.parentElement.classList.add('disabled');
      adminTableNext.parentElement.classList.add('disabled');
    }

    allAdmins.forEach(admin => {
      createRow(adminTable, admin, `http://127.0.0.1:3000/en/dash-board/users/admin/profile/${admin._id}`);
    });

    if (allAdmins.length !== 0) {
      adminTableInfo.innerHTML = `Showing ${+sessionStorage.getItem('showAdmins') - (allAdmins.length - 1)} to ${+sessionStorage.getItem('lastAdmin')} of ${data.admins.length} entires`;
    } else {
      adminTableInfo.innerHTML = `Showing 0 to 0 of 0 entires`;
    }
  } catch (err) {
    console.log('error', err);
  }
};

if (adminTable) getAllAdmins();

//show previous in admin table
if (adminTablePrevious) adminTablePrevious.addEventListener('click', () => {
  adminTable.innerHTML = '';
  getAllAdmins(true, false, searchAdminValue);
});

//show next in admin table
if (adminTableNext) adminTableNext.addEventListener('click', () => {
  adminTable.innerHTML = '';
  getAllAdmins(false, true, searchAdminValue);
});


//customer table activation
//search option in customer table
let searchCustomerValue;
if (customerTableSearch) customerTableSearch.addEventListener('input', () => {
  searchCustomerValue = customerTableSearch.value;
  customerTable.innerHTML = '';
  getAllCustomers(false, false, searchCustomerValue);
});

//table rows adjust in customer table
let showCustomers;
if (customerTableSelect) customerTableSelect.addEventListener('change', () => {
  showCustomers = +customerTableSelect.value;
  customerTable.innerHTML = '';
  getAllCustomers(false, false, searchCustomerValue);
});


const getAllCustomers = async (previous, next, search) => {
  const res = await fetch(`http://127.0.0.1:3000/en/dash-board/users/getAllCustomers` + `?search=${search}`, {
    method: 'GET'
  });
  try {
    const data = await res.json();
    const showCustomersNumber = showCustomers || +customerTableSelect.value;
    let allCustomers = data.customers;

    if (allCustomers.length === 0) {
      customerTable.innerHTML =
        '<tr class="text-muted text-center"><td colspan="5">No matching records found</td></tr>';
    }

    if (showCustomersNumber < allCustomers.length) {
      if (next) {
        lastLength = sessionStorage.getItem('showCustomers');
        allCustomers = data.customers.slice(+lastLength, (+lastLength + showCustomersNumber));
        sessionStorage.setItem('lastAdmin', +lastLength + allCustomers.length);
        customerTablePrevious.parentElement.classList.remove('disabled');

        if (data.customers.length <= (+lastLength + showCustomersNumber)) {
          customerTableNext.parentElement.classList.add('disabled');
        } else {
          lastLength = sessionStorage.setItem('showCustomers', +lastLength + showCustomersNumber);
        }
      } else if (previous) {
        lastLength = sessionStorage.getItem('showCustomers');
        allCustomers = data.customers.slice((+lastLength - showCustomersNumber), showCustomersNumber);
        sessionStorage.setItem('lastCustomer', +lastLength);
        customerTableNext.parentElement.classList.remove('disabled');

        if (+lastLength === showCustomersNumber) {
          customerTablePrevious.parentElement.classList.add('disabled');
        } else {
          sessionStorage.setItem('showCustomers', +lastLength - allCustomers.length);
        }
      } else {
        allCustomers = data.customers.slice(0, showCustomersNumber);
        sessionStorage.setItem('showCustomers', allCustomers.length);
        sessionStorage.setItem('lastCustomer', allCustomers.length);
        customerTablePrevious.parentElement.classList.add('disabled');
        customerTableNext.parentElement.classList.remove('disabled');
      }
    } else {
      sessionStorage.setItem('showCustomers', data.customers.length);
      sessionStorage.setItem('lastCustomer', data.customers.length);
      customerTablePrevious.parentElement.classList.add('disabled');
      customerTableNext.parentElement.classList.add('disabled');
    }

    allCustomers.forEach(customer => {
      createRow(customerTable, customer, `http://127.0.0.1:3000/en/dash-board/users/customer/profile/${customer._id}`);
    });

    if (allCustomers.length !== 0) {
      customerTableInfo.innerHTML = `Showing ${+sessionStorage.getItem('showCustomers') - (allCustomers.length - 1)} to ${+sessionStorage.getItem('lastCustomer')} of ${data.customers.length} entires`;
    } else {
      customerTableInfo.innerHTML = `Showing 0 to 0 of 0 entires`;
    }
  } catch (err) {
    console.log('error', err);
  }
};

if (customerTable) getAllCustomers();

//show previous in customer table
if (customerTablePrevious) customerTablePrevious.addEventListener('click', () => {
  customerTable.innerHTML = '';
  getAllCustomers(true, false, searchCustomerValue);
});

//show next in customer table
if (customerTableNext) customerTableNext.addEventListener('click', () => {
  customerTable.innerHTML = '';
  getAllCustomers(false, true, searchCustomerValue);
});


//newUser table activation
//search option in newUser table
let searchNewUserValue;
if (newUserTableSearch) newUserTableSearch.addEventListener('input', () => {
  searchNewUserValue = newUserTableSearch.value;
  newUserTable.innerHTML = '';
  getAllNewUsers(false, false, searchNewUserValue);
});

//table rows adjust in newUser table
let showNewUsers;
if (newUserTableSelect) newUserTableSelect.addEventListener('change', () => {
  showNewUsers = +newUserTableSelect.value;
  newUserTable.innerHTML = '';
  getAllNewUsers(false, false, searchNewUserValue);
});


const getAllNewUsers = async (previous, next, search) => {
  const res = await fetch(`http://127.0.0.1:3000/en/dash-board/users/getAllNewUsers` + `?search=${search}`, {
    method: 'GET'
  });
  try {
    const data = await res.json();
    const showNewUsersNumber = showNewUsers || +newUserTableSelect.value;
    let allNewUsers = data.newUsers;

    if (allNewUsers.length === 0) {
      newUserTable.innerHTML =
        '<tr class="text-muted text-center"><td colspan="5">No matching records found</td></tr>';
    }

    if (showNewUsersNumber < allNewUsers.length) {
      if (next) {
        lastLength = sessionStorage.getItem('showNewUsers');
        allNewUsers = data.newUsers.slice(+lastLength, (+lastLength + showNewUsersNumber));
        sessionStorage.setItem('lastAdmin', +lastLength + allNewUsers.length);
        newUserTablePrevious.parentElement.classList.remove('disabled');

        if (data.newUsers.length <= (+lastLength + showNewUsersNumber)) {
          newUserTableNext.parentElement.classList.add('disabled');
        } else {
          lastLength = sessionStorage.setItem('showNewUsers', +lastLength + showNewUsersNumber);
        }
      } else if (previous) {
        lastLength = sessionStorage.getItem('showNewUsers');
        allNewUsers = data.newUsers.slice((+lastLength - showNewUsersNumber), showNewUsersNumber);
        sessionStorage.setItem('lastNewUser', +lastLength);
        newUserTableNext.parentElement.classList.remove('disabled');

        if (+lastLength === showNewUsersNumber) {
          newUserTablePrevious.parentElement.classList.add('disabled');
        } else {
          sessionStorage.setItem('showNewUsers', +lastLength - allNewUsers.length);
        }
      } else {
        allNewUsers = data.newUsers.slice(0, showNewUsersNumber);
        sessionStorage.setItem('showNewUsers', allNewUsers.length);
        sessionStorage.setItem('lastNewUser', allNewUsers.length);
        newUserTablePrevious.parentElement.classList.add('disabled');
        newUserTableNext.parentElement.classList.remove('disabled');
      }
    } else {
      sessionStorage.setItem('showNewUsers', data.newUsers.length);
      sessionStorage.setItem('lastNewUser', data.newUsers.length);
      newUserTablePrevious.parentElement.classList.add('disabled');
      newUserTableNext.parentElement.classList.add('disabled');
    }

    allNewUsers.forEach(newUser => {
      createRow(newUserTable, newUser, `http://127.0.0.1:3000/en/dash-board/users/customer/profile/${newUser._id}`, true);
    });

    if (allNewUsers.length !== 0) {
      newUserTableInfo.innerHTML = `Showing ${+sessionStorage.getItem('showNewUsers') - (allNewUsers.length - 1)} to ${+sessionStorage.getItem('lastNewUser')} of ${data.newUsers.length} entires`;
    } else {
      newUserTableInfo.innerHTML = `Showing 0 to 0 of 0 entires`;
    }
  } catch (err) {
    console.log('error', err);
  }
};

if (newUserTable) getAllNewUsers();

//show previous in newUser table
if (newUserTablePrevious) newUserTablePrevious.addEventListener('click', () => {
  newUserTable.innerHTML = '';
  getAllNewUsers(true, false, searchNewUserValue);
});

//show next in newUser table
if (newUserTableNext) newUserTableNext.addEventListener('click', () => {
  newUserTable.innerHTML = '';
  getAllNewUsers(false, true, searchNewUserValue);
});


//remove disabled when click on edit button
const editProfileData = document.getElementById('edit-profile-button');
const editProfileInputs = document.querySelectorAll('.dashboard-user-profile .profile #profile-edit-section input');
const editProfileSelects = document.querySelectorAll('.dashboard-user-profile .profile #profile-edit-section select');
const addPictureButton = document.getElementById('add-picture-label');
const saveEditData = document.getElementById('save-edit-button');
const saveEditPassword = document.getElementById('save-edit-password');

//collect all elements in arrays depend on their type (attribute, class)
const allAttrEdit = [...editProfileInputs, ...editProfileSelects];
const allClassEdit = [addPictureButton, saveEditData, saveEditPassword];

//create a function to remove disabled
const removeDisabled = (type, array, button) => {
  button.addEventListener('click', () => {
    if (type === 'attr') {
      array.forEach(ele => {
        ele.removeAttribute('disabled');
      });
    } else if (type === 'btn') {
      array.forEach(ele => {
        ele.classList.remove('disabled');
      });
    }
  });
};

if (editProfileData) removeDisabled('attr', allAttrEdit, editProfileData);
if (editProfileData) removeDisabled('btn', allClassEdit, editProfileData);


//user offline notice server
//before unload page fetch api to set false to user online

window.onbeforeunload = async function (e) {
  await fetch('http://127.0.0.1:3000/users/offline', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ online: false })
  });
};

//disable confirmation message
window.onbeforeunload = null;


//submit form after selecting an image with change
const editPicForm = document.getElementById('edit-picture-form');
const editPicInput = document.getElementById('upload-picture');

if (editPicInput) editPicInput.addEventListener('change', () => {
  editPicForm.submit();
});



//account side boxes links
//first I need to select all links and all links' block elements
const accountPictureBtn = document.querySelector('article ul li #profile-pic');
const accountInformationBtn = document.querySelector('article ul li #profile-info');
const accountPasswordBtn = document.querySelector('article ul li #profile-pass');
const accountBlockBtn = document.querySelector('article ul li #profile-block');
const accountDeleteBtn = document.querySelector('article ul li #profile-del');

const accountPictureEle = document.getElementById('profile-picture');
const accountInformationEle = document.getElementById('profile-information');
const accountPasswordEle = document.getElementById('profile-password');
const accountBlockEle = document.getElementById('profile-block');
const accountDeleteEle = document.getElementById('profile-delete');

//second will create a function to make it easy
const checkUrlAndMoveTo = (url, btn, ele) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    //if the url is the same url of the link will just move to the element smoothly
    //if not it will update the url and move to the element smoothly
    if (window.location === url || window.location.toString().includes(url)) {
      scroll({
        behavior: 'smooth',
        top: ele.offsetTop
      });
    } else {
      window.location = url;
      scroll({
        behavior: 'smooth',
        top: ele.offsetTop
      });
    }
  });
};

//url of the account page to check for the language
let AccountPageUrl;

if (window.location.toString().includes('http://127.0.0.1:3000/en')) {
  AccountPageUrl = 'http://127.0.0.1:3000/en/users/profile/63fd1cc7293d6e8c5e6d1ef1/general';
} else {
  AccountPageUrl = 'http://127.0.0.1:3000/ar/users/profile/63fd1cc7293d6e8c5e6d1ef1/general';
}

if (accountPictureBtn) checkUrlAndMoveTo(AccountPageUrl, accountPictureBtn, accountPictureEle);
if (accountInformationBtn) checkUrlAndMoveTo(AccountPageUrl, accountInformationBtn, accountInformationEle);
if (accountPasswordBtn) checkUrlAndMoveTo(AccountPageUrl, accountPasswordBtn, accountPasswordEle);
if (accountBlockBtn) checkUrlAndMoveTo(AccountPageUrl, accountBlockBtn, accountBlockEle);
if (accountDeleteBtn) checkUrlAndMoveTo(AccountPageUrl, accountDeleteBtn, accountDeleteEle);




