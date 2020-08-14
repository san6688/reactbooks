import React from 'react';
import { Table } from 'react-bootstrap';
import BookItem from './BookItem';

const BookList = (props) => {
  const { books } = props;
  return (
    <Table bordered hover={false} >
      <thead>
        <tr>
          <th>Id</th>
          <th>Book Title</th>
          <th>Author(s)</th>
          <th>Pages</th>
          <th>Year</th>
          <th>City</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
      {
        books.map(book => <BookItem book={book} />)
      }
      </tbody>
    </Table>
  );
}

export default BookList;