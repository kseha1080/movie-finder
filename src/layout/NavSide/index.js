import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  GET_MOVIES_DATA,
  UNLOAD_MOVIES,
  GET_SEARCH_TYPE,
  GET_PAGE_NUM,
} from '../../constants/actionTypes';
import api from '../../api';
import navData from '../../utils/navData';
import NavList from '../../components/NavList';

const initState = {
  selectedMovieRef: 'popular',
  hoveredList: '',
};

const mapStateToProps = state => ({
  pageNum: state.movies.pageNum,
  searchType: state.searchType.searchType,
});

const mapDispatchToProps = dispatch => ({
  getMovies: (ref, pageNum) => {
    const payload = api.Movies.getMovies({ ref, pageNum });
    dispatch({ type: GET_MOVIES_DATA, payload });
  },
  getSearchType: ref => {
    dispatch({ type: GET_SEARCH_TYPE, payload: ref });
  },
  getPageNum: pageNum => {
    dispatch({ type: GET_PAGE_NUM, payload: pageNum });
  },
  unloadMovies: () => {
    dispatch({ type: UNLOAD_MOVIES, payload: {} });
  },
});

class NavSide extends PureComponent {
  state = {
    ...initState,
  };

  componentDidMount() {
    const { selectedMovieRef } = this.state;
    const { pageNum, getMovies, getSearchType } = this.props;
    getMovies(selectedMovieRef, pageNum);
    getSearchType(selectedMovieRef);
  }

  componentWillUnmount() {
    this.props.unloadMovies();
  }

  // Set state on which selection is being hovered
  onHoverList = ref => {
    this.setState({
      hoveredList: ref,
    });
  };

  // Set state back to null on leave hover
  onLeaveList = () => {
    this.setState({
      hoveredList: null,
    });
  };

  // Return classname of hovered element
  hoveredClassName = ref => {
    if (this.state.hoveredList === ref) {
      return 'show-desc';
    }
    return;
  };

  // Return classname of clicked element
  selectedClassName = ref => {
    if (this.state.selectedMovieRef === ref) {
      return 'selected-list';
    }
    return;
  };

  onSelectList = ref => {
    const {
      getMovies,
      unloadMovies,
      getSearchType,
      searchType,
      getPageNum,
    } = this.props;
    // If current and selected types are not same, set page number to 1
    if (ref !== searchType) {
      getPageNum(1);
    }
    // Validate which find method is being selected
    if (ref === 'similar' || ref === 'discover') {
      // If similar or discover, unload movie lists
      unloadMovies();
      getSearchType(ref);
    } else {
      // Otherwise, fetch movies with ref
      getMovies(ref);
      getSearchType(ref);
    }
    // Set state on which element is clicked
    this.setState({
      selectedMovieRef: ref,
    });
  };

  render() {
    // console.log("NAVSIDE", this.props);
    const renderNavData = navData.map((d, i) => {
      const selectedListTitle = d.title;
      const movieRef = d.ref;
      const movieDesc = d.desc;
      return (
        <NavList
          movieRef={movieRef}
          movieDesc={movieDesc}
          selectedListTitle={selectedListTitle}
          key={i}
          className={this.selectedClassName(movieRef)}
          onHoverList={this.onHoverList}
          onLeaveList={this.onLeaveList}
          onSelectList={this.onSelectList}
          hoveredClassName={this.hoveredClassName(movieRef)}
        />
      );
    });

    return (
      <div className='nav-side'>
        <div className='nav-side__content'>
          <header className='nav-side__content__header'>
            <h2>Movie Night</h2>
          </header>
          <section>
            <ul>{renderNavData}</ul>
          </section>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavSide);
