import React from 'react';
import { useDispatch } from 'react-redux';

import { logOut } from '../../actions/logOut/logoutActions';
import { logOutUser } from '../../helpers/auth/authenticationHelper';

import Layout from '../Layout/Layout';

const LogOut = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(logOut());
        logOutUser();
    }, [dispatch]);
    
    return <Layout text="Logging Out..."></Layout>;
}

export default LogOut;
