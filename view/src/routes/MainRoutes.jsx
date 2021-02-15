import React from 'react';
import { Route } from 'react-router-dom';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';

const MainRoutes = () => (
    <div>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/*" component={Home}/>
    </div>
);

export default MainRoutes;
