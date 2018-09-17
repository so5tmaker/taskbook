import React, { Component } from 'react';
import { Pagination, PaginationItem, Button } from 'reactstrap';

class Sorting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortfield: 'id',
            sortdirection: 'asc'
        };
    }

    SortPage(e, fetchTasks, pageId, sortField, sortDirection) {
        let localSortField = sortField ? sortField : this.state.sortfield;
        let localSortDirection = sortDirection ? sortDirection : this.state.sortdirection;
        fetchTasks(pageId, localSortField, localSortDirection);
        this.setState({
            sortfield: localSortField,
            sortdirection: localSortDirection
        }, () => {
            // only now the state was updated
            console.log("Data is here", this.state.sortfield);
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <Pagination aria-label="Page sorting example">
                            <PaginationItem key={1}>
                                <Button onClick={(e) => this.SortPage(e, this.props.fetchTasks, this.props.pageId, 'id')} outline color='primary'>
                                    <span>ID</span>
                                </Button>
                            </PaginationItem>
                            <PaginationItem key={2}>
                                <Button onClick={(e) => this.SortPage(e, this.props.fetchTasks, this.props.pageId, 'username')} outline color='primary'>
                                    <span>NAME</span>
                                </Button>
                            </PaginationItem>
                            <PaginationItem key={3}>
                                <Button onClick={(e) => this.SortPage(e, this.props.fetchTasks, this.props.pageId, 'email')} outline color='primary'>
                                    <span>EMAIL</span>
                                </Button>
                            </PaginationItem>
                            <PaginationItem key={4}>
                                <Button onClick={(e) => this.SortPage(e, this.props.fetchTasks, this.props.pageId, 'status')} outline color='primary'>
                                    <span>STATUS</span>
                                </Button>
                            </PaginationItem>
                            <PaginationItem key={5}>
                                <Button onClick={(e) => this.SortPage(e, this.props.fetchTasks, this.props.pageId, null, 'asc')} outline color='primary'>
                                    <span>ASC</span>
                                </Button>
                            </PaginationItem>
                            <PaginationItem key={5}>
                                <Button onClick={(e) => this.SortPage(e, this.props.fetchTasks, this.props.pageId, null, 'desc')} outline color='primary'>
                                    <span>DESC</span>
                                </Button>
                            </PaginationItem>
                        </Pagination>
                    </div>
                </div>
            </div>

        );
    }
}

export default Sorting;