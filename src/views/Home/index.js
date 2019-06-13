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
            <div className="home__content__form__top" />
            <Form
              className="home__content__form__bottom"
              onSubmit={this.handleSubmit}
            >
              <FormGroup>
                <SelectDropdown
                  onChange={this.selectGenreId}
                  defaultValue="Choose a genre"
                >
                  {((allGenre || {}).genres || []).map(g => {
                    const { id, name } = g;
                    return (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    );
                  })}
                </SelectDropdown>
              </FormGroup>
              <Button type="submit">Submit</Button>
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
