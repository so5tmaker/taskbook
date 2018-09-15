import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { Link } from 'react-router-dom';

function LocalCard({item}) {
    return (
        <Card>
            <CardImg src={item.image_path} alt={item.username} />
            <CardBody>
                <CardTitle>{item.username}</CardTitle>
                <CardText>{item.email}</CardText>
                <CardText>{item.status === 0 ? 'Pending...' : 'The Task Was Done'}</CardText>
                <CardText>{item.text}</CardText>
            </CardBody>
        </Card>
    )
}

export function RenderTask({ tasks, isLoading, errMess, admin }) {
    if (isLoading) {
        return (
            <Loading />
        );
    }
    else if (errMess) {
        return (
            <h4>{errMess}</h4>
        );
    } else {
        return (tasks.map((item) => {
            return (
                <div className='col-12 col-md m-1'>
                    {admin ? <Link to={`/edit/${item.id}`}><LocalCard item={item} /></Link> : <Link to={`/home/${item.id}`}><LocalCard item={item} /></Link>}
                </div>
            );
        }));
    }
}

export default RenderTask;