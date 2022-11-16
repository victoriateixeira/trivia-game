import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  redirectToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const tres = 3;

    if (assertions < tres) {
      return (
        <>
          <Header />

          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.redirectToRanking }
          >
            Ranking
          </button>

          <br />

          <h2 data-testid="feedback-text">Could be better...</h2>

          <br />

          <p data-testid="feedback-total-question">{assertions}</p>

          <br />

          <p data-testid="feedback-total-score">{score}</p>

        </>
      );
    }

    if (assertions >= tres) {
      return (
        <>

          <Header />

          <br />

          <h2 data-testid="feedback-text">Well Done!</h2>

          <br />

          <p data-testid="feedback-total-question">{assertions}</p>

          <br />

          <p data-testid="feedback-total-score">{score}</p>

        </>
      );
    }
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (globalState) => ({
  assertions: globalState.player.assertions,
  score: globalState.player.score,
});

export default connect(mapStateToProps)(Feedback);
