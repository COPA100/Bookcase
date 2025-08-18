// DATA CODE DATA CODE DATA CODE DATA CODE DATA CODE DATA CODE DATA CODE DATA CODE DATA CODE DATA CODE
let myLibrary = JSON.parse(localStorage.getItem("users")) || [];

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
  localStorage.setItem("users", JSON.stringify(myLibrary));
  main.innerHTML = "";

  libraryEmpty();

  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];

    let readIndicator;
    let readIndicatorChanger;
    let readIndicatorClass;
    if (book.read === true) {
      readIndicator = "Read";
      readIndicatorChanger = "Mark Unread";
      readIndicatorClass = "bg-green-200";
    } else {
      readIndicator = "Unread";
      readIndicatorChanger = "Mark Read";
      readIndicatorClass = "bg-red-200";
    }

    const cardTemplate = `
      <div
        data-book-id = "${book.id}" class="bg-gradient-to-tl from-gren2 to-gren1 p-4 rounded-lg shadow-sm hover:translate-y-[-2px] hover:shadow-lg transition-all duration-500"
      >
        <div class="flex flex-col gap-1 mb-4 text-gren3 font-semibold">
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 bg-gradient-to-br from-gren2 to-gren4 rounded-lg flex items-center justify-center shadow-sm"
            >
              <svg
                class="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"
                />
              </svg>
            </div>
            <h1 class="text-xl text-gren4">${book.title}</h1>
          </div>
          <div class="my-2">
            <div class="flex items-center gap-2">
              <svg
                class="w-4 h-4 text-gren3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clip-rule="evenodd"
                />
              </svg>
              <h2>${book.author}</h2>
            </div>
            <div class="flex items-center gap-2">
              <svg
                class="w-4 h-4 text-gren3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clip-rule="evenodd"
                />
              </svg>
              <h2>${book.pages}</h2>
            </div>
          </div>
          <span
            class="flex justify-center items-center gap-1 rounded-xl w-fit px-3 py-1 text-black/70 ${readIndicatorClass}"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <h2>${readIndicator}</h2>
          </span>
        </div>
        <div class="flex justify-stretch gap-4 text-white font-semibold">
          <button
            id = "readChange" class="bg-gradient-to-br from-gren2 to-gren3 px-3 py-2 rounded-lg flex-1 hover:shadow-md hover:scale-[102%] transition-all cursor-pointer"
          >
            ${readIndicatorChanger}
          </button>
          <button
            id = "deleteCard" class="bg-gradient-to-br from-red-400 to-red-500 px-3 py-2 rounded-lg flex-1 hover:shadow-md hover:scale-[102%] transition-all cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>`;

    main.innerHTML += cardTemplate;
  }
}

function deleteBook(bookId) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].id === bookId) {
      myLibrary.splice(i, 1);
    }
  }
  renderLibrary();
}

function toggleReadStatus(bookId) {
  for (let i = 0; i < myLibrary.length; i++) {
    const currentElement = myLibrary[i];
    if (currentElement.id === bookId) {
      currentElement.read = !currentElement.read;
      break;
    }
  }
  renderLibrary();
}

function libraryEmpty() {
  const element = document.getElementById("libraryEmptySection");

  if (myLibrary.length > 0) {
    element.classList.add("hidden");
    element.classList.remove("flex");
  } else {
    element.classList.remove("hidden");
    element.classList.add("flex");
  }
}

// DOM CODE DOM CODE DOM CODE DOM CODE DOM CODE DOM CODE DOM CODE DOM CODE DOM CODE DOM CODE DOM CODE
const main = document.querySelector("main");
const dialog = document.getElementById("bookDialog");
const openBtn = document.getElementById("newBook");
const closeBtn = document.getElementById("closeBtn");
const submitBtn = document.getElementById("submitBtn");

openBtn.addEventListener("click", () => {
  dialog.classList.add("animate-fade-up");
  dialog.showModal();
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

  const text = document.getElementById("titleInput").value;
  const author = document.getElementById("authorInput").value;
  const pages = document.getElementById("pagesInput").value;
  const checkbox = document.getElementById("checkboxInput").checked;
  addBookToLibrary(text, author, pages, checkbox);

  document.querySelector("form").reset();
});

main.addEventListener("click", (e) => {
  if (e.target.id === "readChange") {
    const book = e.target.closest("[data-book-id]");
    const theId = book.getAttribute("data-book-id");
    toggleReadStatus(theId);
  }
  if (e.target.id === "deleteCard") {
    const book = e.target.closest("[data-book-id]");
    const theId = book.getAttribute("data-book-id");
    deleteBook(theId);
  }
});

// INITIALIZE INITIALIZE INITIALIZE INITIALIZE INITIALIZE INITIALIZE
renderLibrary();
