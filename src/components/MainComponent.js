import React, { Component } from 'react';
import Task from './TaskComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Create from './CreateComponent';
import { TASKS } from '../shared/tasks';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        tasks: state.tasks
    }
}

function RenderPagination({ index }) {
    console.log(`index is ${index}`);
    return (
        <PaginationItem key={index}>
            <Link to={`/page/${index + 1}`}>
                <PaginationLink>{index + 1}</PaginationLink>
            </Link>
        </PaginationItem>
    );
}

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: TASKS,
            activePage: 1
        };
        this.itemsOnPage = 3;
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
    }

    render() {

        const TaskWithIds = ({ match }) => {
            const tasksLength = this.state.tasks.length;
            let index = match.params.pageId - 1;
            let start = index * this.itemsOnPage;
            let end = start + (this.itemsOnPage - 1);
            end = (end > tasksLength) ? tasksLength - 1 : end;
            let numbers = [];
            console.log('TaskWithIds', numbers);
            for (let index = start; index <= end; index++) {
                numbers.push(this.state.tasks[index]);
            }
            return (
                <Task tasks={numbers} />
            )
        }

        const RenderPaginations = () => {
            const tasksLength = this.state.tasks.length;
            let numbers = [];
            let length = Math.ceil(tasksLength / this.itemsOnPage);
            for (let index = 0; index < length; index++) {
                numbers[index] = index;
            }
            console.log('RenderPaginations', numbers);
            return (
                <Pagination aria-label="Page navigation example">
                    {numbers.map(index => <RenderPagination index={index} />)}
                </Pagination>
            )
        }

        const paginations = RenderPaginations();

        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/create" component={Create}  />
                    <Route path="/page/:pageId" component={TaskWithIds} />
                </Switch>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            {paginations}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(Main));