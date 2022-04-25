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
		this.fillBooks()
	}

	fillBooks = () => {
		const strBookList = JSON.parse(localStorage.getItem('book-data'))

    if ((strBookList === null || strBookList.length) === 0) {
			const table = document.querySelector('table')
			table.innerHTML = `<h2 class="message"> You have not stored any book, <br><br> Click on "Add New" to add new book.<h2>`
			return
		}

		if (strBookList !== null && strBookList.length > 0) {
			const table = document.querySelector('table')
			table.innerHTML = ''
			strBookList.forEach((book, index) => {
				const tableRow = document.createElement('tr')
				tableRow.className = 'book-item'
				tableRow.id = `item-${index}`
				table.appendChild(tableRow)
				const tableDataDetail = document.createElement('td')
				tableDataDetail.textContent = `"${book.title}" by ${book.author} `
				const tableDatailBtn = document.createElement('td')
				tableDatailBtn.innerHTML = `<button type="button" id="btn-${index}" class="remove-btn">Remove</button>`
				tableRow.appendChild(tableDataDetail)
				tableRow.appendChild(tableDatailBtn)
			})

			document.querySelectorAll('.remove-btn').forEach(val => {
				val.addEventListener('click', event => {
					const val = event.target.id
					this.removeBook(val)
				})
			})
		} else {
			document.querySelector('table').innerHTML = ''
		}
	}

	storeBooks = e => {
		e.preventDefault()
		const form = document.querySelector('#form')
		let existingBooks = JSON.parse(localStorage.getItem('book-data'))
		const title = form.elements.name.value
		const author = form.elements.author.value
		const book = { title, author }

		existingBooks = existingBooks === null ? [] : existingBooks

		if (
			!(existingBooks.filter(book => book.title === title && book.author === author).length > 0) && (title.trim() !== '' && author.trim() !== ''
    		)		) {
			existingBooks.push(book)
		}
    localStorage.setItem('book-data', JSON.stringify(existingBooks))
		form.reset()
    this.fillBooks()
		const bookListNode = document.querySelector('#book-list')
		this.updateSection(bookListNode)
	}

	updateSection = item => {
		const linkList = document.querySelectorAll('.nav-item')
		const containerTitles = ['All awesome books', 'Add a new book', 'Contact information']
		linkList.forEach(node => {
			node.style.color = '#fff'
		})
		item.style.color = '#f30ff3'
		const activeSection = document.querySelector(`.${item.id}`)
		const contentList = document.querySelectorAll('.content')
		let titleIndex = 0
		contentList.forEach((val, index) => {
			val.style.display = 'none'
			let { className } = val
			className = className.split(' ')
			if (className[0] === item.id) {
				titleIndex = index
			}
		})
		document.getElementById('content-title').innerHTML = containerTitles[titleIndex]
		activeSection.style.display = 'flex'
	}
}

export default Book
