import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Breadcrumb, BreadcrumbItem,
    Button, Row, Col, Label
} from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';
import { Resize } from './FileUploadComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

export function RenderMessage({ message, errMess }) {
    if (message) {
        let color = 'green';
        if (errMess) {
            color = 'red';
        }
        return (
            <div color={color}>{message}</div>
        )
    } else {
        return (
            <div></div>
        )
    }

}

class Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataUrl: '',
            imagePreviewUrl: '',
            message: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(values) {
        this.props.postTask(values);
        let message = '';
        if (this.props.errMess) {
            message = this.props.errMess;
        } else {
            message = 'You task was posted! Thank you!';
        }
        this.setState({ message: message });
    }

    handleChange = (e) => {
        let files = e.target.files;
        let self = this;
        Resize(files[0], 320, 240, (resizedDataUrl) => {
            self.setState({ dataUrl: resizedDataUrl });
        });

        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onloaded = () => {
            this.setState({
                imagePreviewUrl: [reader.result]
            });
            let { imagePreviewUrl } = this.state;
            this.props.setImage(imagePreviewUrl);
        }
    }

    render() {
        let image;

        let { dataUrl } = this.state;
        if (dataUrl) {
            this.props.setImage(dataUrl);
            image = <img src={dataUrl} alt='Upload example' />
        }
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Create Task</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>Create Task</h3>
                        <hr />
                        <RenderMessage message={this.state.message} errMess={this.props.errMess} />
                    </div>
                </div>
                <div className='row row-container'>
                    <div className='col-12 col-md-9'>
                        {<Form id='createTask' model="createTask" encType="multipart/form-data" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="username" md={2}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".username" id="username" name="username"
                                        placeholder="Name"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className='text-danger'
                                        model='.username'
                                        show='touched'
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
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
                                <Label htmlFor="text" md={2}>Your Task</Label>
                                <Col md={10}>
                                    <Control.textarea model=".text" name="text"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={10}>
                                    <Control.file onChange={e => this.handleChange(e)} model=".fileUpload" name='fileUpload' />
                                    {image}
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">
                                        Create
                                    </Button>
                                    <Button color="white">

                                    </Button>
                                    <Link to="/preview" >
                                        <Button type="submit" color="primary">
                                            Preview
                                        </Button>
                                    </Link>
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


export default Create;