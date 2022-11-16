import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionCreator, START_TIMER } from '../redux/actions';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      timerCounter: 30,
    };
  }

  componentDidMount() {
    this.startsTimer();
  }

  componentDidUpdate(prevProps) {
    const { timer } = this.props;
    const ZERO_SECONDS = 0;
    const THIRTY_SECONDS = 30;

    if (prevProps.timer !== timer && timer === ZERO_SECONDS) {
      // dispatch(actionCreator(START_TIMER, THIRTY_SECONDS));
      clearInterval(this.intervalID);
      this.setState({
        timerCounter: 0,
      });
    }
    if (prevProps.timer !== timer && timer === THIRTY_SECONDS) {
      this.setState({
        timerCounter: 30,

      });
      // this.startsTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  startsTimer = () => {
    const { dispatch } = this.props;
    const ONE_SECOND = 1000;
    // dispatch(actionCreator(START_TIMER, timer));
    // this.setState({
    //   timerCounter: timer,
    // });

    // setTimeout(() => setInterval(() => this.myTimer, ONE_SECOND), 30000);
    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({
        timerCounter: prevState.timerCounter - 1,
      }));
      const { timerCounter } = this.state;
      dispatch(actionCreator(START_TIMER, timerCounter));
    }, ONE_SECOND);
  };

  // componentDidUpdate() {
  //   const { timerCounter } = this.state;
  //   const finalTimer = 0;
  //   if (timerCounter === 0) {
  //     dispatch(actionCreator(START_TIMER, finalTimer));
  //   }
  // }

  // myTimer = () => {
  //   this.setState((previousState) => ({
  //     timerCounter: previousState.timerCounter - 1,
  //   }));
  // };

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

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Timer);
