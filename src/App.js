import React from 'react';
import './App.scss';
import { Container, Row, Col } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,  
  Redirect
} from "react-router-dom";
import BookPage from './components/BookPage';

function App() {
  return (
    <div >
      <Container>
        <Row>
          <Col style={{ height: '100%'}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Router>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => {
                      return (                 
                        <Redirect to="/1" /> 
                      )
                  }}
                />
                <Route exact path="/:page" component={BookPage} />
              </Switch>
              </Router>              
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
