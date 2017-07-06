import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { search } from './BooksAPI';

const maxResults = 20;

const propTypes = {
  onNewBookList: PropTypes.func.isRequired,
};

class SearchBar extends React.Component {
  state = {
    query: '',
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.query === this.state.query) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query.length !== 0 ) {
      console.log(prevState.query);
      search(prevState.query, maxResults)
        .then(books => {console.log(books);this.props.onNewBookList(books)});
    }
  }

  updateQuery = (query) => {
    this.setState({ query });
  }

  render() {
    return (
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
    );
  }
}

SearchBar.propTypes = propTypes;

export default SearchBar;
