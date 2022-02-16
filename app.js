const form = document.querySelector('#form');

function removeBook(val) {
  const removeItem = val.split('-');
  let [id] = removeItem[1];
  id = parseInt(id, 10);
  let bookList = JSON.parse(localStorage.getItem('book-data'));
  bookList = bookList.filter((word, index) => index !== id);
  localStorage.setItem('book-data', JSON.stringify(bookList));
  const targetElement = document.getElementById(`item-${id}`);
  targetElement.remove();
}

function fillBooks() {
  const getBooks = JSON.parse(localStorage.getItem('book-data'));
  if (getBooks !== null && getBooks.length > 0) {
    document.querySelector('.book-list').innerHTML = getBooks
      .map(
        (book, index) => `
<div class="book-item" id="item-${index}">
<label for="name">${book.title}</label>
<br>
<label for="author">${book.author}</label>
<br>
<button type="button" id="btn-${index}" class="remove-btn">Remove</button>
<hr>
</div>
`,
      )
      .join('');

    document.querySelectorAll('.remove-btn').forEach((val) => {
      val.addEventListener('click', (event) => {
        const val = event.target.id;
        removeBook(val);
      });
    });
  } else {
    document.querySelector('.book-list').innerHTML = '';
  }
}

fillBooks();

function storeBooks(e) {
  e.preventDefault();
  let existingBooks = JSON.parse(localStorage.getItem('book-data'));
  const title = form.elements.name.value;
  const author = form.elements.author.value;
  const book = { title, author };

  existingBooks = existingBooks === null ? [] : existingBooks;

  if (
    !(existingBooks.filter((book) => book.title === title && book.author === author).length > 0)
  ) {
    existingBooks.push(book);
  }
  localStorage.setItem('book-data', JSON.stringify(existingBooks));
  form.elements.name.value = '';
  form.elements.author.value = '';
  fillBooks();
}

form.addEventListener('submit', storeBooks);