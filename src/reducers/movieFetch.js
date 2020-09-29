//import * as types from '../actions/ActionTypes';

import { handleActions } from 'redux-actions';



function getMovieAPI() {
    return fetch('https://yts.mx/api/v2/list_movies.json?sort_by=download_count')
        .then(response => response.json())
        .then(json => json.data.movies)
        .catch(err => console.log(err))
}

const GET_MOVIE_PENDING = 'GET_MOVIE_PENDING';
const GET_MOVIE_SUCCESS = 'GET_MOVIE_SUCCESS';
const GET_MOVIE_FAILURE = 'GET_MOVIE_FAILURE';



export const movieFetch = () => dispatch => {
    dispatch({type: GET_MOVIE_PENDING});

    return getMovieAPI().then(
        (response) => {
            dispatch({
                type: GET_MOVIE_SUCCESS,
                payload: response
            })
        }
    ).catch(error => {
        dispatch({
            type: GET_MOVIE_FAILURE,
            payload: error
        });
    })
}


const initialState = {
    pending: false,
    error: false,
    data: {
        title: '',
        body: ''
    }
}


export default handleActions({
    [GET_MOVIE_PENDING]: (state, action) => {
        return {
            ...state,
            pending: true,
            error: false
        };
    },
    [GET_MOVIE_SUCCESS]: (state, action) => {

        const { title, body } = action.payload.data;

        return {
            ...state,
            pending: false,
            data: {
                title, body
            }
        }
    },
    [GET_MOVIE_FAILURE]: (state, action) => {
        return {
            ...state,
            pending: false,
            error: true
        }
    }
}, initialState);