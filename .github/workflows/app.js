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