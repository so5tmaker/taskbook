import React from 'react';
import { RenderTask } from './TasksComponent';
import Paginate from './PaginationComponent';

function Home(props) {
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
            />
        </div>
    )
}

export default Home;