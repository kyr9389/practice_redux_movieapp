const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

const initialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST'
const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS'
const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE'

const fetchUsersRequest = users => {
    return {
        type: FETCH_MOVIES_SUCCESS,
        payload: users
    }
}

const fetchUsersSuccess = users => {
    return {
        type: FETCH_MOVIES_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = error => {
    return {
        type: FETCH_MOVIES_FAILURE,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_MOVIES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_MOVIES_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_MOVIES_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
    }
}

const fetchMovies = () => {
    return function(dispatch) {
        dispatch(fetchUsersRequest())
        axios.get('https://yts.mx/api/v2/list_movies.json?sort_by=download_count')
            .then(response => {
                console.log(response);
            })
            .then(json => {
                json = json.data.movies
                console.log(json);
                dispatch(fetchUsersSuccess(json))
            })
            .catch(err => {
                dispatch(fetchUsersFailure(err.message))
                console.log(err)
            })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => { console.log(store.getState()) })
store.dispatch(fetchMovies())

//export const GET_MOVIE = "GET_MOVIE";