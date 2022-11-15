import React from 'react';
import { connect } from 'react-redux';
import { actionCreator, START_TIMER } from '../redux/actions';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      timerCounter: 30,
    };
  }

  componentDidMount() {
    const { timer, dispatch } = this.props;
    const ONE_SECOND = 1000;
    dispatch(actionCreator(START_TIMER, timer));
    this.setState({
      timerCounter: timer,
    });

    setTimeout(() => setInterval(() => this.myTimer, ONE_SECOND), 30000);
  }

  // componentDidUpdate() {
  //   const { timerCounter } = this.state;
  //   const finalTimer = 0;
  //   if (timerCounter === 0) {
  //     dispatch(actionCreator(START_TIMER, finalTimer));
  //   }
  // }

  myTimer = () => {
    this.setState((previousState) => ({
      timerCounter: previousState.timerCounter - 1,
    }));
  };

  render() {
    const { timerCounter } = this.state;
    return (
      <div>
        {timerCounter}
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  timer: globalState.game.timer,
});
export default connect(mapStateToProps)(Timer);
