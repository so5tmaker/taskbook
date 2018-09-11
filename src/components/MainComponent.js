import React, { Component } from 'react';
import Home from './HomeComponent';
import Create from './CreateComponent';
import RenderTask from './TasksComponent';
import Paginate from './PaginationComponent';
import Preview from './PreviewComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTasks, postTask, setImage } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapDispatchToProps = dispatch => ({
    fetchTasks: () => dispatch(fetchTasks()),
    postTask: (task) => dispatch(postTask(task)),
    setImage: (image) => dispatch(setImage(image))
});

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        image: null
    }
};

class Main extends Component {

    componentDidMount() {
        this.props.fetchTasks();
    }

    render() {
        const HomePage = () => {
            return (
                <Home
                    tasks={this.props.tasks.tasks.filter(task => this.props.tasks.tasks.indexOf(task) <= 2)}
                    tasksLoading={this.props.tasks.isLoading}
                    taskErrMess={this.props.tasks.errMess}
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
            console.log('TaskWithIds', numbers);
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

        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path="/home" component={HomePage} />
                            <Route path="/page/:pageId" component={TaskWithIds} />
                            <Route exact path="/create"
                                component={() => <Create postTask={this.props.postTask} setImage={this.props.setImage}
                                />}
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
