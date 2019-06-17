import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Loader from "../../components/Loader";

const mapStateToProps = state => ({
  foundByGenre: state.genre.foundByGenre,
  foundByGenreInProgress: state.genre.foundByGenreInProgress
});

const mapDispatchToProps = dispatch => ({});

class Main extends PureComponent {
  state = {};

  render() {
    console.log("main", this.props, this.state);
    const { foundByGenre, foundByGenreInProgress } = this.props;
    if (foundByGenreInProgress) {
      return <Loader />;
    };
    return (
      <div className="main-page">
        <div className="main-page__header">
          <h1 className="main-title">Movies for tonight</h1>
          <p className="description-text">
            Here are some movie recommendations
          </p>
        </div>
        <div>

        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
