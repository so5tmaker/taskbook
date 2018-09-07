import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
//import { DISHES } from '../shared/dishes';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        //dishes: DISHES,
        //selectedDish: null
    };
  }

  onDishSelect(dishId) {
    //this.setState({ selectedDish: dishId});
  }

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

export default Main;