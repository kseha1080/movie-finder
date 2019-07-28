import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import Home from '../views/Home';
import NavSide from '../layout/NavSide';

const mapStateToProps = state => ({
  apiStatus: state.async.apiStatus,
  inProgress: state.async.inProgress,
});

const mapDispatchToProps = dispatch => ({});

const Pages = () => (
  <Switch>
    <Route exact path='/' name='Home' component={Home} />
    {/* <Route exact path="/main" name="Main" component={Main} /> */}
  </Switch>
);

const imgClass = ['keanu', 'interstellar', 'dunkirk'];

const initState = {
  randomNum: 0,
};

class App extends PureComponent {
  state = {
    ...initState,
  };

  componentWillMount() {
    this.getRandomNum();
  }

  getRandomNum = () => {
    // Pull a random number
    const randomNum = Math.random();
    // Give maximum to the random num
    const maxDefinedNum = randomNum * imgClass.length;
    // Round the num
    const roundedNum = Math.floor(maxDefinedNum);
    this.setState({
      randomNum: roundedNum,
    });
  };

  render() {
    const { randomNum } = this.state;
    return (
      <div className='app'>
        <div className={`app__body ${imgClass[randomNum]}`}>
          <NavSide />
          <main className='app__body__main'>
            <Route path='/' component={Pages} />
          </main>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
