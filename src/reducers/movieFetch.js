//import * as types from '../actions/ActionTypes';

import { handleActions } from 'redux-actions';
import Movie from "../component/Movie";
import React from "react";

function getMovieAPI() {
    return fetch('https://yts.mx/api/v2/list_movies.json?sort_by=download_count')
        .then((response) => response.json())
        .then((json) => json.data.movies)
        .catch((err) => console.log(err))
}

export function getMovieObj(movieParser) {

    let movieTag;

    for(let key in movieParser) {
        let movieObj = movieParser[key];
        console.log(movieObj.id);

        movieTag = movieComponent(movieObj);

    }

    return movieTag
}

function movieComponent(movieObj) {
    return <Movie title={movieObj.title_english}
                  poster={movieObj.medium_cover_image}
                  key={movieObj.id}
                  genres={movieObj.genres}
                  synopsis={movieObj.synopsis}
    />
}

const GET_MOVIE_PENDING = 'GET_MOVIE_PENDING';
const GET_MOVIE_SUCCESS = 'GET_MOVIE_SUCCESS';
const GET_MOVIE_FAILURE = 'GET_MOVIE_FAILURE';


export const movieFetch = () => dispatch => {

    console.log("movieFetch entered, dispatch start");
    dispatch({type: GET_MOVIE_PENDING});

    return getMovieAPI()
        .then((response) => {
            console.log("getAPIresult : ", response);
            dispatch({
                type: GET_MOVIE_SUCCESS,
                payload: response
            })
        })
        .catch((error) => {
        console.log("getAPIresult : ", error);
        dispatch({
            type: GET_MOVIE_FAILURE,
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
    [GET_MOVIE_PENDING]: (state, action) => {
        console.log("pending data");
        return {
            ...state,
            pending: true,
            error: false
        };
    },
    [GET_MOVIE_SUCCESS]: (state, action) => {

        console.log("received data : " + action.payload);

        //const movieParser = { ...action.payload }

        console.log(typeof([...action.payload]))

        return {
            ...state,
            pending: false,
            movieList: [...action.payload]

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