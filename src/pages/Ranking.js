import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    if (ranking) {
      const orderedRanking = ranking.sort((a, b) => b.score - a.score);
      this.setState({
        ranking: orderedRanking,
      });
    }
  }

  redirectToLogin = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <div>
          <p>Ranking</p>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.redirectToLogin }
          >
            Login
          </button>
        </div>
        <div>
          {ranking.map((player, i) => (
            <div key={ i }>
              <img src={ player.gravatarImg } alt={ player.name } />
              <div data-testid={ `player-name-${i}` }>
                {player.name}
              </div>
              <div data-testid={ `player-score-${i}` }>
                {player.score}
              </div>
            </div>
          ))}
        </div>
      </div>

    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
