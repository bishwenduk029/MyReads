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

  updateShelf = (bookToUpdate, shelf) => {
    if(bookToUpdate.shelf !== shelf) {
      BooksAPI.update(bookToUpdate, shelf)
        .then(() => {
          bookToUpdate.shelf = shelf;
          this.setState(state => ({
            books: state.books.filter(book => book.id !== bookToUpdate.id).concat([ bookToUpdate ]),
          }))
        });
    }
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
            changeShelf={this.updateShelf}
          />
        )}
        />
      </div>
    );
  }
}

export default BooksApp;
