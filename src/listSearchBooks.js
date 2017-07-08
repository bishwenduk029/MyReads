import React, { Component } from 'react';
import sortBy from 'sort-by';
import PropTypes from 'prop-types';
import Book from './book';
import SearchBar from './searchBar';

const propTypes = {
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired,
};

class ListSearchBooks extends Component {

  state = {
    books: [],
  }

  updateBooksList = (books) => {
    if (books.hasOwnProperty('error')) {
      this.setState({ books: []});
    } else {
      this.checkAndUpdateShelf(books);
    }
  }

  checkAndUpdateShelf = (books) => {
    this.setState({
      books: books.map(book => {
        return this.props.books.find(userBook => userBook.id === book.id) || book;
      }),
    });
  }

  render() {

    return (
      <div className="search-books">
        <SearchBar onNewBookList={this.updateBooksList} />
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books && this.state.books
              .sort(sortBy('title'))
              .map((book, index) => (
                <li key={index}>
                  <Book
                    id={book.id}
                    shelf={book.shelf}
                    title={book.title}
                    authors={book.authors}
                    bookCover={book.imageLinks ? book.imageLinks.thumbnail : null}
                    onShelfChange={(shelf) => this.props.changeShelf(book, shelf)}
                  />
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    );
  }
}

ListSearchBooks.propTypes = propTypes;

export default ListSearchBooks;
