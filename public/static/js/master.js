//check screen size and hide the wrong header file
const wideAppearance = document.getElementById('wide-appearance');
const smallAppearance = document.getElementById('small-appearance');

//check inner width
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

dropdown.addEventListener('click', () => {
  dropdownMenu.classList.toggle('active');
});

//create form validation for register
