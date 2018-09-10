import {createStore, combineReducers} from 'redux';
import { Tasks } from './tasks';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            tasks: Tasks
        })
    );
    return store;
}
