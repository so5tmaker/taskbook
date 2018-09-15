import React, { Component } from 'react';
import { Loading } from './LoadingComponent';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, Button } from 'reactstrap';

function RenderPagination({ index }) {
    console.log(`index is ${index}`);
    return (
        <PaginationItem key={index}>
            <Link to={`/page/${index + 1}`}>
                <Button outline color='primary'>
                    <span>{index + 1}</span>
                </Button>
            </Link>
        </PaginationItem>
    );
}

export class Paginate extends Component {

    render() {

        const RenderPaginations = (tasks) => {
            const tasksLength = tasks.pageQuantity;
            let numbers = [];
            let length = Math.ceil(tasksLength / 3);
            for (let index = 0; index < length; index++) {
                numbers[index] = index;
            }
            return (
                <Pagination aria-label="Page navigation example">
                    {numbers.map(index => <RenderPagination index={index} />)}
                </Pagination>
            )
        }

        if (this.props.isLoading) {
            return (
                <Loading />
            );
        }
        else if (this.props.errMess) {
            return (
                <h4>{this.props.errMess}</h4>
            );
        } else {
            console.log('Paginate', this.props.tasks);
            return (
                <div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <RenderPaginations 
                                tasks={this.props.tasks} 
                                isLoading={this.props.tasks.isLoading} 
                                pageQuantity={this.props.pageQuantity}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Paginate;