import * as types from '../constants/ActionTypes';
let data            = JSON.parse(localStorage.getItem('tasks'));
let initialState    = data ? data : [];
let gen4 = () => {
    return Math.random().toString(16).slice(-4);
}
  
let randomID = (prefix) => {
    return (prefix || '').concat([
      gen4(),
      gen4(),
      gen4(),
      gen4(),
      gen4(),
      gen4(),
      gen4(),
    ].join(''))
}
let myReducer       = (state = initialState , action) => {
    switch(action.type){
        case types.LIST_ALL:
            return state;
        case types.ADD_TASK:
            let newTask = {
                id : randomID(),
                name: action.task.name,
                status: action.task.status,
            }
            state.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        default: return state; 
    }
}

export default myReducer;