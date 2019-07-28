import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { GET_MOVIES_DATA, GET_PAGE_NUM } from '../../constants/actionTypes';
import api from '../../api';
import Loader from '../../components/Loader';
import DisplayCard from '../../components/DisplayCard';
import LoadMoreButton from '../../components/LoadMoreButton';
import { removeUnderscore } from '../../utils';
import SimilarSearch from '../../components/SimilarSearch';

const initState = {
  movieList: [],
  selectedGenreId: '',
};

const mapStateToProps = (state, ownProps) => ({
  movieData: state.movies.movieData,
  searchType: state.searchType.searchType,
  inProgress: state.async.inProgress,
  pageNum: state.movies.pageNum,
  moviesByQuery: state.movies.moviesByQuery,
  searchMovieId: state.movies.searchMovieId,
});

const mapDispatchToProps = dispatch => ({
  getMovies: (ref, pageNum) => {
    const payload = api.Movies.getMovies({ ref, pageNum });
    dispatch({ type: GET_MOVIES_DATA, payload });
  },
  getPageNum: pageNum => {
    dispatch({ type: GET_PAGE_NUM, payload: pageNum });
  },
  getSimilar: ({ movieId, pageNum }) => {
    const payload = api.Movies.getSimilar({ movieId, pageNum });
    dispatch({ type: GET_MOVIES_DATA, payload });
  },
});

class Home extends PureComponent {
  static propTypes = {};

  state = {
    ...initState,
  };

  componentDidMount() {
    console.log(window.scrollY);
    window.scrollTo(0, 500);
  }

  componentDidUpdate(prevProps) {
    const { movieData, searchType, moviesByQuery, pageNum } = this.props;
    const { movieList } = this.state;
    // Validate if current and previous movie data props are different
    if (prevProps.movieData !== movieData) {
      // Only add the results to the movieList state if search type are same
      if (
        prevProps.searchType === searchType &&
        pageNum > 1 &&
        (movieData.results || []).length
      ) {
        this.setState({
          movieList: [...movieList, ...movieData.results],
        });
      } else {
        // Else validate if type is similar
        if (searchType === 'similar') {
          if (!Object.keys(moviesByQuery).length) {
            this.setState({
              movieList: movieData.results,
            });
          } else {
            this.setState({
              movieList: [],
            });
          }
        } else {
          // If not, reset the movieList state to new data
          this.setState({
            movieList: movieData.results,
          });
        }
      }
    }
  }

  onLoadMore = () => {
    const {
      getMovies,
      searchType,
      pageNum,
      getPageNum,
      getSimilar,
      searchMovieId,
    } = this.props;
    const newPageNum = pageNum + 1;
    getPageNum(newPageNum);
    if (searchType === 'similar') {
      getSimilar({ movieId: searchMovieId, pageNum: newPageNum });
    } else {
      getMovies(searchType, newPageNum);
    }
  };

  render() {
    const { inProgress, searchType } = this.props;
    const { movieList } = this.state;
    const renderMovieList = (movieList || []).map((movieData, i) => {
      return (
        <DisplayCard key={i} data={movieData} idx={i} inProgress={inProgress} />
      );
    });
    const renderLoadMoreBtn =
      movieList && movieList.length ? (
        <LoadMoreButton onLoadMore={this.onLoadMore} />
      ) : null;
    const renderSimilarSearch =
      searchType === 'similar' ? <SimilarSearch /> : null;
    if (inProgress) {
      return <Loader />;
    }
    return (
      <div className='home'>
        <section className='home__content'>
          <div className='home__content__header'>
            <h2 className='home__content__header__title'>
              {removeUnderscore(searchType)}
            </h2>
          </div>
          {renderSimilarSearch}
          <div>{renderMovieList}</div>
          <div className='home__content__load'>{renderLoadMoreBtn}</div>
        </section>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
