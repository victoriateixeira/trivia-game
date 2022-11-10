import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, name } = this.props;
    const gravatar = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${gravatar}`;
    return (
      <div>
        <img src={ url } alt={ name } data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.login.email,
  name: state.login.name,
});

export default connect(mapStateToProps)(Header);
