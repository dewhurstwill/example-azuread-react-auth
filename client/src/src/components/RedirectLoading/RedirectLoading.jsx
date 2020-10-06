import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import queryString from 'query-string';

import Layout from '../Layout/Layout';

import { setTokenAndStateInRedux } from '../../actions/userInfo/userInfoActions';
import useGetParamsFromUrl from '../../hooks/useGetParamsFromUrl';

import {
    invalidateSessionAndForceLogin,
    isValidLoginRedirectNonce,
} from '../../helpers/auth/authenticationHelper';

const RedirectLoading = ({ history }) => {
    const dispatch = useDispatch();
    const params = useGetParamsFromUrl();
    const hash = queryString.parse(window.location.hash);

    React.useEffect(() => {
        try {
            const { state } = params;
            const token = params.token || hash.token;
            const decodedState = JSON.parse(window.atob(state));

            const isValidNonce = isValidLoginRedirectNonce(decodedState.nonce);
            if (isValidNonce === false) {
                invalidateSessionAndForceLogin();
                return;
            }

            const decodedJwt = jwt.decode(token);

            if (decodedJwt != null) {
                dispatch(setTokenAndStateInRedux({ token, decodedJwt, stateObj: decodedState }));
                if (decodedState.redirectTo != null) {
                    history.push(decodedState.redirectTo);
                } else {
                    history.push('/');
                }
            } else {
                invalidateSessionAndForceLogin();
                return;
            }
        } catch (error) {
            console.log('Redirect Loading Error: ', error);
            invalidateSessionAndForceLogin();
        }
    }, [params, dispatch, history, hash]);

    return ( <Layout text="Loading..." /> );
};

RedirectLoading.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default RedirectLoading;
