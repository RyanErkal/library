// Data Structures

// This function creates a new Book object.
// It takes four arguments: title, author, pages, and isRead.
// If the user does not provide these arguments, they default to "Unknown", "Unknown", "0", and false, respectively.
// It returns a Book object.
// Create a class Book
class Book {
	// The constructor takes 4 arguments, title, author, pages, isRead
	constructor(
		title = "Unknown",
		author = "Unknown",
		pages = "0",
		isRead = false
	) {
		// Assign the title argument to the title property
		this.title = title;
		// Assign the author argument to the author property
		this.author = author;
		// Assign the pages argument to the pages property
		this.pages = pages;
		// Assign the isRead argument to the isRead property
		this.isRead = isRead;
	}
}

// This code creates a Library class, which has a constructor method that creates an empty array to hold books. The addBook method will add a book to the library if it is not already in the library. The removeBook method will remove a book from the library. The getBook method will return the book with the given title. The isInLibrary method will return true if a book with the given title is in the library, otherwise it will return false.

class Library {
	constructor() {
		// Create a new property on this instance called books and set it to an empty array.
		this.books = [];
	}

	addBook(newBook) {
		// Check if the book is already in the library
		if (!this.isInLibrary(newBook)) {
			// If not, add the book to the library's books array.
			this.books.push(newBook);
		}
	}

	removeBook(title) {
		// Filter out the book with the given title from the library's books array.
		this.books = this.books.filter((book) => book.title !== title);
	}

	getBook(title) {
		// Return the book with the given title from the library's books array.
		return this.books.find((book) => book.title === title);
	}

	isInLibrary(newBook) {
		// Check if the book is already in the library
		return this.books.some((book) => book.title === newBook.title);
	}
}

const library = new Library();

// User Interface

const addBookBtn = document.getElementById("addBookBtn");
const addBookModal = document.getElementById("addBookModal");
const errorMsg = document.getElementById("errorMsg");
const overlay = document.getElementById("overlay");
const addBookForm = document.getElementById("addBookForm");
const booksGrid = document.getElementById("booksGrid");

// This function is called when the user clicks the "Add Book" button. It opens the modal for adding a new book.
const openAddBookModal = () => {
	addBookForm.reset();
	addBookModal.classList.add("active");
	overlay.classList.add("active");
};

// Adds an event listener to the add book button

const closeAddBookModal = () => {
	addBookModal.classList.remove("active");
	overlay.classList.remove("active");
	errorMsg.classList.remove("active");
	errorMsg.textContent = "";
};

const closeAllModals = () => {
	closeAddBookModal();
};

const handleKeyboardInput = (e) => {
	if (e.key === "Escape") closeAllModals();
};

// Reset the books grid to only show the books that are currently in the library
const updateBooksGrid = () => {
	resetBooksGrid();
	for (let book of library.books) {
		createBookCard(book);
	}
};

const resetBooksGrid = () => {
	booksGrid.innerHTML = "";
};

// Creates a new book card element
const createBookCard = (book) => {
	// Create the book card element
	const bookCard = document.createElement("div");

	// Create the title, author and pages elements
	const title = document.createElement("p");
	const author = document.createElement("p");
	const pages = document.createElement("p");

	// Create the button group element
	const buttonGroup = document.createElement("div");

	// Create the read and remove buttons
	const readBtn = document.createElement("button");
	const removeBtn = document.createElement("button");

	// Add the necessary classes to the elements
	bookCard.classList.add("book-card");
	buttonGroup.classList.add("button-group");
	readBtn.classList.add("btn");
	removeBtn.classList.add("btn");

	// Add the onclick functions to the buttons
	readBtn.onclick = toggleRead;
	removeBtn.onclick = removeBook;

	// Set the text content of the title, author and pages elements
	title.textContent = `"${book.title}"`;
	author.textContent = book.author;
	pages.textContent = `${book.pages} pages`;

	// Set the text content of the remove button
	removeBtn.textContent = "Remove";

	// Set the text content and class of the read button based on the book's read status
	if (book.isRead) {
		readBtn.textContent = "Read";
		readBtn.classList.add("btn-light-green");
	} else {
		readBtn.textContent = "Not read";
		readBtn.classList.add("btn-light-red");
	}

	// Attach the title, author and pages elements to the book card element
	bookCard.appendChild(title);
	bookCard.appendChild(author);
	bookCard.appendChild(pages);

	// Attach the read and remove buttons to the button group element
	buttonGroup.appendChild(readBtn);
	buttonGroup.appendChild(removeBtn);

	// Attach the button group element to the book card element
	bookCard.appendChild(buttonGroup);

	// Attach the book card element to the books grid
	booksGrid.appendChild(bookCard);
};

const getBookFromInput = () => {
	const title = document.getElementById("title").value;
	const author = document.getElementById("author").value;
	const pages = document.getElementById("pages").value;
	const isRead = document.getElementById("isRead").checked;
	return new Book(title, author, pages, isRead);
};

//This function adds a new book to the library object by getting the book values from the input fields and then adding it to the library array. It also checks to see if the book already exists in the library and will display an error message if it does. It then saves the library to local storage so the books persist after the page is reloaded and updates the display in the UI.

const addBook = (e) => {
	e.preventDefault();
	const newBook = getBookFromInput();

	if (library.isInLibrary(newBook)) {
		errorMsg.textContent = "This book already exists in your library";
		errorMsg.classList.add("active");
		return;
	}

	library.addBook(newBook);
	saveLocal();
	updateBooksGrid();
	closeAddBookModal();
};

// This code removes a book from the library and saves the new library
// to local storage. It then updates the books grid to reflect the
// changes.
const removeBook = (e) => {
	const title =
		e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll('"', "");
	library.removeBook(title);
	saveLocal();
	updateBooksGrid();
};

// This function toggles the read status of a book.
// It finds the book in the library, and then toggles its isRead property.

const toggleRead = (e) => {
	const title =
		e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll('"', "");
	const book = library.getBook(title);
	book.isRead = !book.isRead;
	saveLocal();
	updateBooksGrid();
};

addBookBtn.onclick = openAddBookModal;
overlay.onclick = closeAllModals;
addBookForm.onsubmit = addBook;
window.onkeydown = handleKeyboardInput;

// Local Storage

// When the user closes the browser, all of the data stored in the browser is lost. This means that all of the books in the library will be lost. In order to prevent this, we can store the book library in the browser's local storage. In order to save the library in the local storage, we need to convert the library to a JSON string using JSON.stringify. Then we can store the JSON string in the local storage using localStorage.setItem. We can also do this when the page loads using localStorage.getItem to retrieve the JSON string and then convert it back to a library using JSON.parse. This will allow us to restore the library when the page loads.

const saveLocal = () => {
	localStorage.setItem("library", JSON.stringify(library.books));
};

const restoreLocal = () => {
	const books = JSON.parse(localStorage.getItem("library"));
	if (books) {
		library.books = books.map((book) => JSONToBook(book));
	} else {
		library.books = [];
	}
};

// Utils

// This function takes an array of book objects and returns an array of book documents.
const docsToBooks = (docs) => {
	return docs.map((doc) => {
		return new Book(
			doc.data().title,
			doc.data().author,
			doc.data().pages,
			doc.data().isRead
		);
	});
};

// This function takes a JSON object and returns a Book object containing the same data.
const JSONToBook = (book) => {
	return new Book(book.title, book.author, book.pages, book.isRead);
};
