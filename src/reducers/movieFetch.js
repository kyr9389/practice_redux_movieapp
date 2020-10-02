import { handleActions } from 'redux-actions';
import React from "react";

import * as types from '../actions/ActionTypes';

function getMovieAPI() {
    return fetch('https://yts.mx/api/v2/list_movies.json?sort_by=download_count')
        .then((response) => response.json())
        .then((json) => json.data.movies)
        .catch((err) => console.log(err))
}

export const movieFetch = () => dispatch => {

    console.log("movieFetch entered, dispatch start");
    dispatch({type: types.GET_MOVIE_PENDING});

    return getMovieAPI()
        .then((response) => {
            console.log("getAPIresult : ", response);
            dispatch({
                type: types.GET_MOVIE_SUCCESS,
                payload: response
            })
        })
        .catch((error) => {
        console.log("getAPIresult : ", error);
        dispatch({
            type: types.GET_MOVIE_FAILURE,
            payload: error
        })
    })
}

const initialState = {
    pending: false,
    error: false,
    movieList: []
};

export default handleActions({
    [types.GET_MOVIE_PENDING]: (state, action) => {
        console.log("pending data");
        return {
            ...state,
            pending: true,
            error: false
        };
    },
    [types.GET_MOVIE_SUCCESS]: (state, action) => {

        return {
            ...state,
            pending: false,
            movieList: [...action.payload]

        }
    },
    [types.GET_MOVIE_FAILURE]: (state, action) => {
        return {
            ...state,
            pending: false,
            error: true
        }
    }
}, initialState);