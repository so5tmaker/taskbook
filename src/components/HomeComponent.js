import React from 'react';
import { RenderTask } from './TasksComponent';
import Paginate from './PaginationComponent';
import Sorting from './SortingComponent';

function Home(props) {
    if (props.tasks) {
        if (props.pageId) {
            if (props.pageId !== props.pageIdParams) {
                let sortField = props.fieldValues.sortfield ? props.fieldValues.sortfield : 'id';
                let sortDirection = props.fieldValues.sortdirection ? props.fieldValues.sortdirection : 'asc';
                props.fetchTasks(props.pageIdParams, sortField, sortDirection);
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
                <Sorting
                    fetchTasks={props.fetchTasks}
                    pageId={props.pageIdParams}
                    fieldValues={props.fieldValues}
                />
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