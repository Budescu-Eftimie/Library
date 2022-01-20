"use strict";
let library = [];

const addBookbtn = document.querySelector(".add-book");
const form = document.getElementsByClassName("wrapper")[0];
const table = document.getElementsByClassName("table-body")[0];

table.onclick = (e) => {
  const element = e.target;
  console.log(element.className);
  if (element.classList[0] == "toggle") {
    if (element.classList[2] == "fa-check") {
      element.className = "toggle fas fa-times";
    } else element.className = "toggle fas fa-check";
  }
  if (element.className == "far fa-trash-alt") {
    const bookTitle = element.nextElementSibling.innerText;
    removeBook(bookTitle);
  }
};

function removeBook(bookTitle) {
  console.log(bookTitle, library);
  library = library.filter((book) => book.title != bookTitle);
  renderBooks();
}

addBookbtn.onclick = () => {
  form.classList.remove("hidden");
};

form.onsubmit = (event) => {
  event.preventDefault();
  makeBook();
  //renderBookss();
};

const makeBook = () => {
  const book = new Book();
  book.title = document.getElementById("title").value;
  book.author = document.getElementById("author").value;
  book.pages = document.getElementById("pages").value;
  book.isRead = document.getElementById("done").checked;
  const isBookInLibrary = bookCheck(book);
  if (isBookInLibrary == false) {
    library.push(book);
    renderBooks();
    form.classList.add("hidden");
    form.reset();
  } else {
    const alertMessage = document.getElementsByClassName("title-card")[0];
    alertMessage.innerText = "Book already in library";
    alertMessage.style.color = "red";
  }
};

const bookCheck = (book) => {
  if (library.length > 0) {
    for (let index = 0; index < library.length; index++) {
      const element = library[index].title;
      if (book.title === element) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    return false;
  }
};

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}
const renderBooks = function () {
  const bookCollection = document.getElementsByClassName("table-body")[0];
  bookCollection.innerHTML = "";
  library.forEach((book) => {
    const bookInfo = document.createElement("tr");
    bookInfo.className = "book-info";
    bookCollection.appendChild(bookInfo);
    const domTitle = document.createElement("td");
    domTitle.innerText = `${book.title}`;

    const domAuthor = document.createElement("td");
    domAuthor.innerText = `${book.author}`;

    const domPages = document.createElement("td");
    domPages.innerText = `${book.pages}`;

    const domStatus = document.createElement("td");
    if (book.isRead == true) {
      domStatus.className = "toggle fas fa-check";
    } else {
      domStatus.className = "toggle fas fa-times";
    }

    const domRemove = document.createElement("td");
    domRemove.className = "far fa-trash-alt";

    bookInfo.append(domRemove, domTitle, domAuthor, domPages, domStatus);
  });
};
