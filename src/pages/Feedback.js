import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  componentDidMount() {
    const { name, score } = this.props;
    const gravatarImg = this.getAvatar();
    const player = { name, score, gravatarImg };
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    ranking.push(player);
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  getAvatar = () => {
    const { gravatarEmail } = this.props;
    const gravatar = md5(gravatarEmail).toString();
    return `https://www.gravatar.com/avatar/${gravatar}`;
  };

  render() {
    const { assertions, score, history } = this.props;
    const tres = 3;

    if (assertions < tres) {
      return (
        <>
          <Header />
          <br />
          <h2 data-testid="feedback-text">Could be better...</h2>
          <br />
          <p data-testid="feedback-total-question">{assertions}</p>
          <br />
          <p data-testid="feedback-total-score">{score}</p>
          <button
            type="button"
            onClick={ () => history.push('/') }
            data-testid="btn-play-again"
          >
            Play Again
          </button>
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

          <button
            type="button"
            onClick={ () => history.push('/') }
            data-testid="btn-play-again"
          >
            Play Again
          </button>
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
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (globalState) => ({
  assertions: globalState.player.assertions,
  score: globalState.player.score,
  name: globalState.player.name,
  gravatarEmail: globalState.player.gravatarEmail,
});

export default connect(mapStateToProps)(Feedback);
