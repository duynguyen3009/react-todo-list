import {combineReducers} from 'redux';
import tasks            from './tasks';
import isDisplayForm    from './isDisplayForm';
let myReducer = combineReducers({
    tasks,
    isDisplayForm,
});

export default myReducer;