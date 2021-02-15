import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Trades from '../pages/Trades';
import Notes from '../pages/Notes';
import Account from '../pages/Account';

const HomeRoutes = () => (
    <Router>
        <div>
           <Switch>
               <Route exact path="/" component={Trades}/>
               <Route exact path="/trades" component={Trades}/>
               <Route exact path="/notes" component={Notes}/>
               <Route exact path="/account" component={Account}/>
           </Switch>
        </div>
    </Router>
);

export default HomeRoutes;
