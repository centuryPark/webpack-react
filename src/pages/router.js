import React from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Loadable from "react-loadable";
import Menu from './menu/index';

const Loading = () => "Loading...";
const AboutComponent = Loadable({loader: () => import("./about/index"), loading: Loading, delay: 150});
const LoginComponent = Loadable({loader: () => import("./login/index"), loading: Loading, delay: 150});
const LiveListComponent = Loadable({loader: () => import("./liveList/index"), loading: Loading, delay: 150});
const moviesListComponent = Loadable({loader: () => import("./moviesList/index"), loading: Loading, delay: 150});

const NoMatch = ({location}) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

const BasicRouter = () => (
    <Switch>
      <Route path="/menu" render={() => {
        document.title = '菜单选择';
        return <Menu/>;
      }}/>
      <Redirect exact from="/" to="/menu"/>
      <Route path="/login" component={LoginComponent}/>
      <Route path="/about" component={AboutComponent}/>
      <Route path="/live" component={LiveListComponent}/>
      <Route path="/movies" component={moviesListComponent}/>
      <Route path="*" component={NoMatch}/>
    </Switch>
);
export default BasicRouter
