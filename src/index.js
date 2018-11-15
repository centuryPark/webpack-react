import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'connected-react-router';
import App from './component/app';
import configureStore from './redux/store';
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
