import React, { Component } from 'react';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      img: '',
      name: '',
      score: 0,
    };
  }

  render() {
    const { img, name, score } = this.state;
    return (
      <div>
        <img src={ img } alt={ name } data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

export default Header;
