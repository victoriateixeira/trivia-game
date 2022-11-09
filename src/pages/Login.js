import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };
  }

  handlesChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handlesDisableButton = () => {
    const { name, email } = this.state;
    const nameLength = name.length > 0;
    const emailLength = email.length > 0;
    return nameLength && emailLength;
  };

  render() {
    return (

      <form action="">
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            data-testid="input-player-name"
            id="name"
            onChange={ this.handlesChangeInput }

          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            data-testid="input-gravatar-email"
            id="email"
            onChange={ this.handlesChangeInput }
          />
        </label>
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ !this.handlesDisableButton() }
        >
          Play

        </button>
      </form>

    );
  }
}

export default Login;
