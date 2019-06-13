import React, { PureComponent } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import Home from "../views/Home";
import Main from '../views/Main';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

const Pages = () => (
  <Switch>
    <Route exact path="/" name="Home" component={Home} />
    <Route exact path="/main" name="Main" component={Main}/>
  </Switch>
);

class App extends PureComponent {
  state = {};

  render() {
    console.log(this.props);
    return (
      <div className="app">
        <div className="app-body">
          <main className="main">
            <Route path="/" component={Pages} />
          </main>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
