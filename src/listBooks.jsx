import React, { Component } from 'react';
import BookShelf from './bookShelf';
import Book from './book';
import Header from './header';
import { Link } from 'react-router-dom';
import sortBy from 'sort-by';
import PropTypes from 'prop-types';

class ListBooks extends Component {

  state = {
    shelves: [
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
    ],
  }

  render() {
    return (
      <div className="list-books">
        <Header title='MyReads'/>
        <div className="list-books-content">
          <div>
            {this.state.shelves.map((shelf) => (
              <BookShelf
                key={shelf.id}
                loading={this.props.loading}
                shelfType={shelf.name}
              >
                <ol className="books-grid">
                  {this.props.books && this.props.books
                    .filter((book) => book.shelf === shelf.id)
                    .sort(sortBy('title'))
                    .map((book, index) => (
                      <li key={index}>
                        <Book
                          id={book.id}
                          shelf={book.shelf}
                          title={book.title}
                          authors={book.authors}
                          bookCover={book.imageLinks.thumbnail}
                          onShelfChange={(shelf) => this.props.changeShelf(book, shelf)}
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
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default ListBooks;
