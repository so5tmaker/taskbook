import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Breadcrumb, BreadcrumbItem,
    Button, Row, Col, Label
} from 'reactstrap';
import { Control, Form } from 'react-redux-form';

class Edit extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.props.editTask(values);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Edit Task</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>Edit Task</h3>
                        <hr />
                    </div>
                </div>
                <div className='row row-container'>
                    <div className='col-12 col-md-9'>
                        {<Form id='create-task' model="task" encType="multipart/form-data" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="username" md={2}>Your Name: {this.props.username}</Label>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email:  {this.props.email}</Label>
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
                                <Label htmlFor="text" md={2}>Your Task</Label>
                                <Col md={10}>
                                    <Control.textarea model=".text" name="text"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">
                                        Edit
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;