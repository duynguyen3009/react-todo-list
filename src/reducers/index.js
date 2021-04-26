import {combineReducers} from 'redux';
import tasks from './tasks';
let myReducer = combineReducers({
    tasks
});

export default myReducer;