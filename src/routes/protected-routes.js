import React from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import {StorageManager} from '../services/utilities';
import {LOGIN_PAGE, AUTH_LIST} from '../configs/constants';

const ProtectedRoutes = ({
    children,
}) => {
    const history = useHistory();

    const isLoggedIn = StorageManager.get('session') || 'test-fake';

    if (!isLoggedIn && !AUTH_LIST.includes(history.location.pathname)) {
        return <Redirect to={LOGIN_PAGE} />;
    }

    return (<main>{children}</main>);
};

export default ProtectedRoutes;