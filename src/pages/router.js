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
const ColgateComponent = Loadable({loader: () => import("./colgate/index"), loading: Loading, delay: 150});
const LoginComponent = Loadable({loader: () => import("./login/index"), loading: Loading, delay: 150});
const LiveListComponent = Loadable({loader: () => import("./liveList/index"), loading: Loading, delay: 150});

const NoMatch = ({location}) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

const BasicRouter = () => (
    <Switch>
      <Route exact path="/menu" render={() => {
        document.title = '菜单选择';
        return <Menu/>;
      }}/>
      <Redirect from="/" to="/menu"/>
      <Route path="/colgate" component={ColgateComponent}/>
      <Route path="/login" component={LoginComponent}/>
      <Route path="/about" component={AboutComponent}/>
      <Route path="/live" component={LiveListComponent}/>
      <Route path="*" component={NoMatch}/>
    </Switch>
);
export default BasicRouter
