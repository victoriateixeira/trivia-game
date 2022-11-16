import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

  render() {
    const { ranking } = this.state;
    const { history } = this.props;

    return (
      <div>
        <div>
          <h1 data-testid="ranking-title">Ranking</h1>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => history.push('/') }
          >
            Login
          </button>
        </div>
        <div>
          {ranking.map((player, index) => (
            <div key={ index }>
              <img src={ player.gravatarImg } alt={ player.name } />
              <p data-testid={ `player-name-${index}` }>
                {player.name}
              </p>
              <p data-testid={ `player-score-${index}` }>
                {player.score}
              </p>
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

export default connect()(Ranking);
