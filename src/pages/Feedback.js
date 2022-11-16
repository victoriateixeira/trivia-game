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
    return (
      <>
        <Header />
        {assertions < tres ? <h2 data-testid="feedback-text">Could be better...</h2>
          : <h2 data-testid="feedback-text">Well Done!</h2> }
        <br />
        <span>
          You got
          {' '}
          <span data-testid="feedback-total-question">{assertions}</span>
          {' '}
          questions right!
        </span>
        <br />
        <span>
          Score:
          {' '}
          <span data-testid="feedback-total-score">{score}</span>
        </span>
        <button
          type="button"
          onClick={ () => history.push('/') }
          data-testid="btn-play-again"
        >
          Play Again
        </button>
        <button
          type="button"
          onClick={ () => history.push('/ranking') }
          data-testid="btn-ranking"
        >
          Ranking
        </button>
      </>
    );
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
