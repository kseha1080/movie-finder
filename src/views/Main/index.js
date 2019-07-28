import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import Loader from '../../components/Loader';
import DisplayCard from '../../components/DisplayCard';
import api from '../../api';
import { GET_DISCOVER, GET_DISCOVER_DONE } from '../../constants/actionTypes';

const mapStateToProps = state => ({
  foundByGenre: state.genre.foundByGenre,
  foundByGenreInProgress: state.genre.foundByGenreInProgress,
  getDiscover: state.discover.getDiscover,
  getDiscoverInProgress: state.discover.getDiscoverInProgress,
});

const mapDispatchToProps = dispatch => ({
  discoverTheater: () => {
    dispatch({ type: GET_DISCOVER, payload: {} });
    api.Discover.discoverTheater().then(payload => {
      dispatch({ type: GET_DISCOVER_DONE, payload });
    });
  },
});

class Main extends PureComponent {
  state = {};

  componentDidMount() {
    if (!this.props.foundByGenre || !this.props.foundByGenre.length) {
      this.props.discoverTheater();
    }
  }

  render() {
    const {
        foundByGenre,
        foundByGenreInProgress,
        getDiscoverInProgress,
        getDiscover,
      } = this.props,
      movieList = foundByGenre.length > 0 ? foundByGenre : getDiscover,
      topFiltered = ((movieList || {}).results || []).filter((m, i) => {
        return i < 10;
      });
    if (foundByGenreInProgress || getDiscoverInProgress) {
      return <Loader />;
    }
    return (
      <div className='main-page'>
        <div className='main-page__header'>
          <h1 className='main-title'>Movies for tonight</h1>
          <p className='description-text'>
            Here are some movie recommendations
          </p>
        </div>
        <Row>
          {topFiltered.map((m, i) => {
            return <DisplayCard key={i} data={m} idx={i} />;
          })}
        </Row>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
