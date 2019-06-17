import React, { PureComponent } from "react";
import { connect } from "react-redux";
import api from "../../api";
import {
  GET_GENRE,
  GET_GENRE_DONE,
  FIND_BY_GENRE,
  FIND_BY_GENRE_DONE
} from "../../constants/actionTypes";
import moment from "moment";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import { Form, FormGroup, Button } from "reactstrap";
import SelectDropdown from "../../components/SelectDropdown";

const initState = {
  selectedGenreId: ""
};

const mapStateToProps = state => ({
  allGenre: state.genre.allGenre,
  getGenreInProgress: state.genre.getGenreInProgress,
  foundByGenre: state.genre.foundByGenre,
  foundByGenreInProgress: state.genre.foundByGenreInProgress
});

const mapDispatchToProps = dispatch => ({
  getGenre: () => {
    dispatch({ type: GET_GENRE, payload: {} });
    api.Genre.getGenre().then(res => {
      dispatch({ type: GET_GENRE_DONE, payload: res });
    });
  },
  findByGenre: ({ genreId, currentYear }) => {
    dispatch({ type: FIND_BY_GENRE, payload: {} });
    api.Genre.findByGenre({ genreId, currentYear }).then(res => {
      dispatch({ type: FIND_BY_GENRE_DONE, payload: res });
    });
  }
});

class Home extends PureComponent {
  static propTypes = {
    getGenre: PropTypes.func.isRequired,
    findByGenre: PropTypes.func.isRequired,
    allGenre: PropTypes.array,
    getGenreInProgress: PropTypes.string,
    foundByGenre: PropTypes.object,
    foundByGenreInProgress: PropTypes.string
  };

  state = {
    ...initState
  };

  componentDidMount() {
    // Get all genres when component mounts
    this.props.getGenre();
  }

  selectGenreId = e => {
    // Set genre ID to local state
    this.setState({
      selectedGenreId: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let { selectedGenreId } = this.state,
      // Define a variable for current year for API call
      currentYear = moment()
        .utc()
        .format("YYYY");
    // If there is no selected genre id, then stop function here
    if (!selectedGenreId) {
      return;
    }
    this.props.findByGenre({ genreId: selectedGenreId, currentYear });
    // Redirect to main page
    this.props.history.push("/main");
  };

  render() {
    console.log(this.props, this.state);
    const { getGenreInProgress, allGenre } = this.props;
    if (getGenreInProgress) {
      return <Loader />;
    }
    return (
      <div className="home">
        <div className="home__content">
          <div className="home__content__img">
            <figure className="home__content__img-dark-phoenix">
              <img
                src={require("../../img/dark-phoenix.jpg")}
                alt="Dark Phoenix"
              />
            </figure>
          </div>
          <div className="home__content__form">
            <div className="home__content__form__header">
              <h1 className="main-title">Movie Finder</h1>
              <p className="description-text">
                Pick a genre to find tonight's movie
              </p>
            </div>
            <Form
              className="home__content__form__content"
              onSubmit={this.handleSubmit}
            >
              <FormGroup>
                <SelectDropdown
                  onChange={this.selectGenreId}
                  defaultValue="Choose a genre"
                >
                  {((allGenre || {}).genres || []).map(g => {
                    let { id, name } = g;
                    return (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    );
                  })}
                </SelectDropdown>
              </FormGroup>
              <Button className="main-btn" type="submit">
                Find movie
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
