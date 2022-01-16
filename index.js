"use strict";

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

let makeBook = () => {
  let books = [];
  const book = Object.create(Book);
  book.title = document.getElementById("title").value;
  book.author = document.getElementById("author").value;
  book.pages = document.getElementById("pages").value;
  book.isRead = document.getElementById("done").checked;
  let appendBook = () => {
    books.push(book);
    console.log(book,books);
  };
  return appendBook;
};

const main = () => {
  const addBookbtn = document.querySelector(".add-book");
  const form = document.getElementsByClassName("wrapper")[0];

  addBookbtn.onclick = () => {
    form.classList.remove("hidden");
  };

  form.onsubmit = (event) => {
    event.preventDefault();
    let books = makeBook();
    console.log(books());
  };
};

main();

// const addBookbtn = document.querySelector(".add-book");

// let form = document.getElementsByClassName("wrapper")[0];

// form.addEventListener('submit'; function (event) {

// 	// Prevent form from submitting to the server
// 	event.preventDefault();
//       let data = Object.fromEntries(new FormData(event.target).entries())
//       console.log(data)
