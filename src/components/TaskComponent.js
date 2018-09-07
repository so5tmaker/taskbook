import React from 'react';
import { Card, CardImg, CardTitle, CardSubtitle, CardText, CardBody } from 'reactstrap';

function RenderTaskItem({ task }) {
    return (
        <Card>
            <CardImg top src={task.image_path} alt={task.username} />
            <CardBody>
                <CardTitle>{task.username}</CardTitle>
                <CardSubtitle>{task.email}</CardSubtitle>
                <CardText>{task.text}</CardText>
            </CardBody>
        </Card >
    );
}

const Task = (props) => {

    const task = props.tasks.map((task) => {
        return (
            <div className="col-12 col-md-5 m-1" key={task.id}>
                <RenderTaskItem task={task} />
            </div>
        );
    });

    return (
        <div className="container">
            <div className="row">
                {task}
            </div>
        </div>
    );
}

export default Task;