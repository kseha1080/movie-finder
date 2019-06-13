import React, { PureComponent } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({

});

class Main extends PureComponent {
  state = {};
  render() {
    return <div>helloworld</div>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
