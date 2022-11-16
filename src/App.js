import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Ranking from './pages/Ranking';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ</p>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/ranking" component={ Ranking } />
          <Route path="/game" component={ Game } />
          <Route path="/settings" component={ Settings } />
          <Route path="/feedback" component={ Feedback } />
        </Switch>
      </header>
    </div>
  );
}
