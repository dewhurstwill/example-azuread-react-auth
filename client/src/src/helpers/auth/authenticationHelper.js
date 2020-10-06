import {v4 as uuid} from 'uuid';
import jwt from 'jsonwebtoken';
import settings from '../../settings';

export const AUTHENTICATION_ID_TOKEN_LOCAL_STORAGE_KEY = 'id_token';
export const AUTHENTICATION_NONCE_LOCAL_STORAGE_KEY = 'auth_nonce';

export const getJwtFromLocalStorage = () => window.localStorage.getItem(
  AUTHENTICATION_ID_TOKEN_LOCAL_STORAGE_KEY,
);

export const setJwtInLocalStorage = token => {
  window.localStorage.setItem(AUTHENTICATION_ID_TOKEN_LOCAL_STORAGE_KEY, token);
};

export const removeJwtFromLocalStorage = () => {
  window.localStorage.removeItem(AUTHENTICATION_ID_TOKEN_LOCAL_STORAGE_KEY);
};

export const createNonce = () => {
  const nonce = uuid();
  window.localStorage.setItem(AUTHENTICATION_NONCE_LOCAL_STORAGE_KEY, nonce);
  return nonce;
};

export const isValidLoginRedirectNonce = nonce => {
  const localStorageNonce = window.localStorage.getItem(AUTHENTICATION_NONCE_LOCAL_STORAGE_KEY);
  return nonce != null && localStorageNonce === nonce;
};

export const createRedirectState = () => {
  const nonce = createNonce();
  const state = btoa(
    JSON.stringify({
      nonce,
    }),
  );
  return state;
};

const navigateToUrl = url => {
  window.location.replace(url);
};

export const redirectUserToLoginPage = () => {
  const state = createRedirectState();
  const url = `https://login.microsoftonline.com/${settings.tenantId}/oauth2/v2.0/authorize?client_id=${settings.clientId}&response_type=token&response_mode=form_post&redirect_uri=${settings.redirectUri}&scope=openid+${settings.clientId}%2F.default&state=${state}`;
  navigateToUrl(url);
};

export const redirectUserToLogOutPage = () => {
  const url = `https://login.microsoftonline.com/${settings.tenantId}/oauth2/v2.0/logout?post_logout_redirect_uri=${window.location.origin}/`;
  navigateToUrl(url);
};

export const invalidateSessionAndForceLogin = () => {
	removeJwtFromLocalStorage();
	redirectUserToLoginPage();
};

export const logOutUser = () => {
	removeJwtFromLocalStorage();
	redirectUserToLogOutPage();
};

export const getValidTokenAndRedirectIfInvalid = () => {
	const token = getJwtFromLocalStorage();
	const decodedJwt = jwt.decode(token);

	if (token == null || decodedJwt == null || !decodedJwt) {
		invalidateSessionAndForceLogin();
		return null;
	}

	const { exp } = decodedJwt;

	// If the token has expired, redirect to the log in page
	const expires = new Date(exp * 1000);
	if (expires.getTime() <= Date.now()) {
    	invalidateSessionAndForceLogin();
    	return null;
	}
	return token;
};