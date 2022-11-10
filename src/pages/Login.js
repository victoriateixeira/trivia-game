import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getToken } from '../redux/actions';

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

  handlesSettingsButton = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  handleClickPlay = async (event) => {
    event.preventDefault();
    const { history, loading, dispatch } = this.props;
    await dispatch(getToken());
    if (!loading) {
      history.push('/game');
    }
  };

  render() {
    return (
      <>
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
            onClick={ this.handleClickPlay }
          >
            Play

          </button>
        </form>

        <button
          type="submit"
          data-testid="btn-settings"
          onClick={ this.handlesSettingsButton }
        >
          Settings

        </button>
      </>
    );
  }
}

const mapStateToProps = ({ game: { loading, token } }) => ({
  loading,
  token,
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Login);
