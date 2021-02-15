import React from 'react';
import { Route } from 'react-router-dom';

import Trades from '../pages/Trades';
import Notes from '../pages/Notes';
import Account from '../pages/Account';

const HomeRoutes = () => (
    <div>
        <Route exact path="/" component={Trades}/>
        <Route exact path="/trades" component={Trades}/>
        <Route exact path="/notes" component={Notes}/>
        <Route exact path="/account" component={Account}/>
    </div>
);

export default HomeRoutes;
