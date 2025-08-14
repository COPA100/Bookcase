// DOM CODE DOM CODE DOM CODE DOM CODE DOM CODE DOM CODE DOM CODE DOM CODE DOM CODE DOM CODE DOM CODE
const dialog = document.getElementById("bookDialog");
const openBtn = document.getElementById("newBook");
const closeBtn = document.getElementById("closeBtn");
const submitBtn = document.getElementById("submitBtn");

newBook.addEventListener("click", () => {
  dialog.classList.add("animate-fade-up");
  dialog.show();
  setTimeout(() => {
    dialog.classList.remove("animate-fade-up");
  }, 500);
});

closeBtn.addEventListener("click", () => {
  dialog.classList.add("animate-fade-out");
  setTimeout(() => {
    dialog.close();
    dialog.classList.remove("animate-fade-out");
  }, 100);
});

submitBtn.addEventListener("click", () => {
  dialog.classList.add("animate-fade-out");
  setTimeout(() => {
    dialog.close();
    dialog.classList.remove("animate-fade-out");
  }, 100);

  const text = document.getElementById("titleInput");
  const author = document.getElementById("authorInput");
  const pages = document.getElementById("pagesInput");
  const checkbox = document.getElementById("checkboxInput");
  addBookToLibrary(text, author, pages, checkbox);
});

// DATA CODE DATA CODE DATA CODE DATA CODE DATA CODE DATA CODE DATA CODE DATA CODE DATA CODE DATA CODE
const myLibrary = [];

function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
  this.info = () => {
    return (
      this.title +
      " by " +
      this.author +
      ", " +
      this.pages +
      " pages, " +
      this.read
    );
  };
}

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
  const id = crypto.randomUUID();
  const newBook = new Book(title, author, pages, read, id);

  myLibrary.push(newBook);
  renderLibrary();
}

function renderLibrary() {
  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    const cardTemplate = ``;
  }
}

const harry = new Book("harry", "colin", "67", "not read yet");

console.log(harry.info());
