import React, { Component } from 'react';
import Home from './HomeComponent';
import Create from './CreateComponent';
import Edit from './EditComponent';
import RenderTask from './TasksComponent';
import Paginate from './PaginationComponent';
import Preview from './PreviewComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTasks, postTask, setImage, setAdmin, fetchTaskById, editTask, setPageID } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

const mapDispatchToProps = dispatch => ({
    fetchTasks: (pageId) => dispatch(fetchTasks(pageId)),
    postTask: (task) => dispatch(postTask(task)),
    setImage: (image) => dispatch(setImage(image)),
    setAdmin: (admin) => dispatch(setAdmin(admin)),
    editTask: (task, taskId) => dispatch(editTask(task, taskId)),
    fetchTaskById: (taskId) => dispatch(fetchTaskById(taskId)),
    setPageID: (pageId) => dispatch(setPageID(pageId))
});

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        image: null,
        admin: false,
        pageId: state.pageId
    }
};

class Main extends Component {

    componentDidMount() {
        console.log('componentDidMount', this.props.pageId.pageId);
        this.props.fetchTasks(this.props.pageId.pageId);
    }

    // Access store by defining context types
    static contextTypes = {
        store: PropTypes.object
    }

    get formValues() {
        // Get the redux store from context
        const { store } = this.context;
        const state = store.getState();
        return state;
    }

    render() {
        const HomePage = () => {
            return (
            <Home fetchTasks={this.props.fetchTasks}
                    tasks={this.props.tasks.tasks}
                    tasksLoading={this.props.tasks.isLoading}
                    taskErrMess={this.props.tasks.errMess}
                    admin={this.formValues.admin.admin}
                />
            );
        }

        const TaskWithPage = ({ match }) => {
            //this.props.fetchTaskById(5589);
            this.props.fetchTasks(match.params.pageId);
            console.log('match.params.pageId', match.params.pageId);
            //this.props.setPageID(match.params.pageId);
            let itemsOnPage = 3;
            const tasksLength = this.props.tasks.tasks.length;
            let index = match.params.pageId - 1;
            let start = index * itemsOnPage;
            let end = start + (itemsOnPage - 1);
            end = (end > tasksLength) ? tasksLength - 1 : end;
            let numbers = [];
            console.log('TaskWithPage', numbers);
            for (let index = start; index <= end; index++) {
                numbers.push(this.props.tasks.tasks[index]);
            }
            return (
                <div>
                    <div className='container'>
                        <div className='row align-items-start'>
                            <RenderTask tasks={numbers}
                                isLoading={this.props.tasks.isLoading}
                                errMess={this.props.tasks.errMess}
                                admin={this.formValues.admin.admin}
                            />
                        </div>
                    </div>
                    <Paginate tasks={this.props.tasks.tasks}
                        isLoading={this.props.tasks.tasksLoading}
                        errMess={this.props.tasks.tasksErrMess}
                    />
                </div>
            )
        }

        const TaskWithId = ({ match }) => {
            this.props.fetchTaskById(match.params.taskId);
            return (
                <div>
                    <div className='container'>
                        <div className='row align-items-start'>
                            <Edit task={this.props.tasks.tasks}
                                taskId={match.params.taskId}
                                editTask={this.props.editTask}
                            />
                        </div>
                    </div>

                </div>
            )
        }

        return (
            <div>
                <Header setAdmin={this.props.setAdmin} />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path="/home" component={HomePage} />
                            <Route path="/page/:pageId" component={TaskWithPage} />
                            <Route exact path="/create"
                                component={() => <Create postTask={this.props.postTask} setImage={this.props.setImage}
                                />}
                            />
                            <Route path="/edit/:taskId"
                                component={TaskWithId}
                            />
                            <Route exact path="/preview" component={() => <Preview tasks={this.props.tasks.tasks} />} />
                            <Redirect to="/home" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
