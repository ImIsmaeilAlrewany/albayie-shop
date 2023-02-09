//add active if clicked on drop-down-list
//add active to list of languages to show up

const dropArrow = document.getElementById('drop-down-list');
const dropList = document.getElementById('lang-list');

dropArrow.addEventListener('click', () => {
  if (dropArrow.classList.contains('active')) {
    dropArrow.classList.remove('active');
    dropList.classList.remove('active');
  } else {
    dropArrow.classList.add('active');
    dropList.classList.add('active');
  }
});

