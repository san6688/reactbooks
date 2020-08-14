import React from 'react';
import { Form } from 'react-bootstrap';
import App from './App';
import BookItem from './components/BookItem';
import BookList from './components/BookList';
import BookPage from './components/BookPage';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { act } from 'react-dom/test-utils';

describe("Book Page Testing", () => {
  test('/ should redirect to /1', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/' ]}>
        <App/>
      </MemoryRouter>
    );    
    expect(wrapper.find(BookPage)).toHaveLength(1);    
  }); 

  test('Search Field is rendered', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/' ]}>
        <App/>
      </MemoryRouter>
    );    
    expect(wrapper.find(Form.Control)).toHaveLength(1); 
  }); 
  
});

describe("Book Item Testing", () => {
  let component;
  beforeEach(() => {
    const book = {
      id: 1,
      book_title: 'test book title',
      book_author: ['test author 1', 'test author 2'],
      book_publication_year: 1990,
      book_publication_city: 'test city',
      book_publication_country: 'test country',
      book_pages: 120,
    };
    component = mount(<BookItem book={book}/>);        
  })

  test("check tr component loaded", () => {       
    const trEle = component.find("tr");
    expect(trEle).toHaveLength(1);
    const child = trEle.find("td");
    expect(child).toHaveLength(7);
    expect(child.at(0).text()).toBe("1");
    expect(child.at(1).text()).toBe("test book title");
    expect(child.at(2).text()).toBe("test author 1,test author 2");
    expect(child.at(3).text()).toBe("120");
    expect(child.at(4).text()).toBe("1990");
    expect(child.at(5).text()).toBe("test city");
    expect(child.at(6).text()).toBe("test country");
  });
});

describe("Book List Testing", () => {
  let component;

  test("Empty Book arary as props", () => {    
    component = mount(<BookList books={[]}/>); 
    //table
    const tableEle = component.find("table");
    expect(tableEle).toHaveLength(1);

    //header
    const headerEle = tableEle.find("thead").find("tr").find("th");
    expect(headerEle).toHaveLength(7);

    const bodyEle = tableEle.find("tbody");
    expect(bodyEle).toHaveLength(1);

    expect(bodyEle.find("BookItem")).toHaveLength(0);
  });

  test("Book arary as props", () => {
    const book = {
      id: 1,
      book_title: 'test book title',
      book_author: ['test author 1', 'test author 2'],
      book_publication_year: 1990,
      book_publication_city: 'test city',
      book_publication_country: 'test country',
      book_pages: 120,
    };    
    component = mount(<BookList books={[book]}/>); 
    //table
    const tableEle = component.find("table");
    expect(tableEle).toHaveLength(1);

    //header
    const headerEle = tableEle.find("thead").find("tr").find("th");
    expect(headerEle).toHaveLength(7);

    const bodyEle = tableEle.find("tbody");
    expect(bodyEle).toHaveLength(1);

    expect(bodyEle.find("BookItem")).toHaveLength(1);
  });

});