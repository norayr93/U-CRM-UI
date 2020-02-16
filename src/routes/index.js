import React from 'react';
import {Switch, Route} from 'react-router-dom';
import MainLayout from '../layouts/main';
import Signup from '../layouts/signup';
import Login from '../layouts/login';
import Recovery from '../layouts/recovery';
import NewPassword from '../layouts/new-password/new-password';
import EmailVerification from '../layouts/email-verification';

import {
    SIGNUP_PAGE,
    LOGIN_PAGE,
    PASSWORD_RECOVERY,
    NEW_PASSWORD,
    EMAIL_VERIFICATION,
    SIGNUP_SUCCEED,
} from '../configs/constants/core';

import ProtectedRoutes from './protected-routes';
import SignupSucceed from '../layouts/signup-succeed';
import routes from './configs';
import {getRoutes} from '../services/helpers/core';

const Routes = () => (
    <Switch>
        <Route exact path={SIGNUP_PAGE} component={Signup} />
        <Route exact path={LOGIN_PAGE} component={Login} />
        <Route exact path={PASSWORD_RECOVERY} component={Recovery} />
        <Route exact path={`${NEW_PASSWORD}/:uuid?`} component={NewPassword} />
        <Route exact path={`${EMAIL_VERIFICATION}/:uuid?`} component={EmailVerification} />
        <Route exact path={SIGNUP_SUCCEED} component={SignupSucceed} />
        <MainLayout>
            <ProtectedRoutes>
                <Switch>
                    {getRoutes(routes, 'component')}
                </Switch>
            </ProtectedRoutes>
        </MainLayout>
        <Route render={() => <h1>Page not Found !!!</h1>} />
    </Switch>
);

export default Routes;