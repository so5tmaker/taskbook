import React from 'react';
import { Card, CardImg, CardTitle, CardSubtitle, CardText, CardBody } from 'reactstrap';

function RenderTaskItem({ task }) {
    return (
        <Card>
            <CardImg top src={task.image_path} alt={task.username} />
            <CardBody>
                <CardTitle>{task.username}</CardTitle>
                <CardSubtitle>{task.email}</CardSubtitle>
                <CardText>{task.status === 0 ? 'The Task Was Done' : 'Pending...'}</CardText>
                <CardText>{task.text}</CardText>
            </CardBody>
        </Card >
    );
}

const Task = (props) => {
    const task = props.tasks.map((task) => {
        if (task != null) {
            return (
                <div className="col-12 col-md-5 m-1" key={task.id}>
                    <RenderTaskItem task={task} />
                </div>
            );
        } else {
            return (
                <div></div>
            );    
        }
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