import React from 'react';
import Book from './book';
import BookShelf from './bookShelf';
import Header from './header';
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
  }

  updateShelf = (shelf, title) => {
    this.setState((state) => ({
      books: state.books.map((book) => book.title === title ? Object.assign({}, book, { shelf }) : book),
    }));
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books, booksLoading: false });
      });
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.books && this.state.books
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
        ) : (
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
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp;
