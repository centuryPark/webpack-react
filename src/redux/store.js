import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import * as reducers from './reducers';

export default (history, initialState) => {
  // redux 调试插件配置
  let composeEnhancer;
  if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
    composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  } else {
    composeEnhancer = compose;
  }
  return createStore(
    combineReducers(
      {
        ...reducers,
        router: connectRouter(history),
      },
    ),
    initialState,
    composeEnhancer(
      applyMiddleware(
        routerMiddleware(history),
        thunkMiddleware,
      ),
    ),
  );
};
