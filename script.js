var title = document.querySelector("#title");
var author = document.querySelector("#author");
var pages = document.querySelector("#pages");
var read = document.querySelector("#read");
var table = document.querySelector("tbody");

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

};



const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
showButton.addEventListener("click", () => {
    dialog.showModal();
});

const closeButton = document.querySelector("#closeBTN");
closeButton.addEventListener('click', () => {
    dialog.close();
});

const addButton = document.querySelector("#addBTN");
addButton.addEventListener("click", (event) => {
    event.preventDefault();
    title.required = true;
    const book1 = new Book(title.value, author.value, pages.value, read.value);

    if (proveraValidnosti()) {

        addBookToLibrary(book1);
        dialog.close();
        refreshTable();
        console.log(myLibrary);
    }
});


function addBookToLibrary(book) {
    myLibrary.push(book);
};

function refreshTable() {
    table.innerHTML = "";
    myLibrary.forEach((element, index) => {
        var row = document.createElement('tr');
        row.setAttribute('id', index);

        const data = [element.title, element.author, element.pages];

        const tdRemove = document.createElement("td");
        tdRemove.innerText = "X"
        tdRemove.style.textAlign = "center";
        tdRemove.style.color = "red";
        tdRemove.setAttribute("data", index);
        tdRemove.addEventListener('click', () => {
            myLibrary.splice(index, 1);
            refreshTable();
        });
        row.appendChild(tdRemove);


        data.forEach(text => {
            const td = document.createElement('td');
            td.innerText = text;
            row.appendChild(td);
        });
        const td = document.createElement("td");
        td.innerText = element.read;
        td.setAttribute("id", "readCell");
        row.appendChild(td);
        td.addEventListener('click', () => {
            td.innerText == "Must read"
                ? td.innerText = "Do not read"
                : td.innerText = "Must read";
        });

        table.appendChild(row);
    });
};


function proveraValidnosti() {
    title.required = true;
    author.required = true;
    pages.required = true;

    if (!title.checkValidity() || !pages.checkValidity() || !author.checkValidity()) {
        alert("Popuni obelezenja polja");

    }
    else return true;
}