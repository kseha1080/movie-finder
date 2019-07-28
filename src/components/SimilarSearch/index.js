import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  GET_MOVIES_DATA,
  GET_MOVIES_BY_QUERY,
  UNLOAD_SEARCHES,
  GET_MOVIE_ID,
} from '../../constants/actionTypes';
import { Form, Input } from 'reactstrap';
import api from '../../api';
import moment from 'moment';

const initState = {
  searchTerm: '',
};

const mapStateToProps = state => ({
  moviesByQuery: state.movies.moviesByQuery,
  pageNum: state.movies.pageNum,
});

const mapDispatchToProps = dispatch => ({
  getSimilar: ({ movieId, pageNum }) => {
    const payload = api.Movies.getSimilar({ movieId, pageNum });
    dispatch({ type: GET_MOVIES_DATA, payload });
  },
  getMoviesByQuery: title => {
    const payload = api.Movies.getMoviesByQuery(title);
    dispatch({ type: GET_MOVIES_BY_QUERY, payload });
  },
  getMovieId: movieId => {
    dispatch({ type: GET_MOVIE_ID, payload: movieId });
  },
  unloadSearches: () => {
    dispatch({ type: UNLOAD_SEARCHES, payload: {} });
  },
});

class SimilarSearch extends PureComponent {
  state = {
    ...initState,
  };

  onChange = e => {
    const stateName = e.target.name;
    const stateValue = e.target.value;
    this.setState({
      [stateName]: stateValue,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.getMoviesByQuery(this.state.searchTerm);
  };

  onSimilarSearch = movieId => {
    const { getSimilar, pageNum, unloadSearches, getMovieId } = this.props;
    getSimilar({ movieId, pageNum });
    getMovieId(movieId);
    unloadSearches();
  };

  render() {
    const { moviesByQuery } = this.props;
    const searchedMovies = ((moviesByQuery || {}).results || []).filter(
      (movie, idx) => {
        return idx < 10;
      },
    );
    const renderSearch = searchedMovies.map(data => {
      const movieTitle = data.title;
      const movieDate = data.release_date;
      const movieId = data.id;
      return (
        <div
          className='similar-search__search-list'
          onClick={() => this.onSimilarSearch(movieId)}
          key={movieId}
        >
          <h4>{movieTitle}</h4>
          <p>{moment(movieDate).format('YYYY')}</p>
        </div>
      );
    });
    return (
      <div className='similar-search'>
        <Form className='field-form' type='submit' onSubmit={this.onSubmit}>
          <Input
            className='input-field'
            name={'searchTerm'}
            onChange={this.onChange}
            placeholder='Enter movie title'
          />
        </Form>
        <div className='similar-search__search'>
          {!Object.keys(moviesByQuery).length ? null : Object.keys(
              moviesByQuery,
            ).length &&
            moviesByQuery.results &&
            !moviesByQuery.results.length ? (
            <h4 className='similar-search__not-found'>No movies found.</h4>
          ) : (
            renderSearch
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SimilarSearch);
