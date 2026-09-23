const books = require('./books.json')

const booksName = findBookName(books);

function findBookName(data) {
    let booksName = [];

    for (let book of data.results) {
        booksName.push(book.name);
    }
    return booksName;
}

console.log(booksName);