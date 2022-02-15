const form = document.querySelector('#form');
let counter = 0;

function fillBooks() {
  const getBooks = JSON.parse(localStorage.getItem('book-data'));
  if (getBooks !== null && getBooks.length > 0) {
    document.querySelector('.book-list').innerHTML = getBooks
      .map(
        (book) => `
<div class="book-item">
<label for="name">${book.title}</label>
<br>
<label for="author">${book.author}</label>
<br>
<button type="button" id="${counter}">Remove</button>
<hr>
</div>
`,
      )
      .join('');
  }
}
fillBooks();

function storeBooks(e) {
  e.preventDefault();
  let existingBooks = JSON.parse(localStorage.getItem('book-data'));
  const title = form.elements.name.value;
  const author = form.elements.author.value;
  const book = { title, author, counter };

  existingBooks = existingBooks === null ? [] : existingBooks;

  if (
    !(existingBooks.filter((book) => book.title === title && book.author === author).length > 0)
  ) {
    counter += 1;
    book.counter = counter;
    existingBooks.push(book);
  }
  localStorage.setItem('book-data', JSON.stringify(existingBooks));
  fillBooks();
}

form.addEventListener('submit', storeBooks);
