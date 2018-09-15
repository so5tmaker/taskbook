import React from 'react';
import { RenderTask } from './TasksComponent';
import Paginate from './PaginationComponent';
import { Redirect } from 'react-router-dom';

function Home(props) {
    if (props.tasks) {
        if (props.pageId) {
            if (props.pageId !== props.pageIdParams) {
                props.fetchTasks(props.pageIdParams);
            }
        }
        return (
            <div>
                <div className='container'>
                    <div className='row align-items-start'>
                        <RenderTask tasks={props.tasks}
                            isLoading={props.tasksLoading}
                            errMess={props.tasksErrMess}
                            admin={props.admin}
                        />
                    </div>
                </div>
                <Paginate tasks={props.tasks}
                    isLoading={props.tasksLoading}
                    errMess={props.tasksErrMess}
                    pageQuantity={props.pageQuantity}
                />
            </div>
        );
    } else {
        return (<div></div>);
    }
}

export default Home;