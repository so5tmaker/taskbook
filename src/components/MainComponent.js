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
import { fetchTasks, postTask, setImage, setAdmin, fetchTaskById } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

const mapDispatchToProps = dispatch => ({
    fetchTasks: () => dispatch(fetchTasks()),
    postTask: (task) => dispatch(postTask(task)),
    setImage: (image) => dispatch(setImage(image)),
    fetchTaskById: (taskId) => dispatch(fetchTaskById(taskId)),
    setAdmin: (admin) => dispatch(setAdmin(admin))
});

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        task: state.task,
        image: null,
        admin: false
    }
};

class Main extends Component {

    componentDidMount() {
        this.props.fetchTasks();
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
                <Home
                    tasks={this.props.tasks.tasks.filter(task => this.props.tasks.tasks.indexOf(task) <= 2)}
                    tasksLoading={this.props.tasks.isLoading}
                    taskErrMess={this.props.tasks.errMess}
                    admin={this.formValues.admin.admin}
                />
            );
        }

        const TaskWithIds = ({ match }) => {
            let itemsOnPage = 3;
            const tasksLength = this.props.tasks.tasks.length;
            let index = match.params.pageId - 1;
            let start = index * itemsOnPage;
            let end = start + (itemsOnPage - 1);
            end = (end > tasksLength) ? tasksLength - 1 : end;
            let numbers = [];
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
                            <Edit task={this.props.tasks.tasks} taskId={match.params.taskId} />
                        </div>
                    </div>

                </div>
            )
        }

        return (
            <div>
                <Header setAdmin={this.props.setAdmin}/>
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path="/home" component={HomePage} />
                            <Route path="/page/:pageId" component={TaskWithIds} />
                            <Route exact path="/create"
                                component={() => <Create postTask={this.props.postTask} setImage={this.props.setImage}
                                />}
                            />
                            <Route exact path="/edit/:taskId"
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
