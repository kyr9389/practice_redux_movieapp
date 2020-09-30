import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Movie from './component/Movie';
import * as movieActions from './reducers/movieFetch';
import {bindActionCreators} from "redux";


class App extends Component {

    componentDidMount() {
        console.log("component mounted, fetch start");
        this.props.movieActions.movieFetch();
        //this._getMovies();
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



    _renderMovies = (movieParser) => {
        //const movies = movieActions.getMovieObj(movieParser)

        const movies = movieParser.map(movieParser => {
            return <Movie title={movieParser.title_english}
                          poster={movieParser.medium_cover_image}
                          key={movieParser.id}
                          genres={movieParser.genres}
                          synopsis={movieParser.synopsis}
            />
        })

        return movies
    }

    render() {
        const { movie, error, loading } = this.props;
        console.log("renderSection ", Array.isArray(movie));

        if (movie) {
            console.log("로딩 완료");
        }


      return (
          <div className={movie ? "App" : "App--loading"}>
              { loading && <h2>Loading</h2> }
              { error ? <h1>에러가 발생하였습니다</h1> : this._renderMovies(movie) }
          </div>
      );
  }
}

export default connect(
    (state) => ({
        movie: state.movieFetch.movieList,
        loading: state.movieFetch.pending,
        error: state.movieFetch.error
    }),
    (dispatch) => ({
        movieActions: bindActionCreators(movieActions, dispatch)
    })
)(App);