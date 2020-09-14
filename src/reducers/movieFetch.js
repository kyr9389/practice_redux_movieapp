import * as types from '../actions/ActionTypes';

const initialState = {

};

export default function movieFetch(state = initialState, action) {
    switch (action.type) {
        case types.GET_MOVIE:
            return state;

        default:
            return state;
    }
}