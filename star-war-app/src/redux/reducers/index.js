import * as Actions from '../actions/index'

const defaultState = { data: {}, isFetching: false, success: false };

export const login = (state = defaultState, action = {}) => {
    switch (action.type) {
        case Actions.LOGIN_SUCCESS:
        case Actions.LOGIN_FAILURE:
            state = Object.assign({}, state, action.data);
            return state;
        default:
            return state; 
    }
}


export const search = (state = defaultState, action = {}) => {
    switch (action.type) {
        case Actions.SEARCH_PLANET_SUCCESS:
        case Actions.SEARCH_PLANET_FAILURE:
            state = Object.assign({}, state, action.data);
            return state;
        default:
            return state;
    }
}