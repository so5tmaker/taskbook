import React, { Component } from 'react';
import { Label, Button, Row, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleTask = this.handleTask.bind(this);
    }

    handleTask(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }

    render() {
        return (
            <div className='container'>
                <div className='col-12'>
                    <h3>Create Your Task</h3>
                </div>
                <div className='col-12 col-md-9'>
                    <LocalForm onSubmit={(values) => this.handleTask(values)}>
                        <Row className="form-group">
                            <Label htmlFor="username" md={2}>Name</Label>
                            <Col md={10}>
                                <Control.text model=".username" id="username" name="username"
                                    placeholder="User Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".username"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 3 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="email" md={2}>Email</Label>
                            <Col md={10}>
                                <Control.text model=".email" id="email" name="email"
                                    placeholder="Email"
                                    className="form-control"
                                    validators={{
                                        required, validEmail
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".email"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        validEmail: 'Invalid Email Address'
                                    }}
                                />
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
                </div>
            </div>
        );
    }
}

export default Create;