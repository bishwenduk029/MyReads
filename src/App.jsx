import React from 'react';
import { Link, Route } from 'react-router-dom';
import Book from './book';
import BookShelf from './bookShelf';
import Header from './header';
import escapeRegExp from "escape-string-regexp";
import sortBy from 'sort-by';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [],
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
    showSearchPage: false,
    booksLoading: true,
    query: '',
  }

  updateShelf = (shelf, id) => {
    this.setState((state) => ({
      books: state.books.map(book => book.id === id ? Object.assign({}, book, { shelf }) : book),
    }));
    const bookToUpdate = this.state.books.find(book => book.id === id);
    BooksAPI.update(bookToUpdate, shelf);
  }

  updateQuery = (query) => {
    this.setState({
      query: query.trim(),
    });
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books, booksLoading: false });
      });
  }

  render() {
    let showBooks;
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), "i");
      const showByAuthorBooks = this.state.books
        .filter(book => book.authors.map((author) => match.test(author)).find(boolValue => boolValue === true))
        .sort(sortBy('title'));
      const showByTitleBooks = this.state.books
        .filter(book => match.test(book.title))
        .sort(sortBy('title'));
      showBooks = [...showByTitleBooks, ...showByAuthorBooks];
    } else {
      showBooks = this.state.books;
    }

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <Header title='MyReads'/>
            <div className="list-books-content">
              <div>
                {this.state.shelves.map((shelf) => (
                  <BookShelf
                    key={shelf.id}
                    loading={this.state.booksLoading}
                    shelfType={shelf.name}
                  >
                    <ol className="books-grid">
                      {this.state.books && this.state.books
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
                              onShelfChange={this.updateShelf}
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
        )}
        />
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  value={this.state.query}
                  onChange={(event) => this.updateQuery(event.target.value)}
                  placeholder="Search by title or author"
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {showBooks && showBooks
                  .sort(sortBy('title'))
                  .map((book, index) => (
                    <li key={index}>
                      <Book
                        id={book.id}
                        shelf={book.shelf}
                        title={book.title}
                        authors={book.authors}
                        bookCover={book.imageLinks.thumbnail}
                        onShelfChange={this.updateShelf}
                      />
                    </li>
                  ))
                }
              </ol>
            </div>
          </div>
        )}
        />
      </div>
    );
  }
}

export default BooksApp;
