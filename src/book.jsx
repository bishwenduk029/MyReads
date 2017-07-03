import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {

  state = {
    value: this.props.shelf,
  };

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
    this.props.onShelfChange(event.target.value);
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.bookCover})` }}></div>
          <div className="book-shelf-changer">
            <select value={this.state.value} onChange={this.handleChange}>
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

Book.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  bookCover: PropTypes.string.isRequired,
  onShelfChange: PropTypes.func,
};

export default Book;
