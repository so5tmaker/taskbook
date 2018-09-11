import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardImg, CardText, CardTitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Preview extends Component {

    constructor(props) {
        super(props);
        this.state = { file: '', imagePreviewUrl: '' };
    }

    // Access store by defining context types
    static contextTypes = {
        store: PropTypes.object
    }

    get formValues() {
        // Get the redux store from context
        const { store } = this.context;
        const state = store.getState();
        console.log('image:', state);
        return state.task;
    }

    render() {
        let item = this.formValues;
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Preview</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Preview</h3>
                        <hr />
                    </div>
                    <div className='col-12 m-1'>
                        <Card>
                            <CardImg src={item.fileUpload} alt={item.username} />
                            <CardBody>
                                <CardTitle>{item.username}</CardTitle>
                                <CardText>{item.email}</CardText>
                                <CardText>{item.status === 0 ? 'The Task Was Done' : 'Pending...'}</CardText>
                                <CardText>{item.text}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 m-1">
                        <Link to="/create" >
                            <Button type="submit" color="primary">
                                Back
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Preview;    