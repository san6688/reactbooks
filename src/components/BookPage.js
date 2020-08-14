import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Pagination, { Centered } from 'react-router-pagination';
import BookList from './BookList';
import LoadingIndicator from './LoadingIndicator';

const BookPage = (props) => {
  const { page } = useParams();
  const [ bookApiResponse, setBookApiResponse ] = useState({ books: [], count: 0});
  const [ showProgressIndicator, setShowProgressIndicator ] = useState(true);
  const [ searchVal, setSearchVal ] = useState("");
  const [ filterVal, setFilterVal ] = useState("");

  const fetchBooksApi = async (pageIndex, filter) => { 
    setShowProgressIndicator(true); 
    let bodyParams = {};    
    bodyParams.page = pageIndex;
    if(filter && filter !== ""){
      bodyParams.filter = [{
        type: 'all',
        values: [filter]
      }]; 
    }    
    const apiResponse = await axios.post('http://nyx.vima.ekt.gr:3000/api/books',bodyParams);  
    setBookApiResponse(apiResponse.data);
    setShowProgressIndicator(false); 
  };

  //Hook to run api fetch on component mount
  useEffect(() => { 
    fetchBooksApi(page, filterVal);
  }, [page, filterVal]);

  return (
    <Container style={{ marginTop: 50, padding: 50}}>  
      <Row>
        <Col>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Form>
              <Form.Group>
                <Form.Control
                    type="text"
                    name="search"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    onBlur={() => setFilterVal(searchVal)}
                    placeholder="Search ..."
                  />
                </Form.Group>
              </Form>
          </div>
        </Col>  
      </Row>  
    {
        bookApiResponse['count'] > 0 && <Row>
          <Col>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Centered totalPages={Pagination.calculateTotalPages(bookApiResponse.count, 20)} pageNumber={page} spread={5} />
            </div>
          </Col>
        </Row>
      } 
      <Row>
        <Col>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 30}}>
          {
            showProgressIndicator && <LoadingIndicator />
          }
          {
            !showProgressIndicator && <BookList books={bookApiResponse['books']}/>            
          }         
        </div>
        </Col>
      </Row> 
      
    </Container>
  );
}

export default BookPage;