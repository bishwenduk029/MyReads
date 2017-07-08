import React from 'react';
import BookShelf from './bookShelf';
import Book from './book';
import Header from './header';
import { Link } from 'react-router-dom';
import sortBy from 'sort-by';

const bookShelves = [
  {
    id: 'currentlyReading',
    name: 'Currently Reading',
  },
  {
    id: 'wantToRead',
    name: 'Want To Read',
  },
  {
    id: 'read',
    name: 'Read',
  }
];

function ListBooks({ books, changeShelf, loading }) {
  return (
    <div className="list-books">
      <Header title='MyReads'/>
      <div className="list-books-content">
        <div>
          {bookShelves.map((shelf) => (
            <BookShelf
              key={shelf.id}
              loading={loading}
              shelfType={shelf.name}
            >
              <ol className="books-grid">
                {books && books
                  .filter((book) => book.shelf === shelf.id)
                  .sort(sortBy('title'))
                  .map((book, index) => (
                    <li key={index}>
                      <Book
                        book={book}
                        onShelfChange={changeShelf}
                      />
                    </li>
                  ))
                }
              </ol>
            </BookShelf>
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  );
}

export default ListBooks;
