import React from 'react';
import { useDispatch } from 'react-redux';

import useGetParamsFromUrl from '../../hooks/useGetParamsFromUrl';
import { logOut } from '../../actions/logOut/logoutActions';
import { logOutUser } from '../../helpers/auth/authenticationHelper';

import Layout from '../Layout/Layout';

const AuthenticationFailed = () => {
  const { message } = useGetParamsFromUrl();
  const dispatch = useDispatch();
  
  const tryAgainClick = () => {
    dispatch(logOut());
    logOutUser();
  };
  
  return (
      <Layout text="Error">
        <section>
              <div style={{"paddingTop": "30px"}}>
                  <div className="w3-center">
                    <h2>{`Failed to log in: ${message || "Something went wrong"}`}</h2>
                  </div>
                  <div style={{"textAlign": "center", "paddingTop": "20px" }}>
                        <button 
                            onClick={tryAgainClick}
                            className="w3-button w3-black w3-hover-grey w3-round"
                            >
                            Try Again
                        </button>
                    </div>
              </div>
          </section>
      </Layout>
  );
}

export default AuthenticationFailed;