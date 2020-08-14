import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingIndicator = (props) => {
  return (
    <>
      <Spinner animation="border" variant="primary"/>
    </>
  );
}

export default LoadingIndicator;