const form = document.querySelector('#form')

class Book {
	constructor(title, author) {
		this.title = title
		this.author = author
	}

	removeBook = val => {
		const removeItem = val.split('-')
		let [id] = removeItem[1]
		id = parseInt(id, 10)
		let bookList = JSON.parse(localStorage.getItem('book-data'))
		bookList = bookList.filter((word, index) => index !== id)
		localStorage.setItem('book-data', JSON.stringify(bookList))
		const targetElement = document.getElementById(`item-${id}`)
		targetElement.remove()
	}

	fillBooks() {
		const strBookList = JSON.parse(localStorage.getItem('book-data'))
		if (strBookList !== null && strBookList.length > 0) {
			document.querySelector('.book-list').innerHTML = strBookList
				.map(
					(book, index) => `
<tr class="book-item" id="item-${index}">
<td>"${book.title}" by ${book.author} </td>
<td><button type="button" id="btn-${index}" class="remove-btn">Remove</button> </td>
</tr>
`,
				)
				.join('')

			document.querySelectorAll('.remove-btn').forEach(val => {
				val.addEventListener('click', event => {
					const val = event.target.id
					this.removeBook(val)
				})
			})
		} else {
			document.querySelector('.book-list').innerHTML = ''
		}
	}

	storeBooks = e => {
		e.preventDefault()
		let existingBooks = JSON.parse(localStorage.getItem('book-data'))
		const title = form.elements.name.value
		const author = form.elements.author.value
		const book = { title, author }

		existingBooks = existingBooks === null ? [] : existingBooks

		if (
			!(existingBooks.filter(book => book.title === title && book.author === author).length > 0)
		) {
			existingBooks.push(book)
		}
		localStorage.setItem('book-data', JSON.stringify(existingBooks))
		form.elements.name.value = ''
		form.elements.author.value = ''
		this.fillBooks()
	}
}

const bookObj = new Book()
bookObj.fillBooks()

form.addEventListener('submit', bookObj.storeBooks)
