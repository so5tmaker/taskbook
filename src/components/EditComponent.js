import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Card, CardImg, CardText, CardBody, CardTitle,
    Breadcrumb, BreadcrumbItem,
    Button, Row, Col
} from 'reactstrap';
import { Control, Form } from 'react-redux-form';
import { LocalCard } from './TasksComponent.js'

class Edit extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.props.editTask(values, this.props.taskId);
    }

    render() {
        let task = {
            username: '',
            email: '',
            text: ''
        }
        if (this.props.task) {
            task = this.props.task.filter(task => task.id === parseInt(this.props.taskId, 10))[0];
        }
        if (this.props.admin) {
            return (
                <div className='col-12 col-md m-1'>
                    <LocalCard item={task} />
                </div>
            );
        } else {
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
                            <Card className='m-10 mb-5'>
                                <CardImg src={task.image_path} top width="30%" alt={task.username} />
                                <CardBody>
                                    <CardTitle className="ml-1">Your Name:  {task.username}</CardTitle>
                                    <CardText className="ml-1">Email: {task.email}</CardText>
                                    {<Form className='m-10' model="editTask" encType="multipart/form-data" onSubmit={(values) => this.handleSubmit(values)}>
                                        <Row className="form-group ml-1">
                                            <strong>Done? </strong>{' '}
                                            <Col md={{ offset: 1 }}>
                                                <Control.checkbox model=".status" name="status"
                                                    className="form-check-input"
                                                />
                                                Old value: {task.status === 0 ? 'Pending...' : 'The Task Was Done'}
                                            </Col>
                                        </Row>
                                        <Row className="form-group ml-1">
                                            Your Task
                                        <Col md={10}> Old value: {task.text}
                                                <Control.textarea model=".text" name="text"
                                                    rows="12"
                                                    className="form-control" />
                                            </Col>
                                        </Row>
                                        <Row className="form-group ml-1">
                                            <Col md={{ size: 10, offset: 1 }}>
                                                {task.username === '' ? 'Edit' : <Button type="submit" color="primary">Edit </Button>
                                                }
                                            </Col>
                                        </Row>
                                    </Form>
                                    }
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Edit;