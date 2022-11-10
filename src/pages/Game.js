import React, { Component } from 'react';
import Header from '../components/Header';
import logo from '../trivia.png';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>GAME</p>
        </header>
      </div>
    );
  }
}

export default Game;
