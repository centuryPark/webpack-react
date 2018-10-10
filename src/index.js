import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import MyRouter from './component/router';
// router demo basic
// import BasicRouter from './component/router-demo/basic';
// import ModalRouter from './component/router-demo/modal';
import './style/style.scss';

ReactDOM.render(
    <BrowserRouter>
        <MyRouter />
    </BrowserRouter>,
    document.getElementById('root')
);
