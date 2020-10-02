import * as types from './ActionTypes';

export function GetMoviePending() {
    return { type: types.GET_MOVIE_PENDING };
}

export function GetMovieSuccess() {
    return { type: types.GET_MOVIE_SUCCESS };
}

export function GetMovieFailure() {
    return { type: types.GET_MOVIE_PENDING };
}