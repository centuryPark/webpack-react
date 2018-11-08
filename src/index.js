import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import App from './component/app';
import configureStore from './redux/store';
// router demo basic
// import BasicRouter from './component/router-demo/basic';
// import ModalRouter from './component/router-demo/modal';
import './style/style.scss';


const initState = {};
const history = createBrowserHistory();
const store = configureStore(history, initState);
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
