import React from 'react';

function BookShelf(props) {
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{props.shelfType}</h2>
			<div className="bookshelf-books">
				{props.children}
			</div>
		</div>
	);
}

export default BookShelf;
