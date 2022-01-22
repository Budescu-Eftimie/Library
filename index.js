"use strict";

let library = [
  { title: "AnalyserNo", author: "ggs", pages: 25, isRead: false },
  { title: "AnaalyserNo", author: "ggs", pages: 25, isRead: false },
  { title: "Analyso", author: "ggs", pages: 25, isRead: false },
];

//let library = [];

const addBookbtn = document.querySelector(".add-book");
const form = document.getElementsByClassName("form-wrapper")[0];
form.style.display = "none";
const table = document.getElementsByClassName("table-body")[0];

//

table.onclick = (e) => {
  const element = e.target;
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

//

addBookbtn.onclick = () => {
  form.style.display = "block";
};

form.onsubmit = (event) => {
  event.preventDefault();
  makeBook();
};

const makeBook = () => {
  const book = new Book();
  book.title = document.getElementById("title").value;
  book.author = document.getElementById("author").value;
  book.pages = document.getElementById("pages").value;
  book.isRead = document.getElementById("done").checked;
  const bookInLibrary = checkIfBookInLibrary(book);
  takeAction(book, bookInLibrary);
};

//

const takeAction = (book, bolean) => {
  const titleCardH2 = document.getElementsByClassName("title-card")[0];
  if (bolean == true) {
    titleCardH2.innerText = "Book already in library";
    titleCardH2.style.color = "red";
  } else {
    form.reset();
    form.style.display = "none";
    titleCardH2.innerText = "Add new Book";
    titleCardH2.style.color = "black";
    library.push(book);
    renderBooks();
  }
};

const checkIfBookInLibrary = (book) => {
  if (library.length < 1) return false;
  for (let index = 0; index < library.length; index++) {
    const element = library[index].title;
    if (book.title == element) {
      return true;
    } else {
      return false;
    }
  }
};
//

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}
const renderBooks = function () {
  const bookCollection = document.getElementsByClassName("table-body")[0];
  bookCollection.textContent = "";
  library.forEach((book) => {
    const bookInfo = document.createElement("tr");
    bookInfo.className = "book-info";
    bookCollection.appendChild(bookInfo);

    const tableTitleCol = document.createElement("td");
    tableTitleCol.innerText = `${book.title}`;

    const tableAuthorCol = document.createElement("td");
    tableAuthorCol.innerText = `${book.author}`;

    const tablePageCol = document.createElement("td");
    tablePageCol.innerText = `${book.pages}`;

    const toggleBookStatusBtn = document.createElement("td");
    if (book.isRead == true) {
      toggleBookStatusBtn.className = "toggle fas fa-check";
    } else {
      toggleBookStatusBtn.className = "toggle fas fa-times";
    }

    const tableRemoveBookBtn = document.createElement("td");
    tableRemoveBookBtn.className = "far fa-trash-alt";

    bookInfo.append(
      tableRemoveBookBtn,
      tableTitleCol,
      tableAuthorCol,
      tablePageCol,
      toggleBookStatusBtn
    );
  });
};
