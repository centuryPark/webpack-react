import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './reducers';

// redux 调试插件配置
let DevToolsInstrument;
if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
  DevToolsInstrument = window.devToolsExtension();
}

export default (history, initialState) => {
  // const reduxRouterMiddleware = routerMiddleware(history);
  // const middleware = [reduxRouterMiddleware, thunkMiddleware];

  // 添加异步action中间件
  const middleware = [thunkMiddleware];

  let finalCreateStore;
  if (DevToolsInstrument) {
    finalCreateStore = compose(applyMiddleware(...middleware), DevToolsInstrument)(createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(createStore);
  }

  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer,
  });

  return finalCreateStore(reducer, initialState);
};
