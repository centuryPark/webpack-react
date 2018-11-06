import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './component/app';
// router demo basic
// import BasicRouter from './component/router-demo/basic';
// import ModalRouter from './component/router-demo/modal';
import './style/style.scss';

ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route path="/" component={App}/>
      </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);
