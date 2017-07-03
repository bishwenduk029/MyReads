import React, { Component } from 'react';
import Book from './book';
import { Link } from 'react-router-dom';
import escapeRegExp from "escape-string-regexp";
import sortBy from 'sort-by';
import PropTypes from 'prop-types';

class ListSearchBooks extends Component {

  state = {
    books: this.props.books,
    query: '',
    loading: this.props.loading,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.books !== this.props.books) {
      this.setState({
        books: nextProps.books,
      });
    }
    if (nextProps.loading !== this.props.loading) {
      this.setState({
        loading: nextProps.loading
      });
    }
  }

  updateQuery = (query) => {
    this.setState({
      query: query.trim(),
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
          {!this.state.loading ?
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
                      onShelfChange={(shelf) => this.props.changeShelf(book, shelf)}
                    />
                  </li>
                ))
              }
            </ol> : <div className="loader">Loading..</div>
          }
        </div>
      </div>
    );
  }
}

ListSearchBooks.propTypes = {
  books: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  changeShelf: PropTypes.func.isRequired,
};

export default ListSearchBooks;
