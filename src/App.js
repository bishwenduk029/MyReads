import React from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './listBooks';
import ListSearchBooks from './listSearchBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [],
    booksLoading: true,
    query: '',
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books, booksLoading: false });
      });
  }

  insertNewBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(resp =>
        BooksAPI.get(book.id)
          .then(book => this.setState(prevState => ({
            books: [...prevState.books, book],
          })))
    );
  }

  updateShelf = (bookToUpdate, shelf) => {
    this.setState((prevState) => ({
      books: prevState.books.map(book => book.id === bookToUpdate.id ? Object.assign({}, book, { shelf }) : book),
    }));
    BooksAPI.update(bookToUpdate, shelf);
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            changeShelf={this.updateShelf}
            loading={this.state.booksLoading}
          />
        )}
        />
        <Route path="/search" render={() => (
          <ListSearchBooks
            books={this.state.books}
            changeShelf={this.insertNewBook}
          />
        )}
        />
      </div>
    );
  }
}

export default BooksApp;
