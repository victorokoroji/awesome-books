import { Book, myDate } from './modules/app.js';

const bookObj = new Book();
bookObj.fillBooks();

const form = document.querySelector('#form');
form.addEventListener('submit', bookObj.storeBooks);
const diplayContainer = (item) => {
  const disObj = new Book();
  disObj.updateSection(item);
};

window.diplayContainer = diplayContainer;

document.getElementById('time-val').innerHTML = myDate();
