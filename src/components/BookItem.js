import React from 'react';

const BookItem = ({ book }) => {
  return (
    <tr>
      <td>{book['id']}</td>            
      <td>{book['book_title']}</td>
      <td>{book['book_author'].join()}</td>
      <td>{book['book_pages']}</td>
      <td>{book['book_publication_year']}</td>
      <td>{book['book_publication_city']}</td>
      <td>{book['book_publication_country']}</td>
    </tr>
  );
}

export default BookItem;