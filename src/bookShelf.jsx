import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookShelf extends Component {

  state = {
	  loading: this.props.loading,
  }

  componentWillReceiveProps(nextProps) {
	   this.setState({
       loading: nextProps.loading
     });
  }

  render() {
  	return (
  		<div className="bookshelf">
  			<h2 className="bookshelf-title">{this.props.shelfType}</h2>
  			<div className="bookshelf-books">
          {this.state.loading ? <div className="loader">Loading...</div> : this.props.children}
  			</div>
  		</div>
  	);
  }
}

BookShelf.propTypes = {
  shelfType: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default BookShelf;
