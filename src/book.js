import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.array,
  bookCover: PropTypes.string,
  book: PropTypes.string,
  onShelfChange: PropTypes.func,
};

class Book extends Component {

  state = {
    value: this.props.book.shelf,
  };

  render() {
    const {book, onShelfChange} = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.bookCover})` }}></div>
          <div className="book-shelf-changer">
            <select value={this.state.value} onChange={(event) => onShelfChange(book, event.target.value)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        {this.props.authors &&
          this.props.authors
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
