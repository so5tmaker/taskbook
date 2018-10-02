import React, { Component } from 'react';
import Home from './HomeComponent';
import Create from './CreateComponent';
import Edit from './EditComponent';
import Preview from './PreviewComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTasks, postTask, setImage, setAdmin, fetchTaskById, editTask, setPageID, setDefaultFormValues, setDefaultValues } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapDispatchToProps = dispatch => ({
    fetchTasks: (pageId, sortField, sortDirection) => dispatch(fetchTasks(pageId, sortField, sortDirection)),
    postTask: (task) => dispatch(postTask(task)),
    setImage: (image) => dispatch(setImage(image)),
    setAdmin: (admin) => dispatch(setAdmin(admin)),
    editTask: (task, taskId) => dispatch(editTask(task, taskId)),
    fetchTaskById: (taskId) => dispatch(fetchTaskById(taskId)),
    setPageID: (pageId) => dispatch(setPageID(pageId)),
    setDefaultFormValues: (values) => dispatch(setDefaultFormValues(values)),
    setDefaultValues: (values) => dispatch(setDefaultValues(values))
});

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        task: state.task,
        image: null,
        admin: state.admin,
        pageId: state.pageId,
        fieldValues: state.fieldValues,
        formValues: state.formValues
    }
};

class Main extends Component {

    componentDidMount() {
        this.props.fetchTasks("1");
    }

    componentDidUpdate() {
        let pathname = this.props.location.pathname;
        let pos = pathname.search("/edit/") + 6;
        let taskId = pathname.substring(pos, pathname.length);
        if (taskId) {
            let tasks = this.props.tasks.tasks.tasks;
            if (tasks) {
                let task = tasks.filter(task => task.id === parseInt(taskId, 10))[0];
                if (task) {
                    this.props.setDefaultValues(task);
                }
            }
        }
    }

    render() {
        const HomePage = () => {
            return (
                <Home
                    tasks={this.props.tasks.tasks.tasks}
                    tasksLoading={this.props.tasks.tasks.isLoading}
                    taskErrMess={this.props.tasks.tasks.errMess}
                    fetchTasks={this.props.fetchTasks}
                    pageIdParams={"1"}
                    pageId={this.props.pageId.pageId}
                    pageQuantity={parseInt(this.props.tasks.tasks.total_task_count, 10)}
                    fieldValues={this.props.fieldValues.fieldValues}
                />
            );
        }

        const TaskWithPage = ({ match }) => {
            return (
                <Home
                    tasks={this.props.tasks.tasks.tasks}
                    tasksLoading={this.props.tasks.tasks.isLoading}
                    taskErrMess={this.props.tasks.tasks.errMess}
                    fetchTasks={this.props.fetchTasks}
                    pageIdParams={match.params.pageId}
                    pageId={this.props.pageId.pageId}
                    pageQuantity={parseInt(this.props.tasks.tasks.total_task_count, 10)}
                    fieldValues={this.props.fieldValues.fieldValues}
                />
            )
        }

        const TaskWithId = ({ match }) => {
            this.props.fetchTaskById(match.params.taskId);
            return (
                <div>
                    <div className='container'>
                        <div className='row align-items-start'>
                            <Edit task={this.props.tasks.tasks.tasks}
                                taskId={match.params.taskId}
                                editTask={this.props.editTask}
                                admin={this.props.admin.admin}
                                setDefaultFormValues={this.props.setDefaultFormValues}
                                formValues={this.props.formValues.formValues}
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
                                component={() => <Create
                                    postTask={this.props.postTask}
                                    setImage={this.props.setImage}
                                    errMess={this.props.task.errMess}
                                    task={this.props.task.task}
                                />}
                            />
                            <Route path="/edit/:taskId" component={TaskWithId}
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
