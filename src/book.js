import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  book: PropTypes.object,
  onShelfChange: PropTypes.func,
};

class Book extends Component {

  render() {

    const {book, onShelfChange} = this.props;
    const bookCover = book.imageLinks ? book.imageLinks.thumbnail : null;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${ bookCover })` }}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={(event) => onShelfChange(book, event.target.value)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors &&
          book.authors
            .map((author, index) =>
              <div key={index} className="book-authors">{author}</div>
            )
        }
      </div>
    );
  }
}

Book.propTypes = propTypes;

export default Book;
