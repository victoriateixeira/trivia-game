import React from 'react';

import { screen } from '@testing-library/react';
// import { Login } from '../pages';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe ('Login page tests', () => {
  test('tests if the login page contains a name input', () => {
    renderWithRouterAndRedux (<App />);
    const nameInput = screen.getByTestId('input-player-name');
    expect (nameInput).toBeInTheDocument();
  });
  test('tests if the login page contains an email input', () => {
    renderWithRouterAndRedux (<App />);
    const emailInput = screen.getByTestId('input-gravatar-email');
    expect (emailInput).toBeInTheDocument();
  });
  test('tests if the login page contains a "Play" button', () => {
    renderWithRouterAndRedux (<App />);
    const playButton = screen.getByRole('button', {name: 'Play'});
    expect (playButton).toBeInTheDocument();
  });
  test('tests if "Play" button is disabled when the component mounts', () => {
    renderWithRouterAndRedux (<App />);
    const playButton = screen.getByRole('button', {name: 'Play'});
    expect (playButton).toBeInTheDocument();
    expect (playButton).toBeDisabled();
  });
  test('tests if "Play" button is disabled when the email input is empty', () => {
    renderWithRouterAndRedux (<App />);
    const name = 'John Doe';
    const playButton = screen.getByRole('button', {name: 'Play'});
    const nameInputField = screen.getByTestId('input-player-name');
    expect (playButton).toBeInTheDocument();
    userEvent.type(nameInputField, name)
    expect (playButton).toBeDisabled();
  });
  test('tests if "Play" button is disabled when the name input is empty', () => {
    renderWithRouterAndRedux (<App />);
    const email = 'johndoe@example.com';
    const playButton = screen.getByRole('button', {name: 'Play'});
    const emailInputField = screen.getByTestId('input-gravatar-email')
    expect (playButton).toBeInTheDocument();
    userEvent.type(emailInputField, email)
    expect (playButton).toBeDisabled();
  });
  test('tests if "Play" button is enabled when the name and email inputs are filled', () => {
    renderWithRouterAndRedux (<App />);
    const email = 'johndoe@example.com';
    const name = 'John Doe';
    const playButton = screen.getByRole('button', {name: 'Play'});
    const emailInputField = screen.getByTestId('input-gravatar-email')
    const nameInputField = screen.getByTestId('input-player-name')
    expect (playButton).toBeInTheDocument();
    userEvent.type(emailInputField, email);
    userEvent.type(nameInputField, name);
    expect (playButton).not.toBeDisabled();
  });
  test('tests if "Play" button makes a request to API', async() => {
    const mockRequestToken = [
      {
        response_code:0,
        response_message:"Token Generated Successfully!",
        token:"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
      }
    ];

    global.fetch = jest.fn(() => Promise.resolve ({
      json: () => Promise.resolve(mockRequestToken),
    }));

    renderWithRouterAndRedux (<App />);
    const email = 'johndoe@example.com';
    const name = 'John Doe';
    const url = 'https://opentdb.com/api_token.php?command=request';
    const playButton = screen.getByRole('button', {name: 'Play'});
    const emailInputField = screen.getByTestId('input-gravatar-email')
    const nameInputField = screen.getByTestId('input-player-name')
    expect (playButton).toBeInTheDocument();
    userEvent.type(emailInputField, email);
    userEvent.type(nameInputField, name);
    userEvent.click(playButton);
  
    expect(global.fetch).toBeCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(url);
  });
  // test('tests if "Play" button redirects user to game page', () => {
  //   const {history} = renderWithRouterAndRedux(<App />);
  //   const email = 'johndoe@example.com';
  //   const name = 'John Doe';
  //   const playButton = screen.getByRole('button', {name: 'Play'});
  //   const emailInputField = screen.getByTestId('input-gravatar-email')
  //   const nameInputField = screen.getByTestId('input-player-name')
  //   expect (playButton).toBeInTheDocument();
  //   userEvent.type(emailInputField, email);
  //   userEvent.type(nameInputField, name);
  //   userEvent.click(playButton);
  //   const { location: { pathname } } = history;
  //   expect(pathname).toBe('/game');

  // });
  test('tests if Login page contains a "Settings" button', () => {
   renderWithRouterAndRedux (<App />);
    const settingsButton = screen.getByTestId('btn-settings');
    expect (settingsButton).toBeInTheDocument();
   
  });
  test('tests if "Settings" button redirects user to settings page', () => {
    const {history} = renderWithRouterAndRedux (<App />)
    const settingsButton = screen.getByTestId('btn-settings');
    expect (settingsButton).toBeInTheDocument();
    userEvent.click(settingsButton);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/settings');
   
  });
});