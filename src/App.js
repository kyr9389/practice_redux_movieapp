import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Movie from './component/Movie';
import * as movieActions from './reducers/movieFetch';
import {bindActionCreators} from "redux";


class App extends Component {



    componentDidMount() {
        movieActions.movieFetch();
        //this._getMovies();
    }

    componentWillReceiveProps(nextProps, nextContent) {
        const { movieActions } = this.props;

    }


    getMovie = async () => {
        const { movieActions } = this.props;

        try {
            await movieActions.getMovie();
            console.log('awaiting ...')
        } catch(e) {
            console.log(e);
        }
    }



/*
    _renderMovies = () => {

        const movies = this.props.movie.map(movie => {
            return <Movie title={movie.title_english}
                          poster={movie.medium_cover_image}
                          key={movie.id}
                          genres={movie.genres}
                          synopsis={movie.synopsis}
            />
        })

        return movies
    }

    _getMovies = async () => {
        const movies = await this._callApi();
        this.setState({
            movies
        })
    }

    _callApi = () => {
        return fetch('https://yts.mx/api/v2/list_movies.json?sort_by=download_count')
            .then(response => response.json())
            .then(json => json.data.movies)
            .catch(err => console.log(err))
    }

*/
    render() {
        const { movies } = this.state;
        const { movie } = this.props;

      return (
          <div className={movies ? "App" : "App--loading"}>
              {movies ? this._renderMovies() : 'Loading' }
          </div>
      );
  }
}

export default connect(
    (state) => ({
        movie: state.movieFetch.data,
        loading: state.movieFetch.pending,
        error: state.movieFetch.error
    }),
    (dispatch) => ({
        movieActions: bindActionCreators(movieActions, dispatch)
    })
)(App);