import {combineReducers} from 'redux';
export const CREATE_TODO = 'CREATE_TODO';
export const SET_TODOS = 'SET_TODOS';

const user = (state = {}, action) => {
    return state;
};

const todos = (state = [], action) => {
    switch (action.type) {
        case CREATE_TODO:
            return [
                action.payload,
                ...state
            ];
        case SET_TODOS:
            return [
                ...action.payload
            ];
        default:
            return state;
    }
};

export const reducer = combineReducers({todos, user});