import React, { Component } from 'react';
import {
    Navbar, Nav, NavbarBrand, NavItem, Jumbotron,
    Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label, 
    Button, Row, Col
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isTaskModalOpen: false,
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleTaskModal = this.toggleTaskModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    toggleTaskModal() {
        this.setState({
            isTaskModalOpen: !this.state.isTaskModalOpen
        });
    }

    handleLogin(event) {
        this.toggleModal();
        alert("Username: " + this.username.value + " Password: " + this.password.value
            + " Remember: " + this.remember.checked);
        event.preventDefault();
    }

    handleTask(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }

    render() {
        return (
            <React.Fragment>
                <Navbar dark>
                    <div className="container">
                        <NavbarBrand href="/">TaskBook App</NavbarBrand>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Button outline onClick={this.toggleTaskModal}>
                                    <span className="fa fa-pencil fa-lg"></span> Create Task
                                </Button>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Button outline onClick={this.toggleModal}>
                                    <span className="fa fa-sign-in fa-lg"></span> Login
                                </Button>
                            </NavItem>
                        </Nav>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Tasks for developers</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                        innerRef={(input) => this.remember = input} />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isTaskModalOpen} toggle={this.toggleTaskModal}>
                    <ModalHeader toggle={this.toggleTaskModal}>Create Task</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="username" md={2}>Name</Label>
                                <Col md={10}>
                                    <Control.text model=".username" id="username" name="username"
                                        placeholder="User Name"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 6, offset: 2 }}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".status" name="status"
                                                className="form-check-input"
                                            /> {' '}
                                            <strong>Is The Task Done?</strong>
                                        </Label>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="text" md={2}>Task</Label>
                                <Col md={10}>
                                    <Control.textarea model=".text" id="text" name="text"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">
                                        Submit Task
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Header;