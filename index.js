"use strict";



const addBookbtn = document.querySelector(".add-book");
const form = document.getElementsByClassName("wrapper")[0];

const library = [];


addBookbtn.onclick = () => {
  form.classList.remove("hidden");
};

form.onsubmit = (event) => {
  event.preventDefault();
  makeBook();
  //displayBooks();
};

const makeBook = () => {
  const book = new Book();
  book.title = document.getElementById("title").value;
  book.author = document.getElementById("author").value;
  book.pages = document.getElementById("pages").value;
  book.isRead = document.getElementById("done").checked;
  const isBookInLibrary = bookCheck(book);
  console.log(isBookInLibrary);

  if (!isBookInLibrary) {
    library.push(book);
    book.displayBook();
  } else {
    const alertMessage = document.getElementsByClassName("title-card")[0];
    alertMessage.innerText = "Book already in library";
    alertMessage.style.color = "red";
  }

};

const bookCheck = (book) => {
  for (let index = 0; index < library.length; index++) {
    const element = library[index].title;
    console.log(book.title, "-", element);
    if (book.title === element) {
      return true;
    } else {
      return false;
    }
  }
};

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}
Book.prototype.displayBook = function () {
  const bookCollection = document.getElementsByClassName("table-body")[0];
  const bookInfo = document.createElement("tr");
  bookInfo.className = "book-info";
  bookCollection.appendChild(bookInfo);

  const domTitle = document.createElement("td");
  domTitle.innerText = `${this.title}`;

  const domAuthor = document.createElement("td");
  domAuthor.innerText = `${this.author}`;

  const domPages = document.createElement("td");
  domPages.innerText = `${this.pages}`;

  const domStatus = document.createElement("td");
  if (this.isRead == true) {
    domStatus.className = "fas fa-check";
  } else {
    domStatus.className = "fas fa-times";
  }

  const domRemove = document.createElement("td");
  domRemove.className = "far fa-trash-alt";

  let domElements = [domRemove, domTitle, domAuthor, domPages, domStatus];
  domElements.forEach((element) => {
    bookInfo.appendChild(element);
  });
};
