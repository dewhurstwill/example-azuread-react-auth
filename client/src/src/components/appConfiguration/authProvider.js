import React from 'react';
import jwt from 'jsonwebtoken';

import { getJwtFromLocalStorage, createRedirectState } from '../../helpers/auth/authenticationHelper';
import settings from '../../settings';

class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggingIn: false,
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.timer = setInterval(this.checkAndMaybeInjectIframe, 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.mounted = false;
  }

  injectIframe = () => {
    if (this.el) {
      this.el.remove();
    }

    // Tidy up any artefacts that might be lingering...
    const iframes = [...document.querySelectorAll('.data-auth-refresh-iframe')];
    iframes.forEach(iframe => iframe.remove());

    this.el = document.createElement('iframe');
    this.el.classList.add('data-auth-refresh-iframe');

    Object.assign(this.el.style, {
      height: '0',
      width: '0',
      visibility: 'hidden',
      position: 'absolute',
      left: '-10000',
      top: '-10000',
    });

    const state = createRedirectState({ autoLogin: true });
    const url = `https://login.microsoftonline.com/${settings.tenantId}/oauth2/v2.0/authorize?client_id=${settings.clientId}&response_type=token&response_mode=form_post&redirect_uri=${settings.redirectUri}&scope=openid+${settings.clientId}%2F.default&state=${state}`;
    this.el.src = url;

    document.body.appendChild(this.el);
  }

  checkAndMaybeInjectIframe = () => {
    const token = getJwtFromLocalStorage();
    const decodedJwt = jwt.decode(token);

    if (token == null || decodedJwt == null || !decodedJwt) {
      return null;
    }

    const { exp } = decodedJwt;

    const expires = new Date(exp * 1000);

    // If the token will expire in the next 5 minutes, attempt to refresh the session
    if (
      expires.getTime() - (5 * 60 * 1000) <= Date.now()
      && !this.state.isLoggingIn
      && this.mounted
    ) {
      this.setState({ isLoggingIn: true });
      this.injectIframe();
      setTimeout(() => {
        if (this.el) {
          this.el.remove();
          this.el = null;
        }
        this.setState({ isLoggingIn: false });
      }, 15 * 1000);
    }

    return null;
  }

  render() {
    return this.props.children;
  }
}

export default AuthProvider;
