import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">TaskBook App</NavbarBrand>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default App;
