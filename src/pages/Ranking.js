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
      const rankingSorted = ranking.ranking.sort((a, b) => b.score - a.score);
      this.setState({
        ranking: rankingSorted,
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
          <p data-testid="ranking-title">Ranking</p>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.redirectToLogin }
          >
            Login
          </button>
        </div>
        <div>
          {ranking.map((player, index) => (
            <div key={ i }>
              <img src={ player.gravatarImg } alt={ player.name } />
              <div data-testid={ `player-name-${index}` }>
                {player.name}
              </div>
              <div data-testid={ `player-score-${index}` }>
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
