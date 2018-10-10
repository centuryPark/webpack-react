import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import Loadable from "react-loadable";
import App from './app/app';
const Loading = () => "Loading...";
const AboutComponent = Loadable({ loader: () => import("./about/About"), loading: Loading, delay: 150 });

const NoMatch = ({location}) => (
    <div>
        <h3>
            No match for <code>{location.pathname}</code>
        </h3>
    </div>
);

const BasicRouter = () => (
    <Router basename="/">
        <div className='router'>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route exact path="/about" component={AboutComponent}/>
                <Route path="*" component={NoMatch}/>
            </Switch>
        </div>
    </Router>
);
export default BasicRouter
