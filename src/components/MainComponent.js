import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Task from './TaskComponent';
import { TASKS } from '../shared/tasks';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        tasks: TASKS,
    };
  }

  render() {
    return (
        <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">TaskBook App</NavbarBrand>
          </div>
        </Navbar>
        <Task tasks={this.state.tasks} />
      </div>
    );
  }
}

export default Main;