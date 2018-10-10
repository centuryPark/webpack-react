import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import MyRouter from './component/router';
import './style/style.scss';

ReactDOM.render(
    <BrowserRouter>
        <MyRouter />
    </BrowserRouter>,
    document.getElementById('root')
);
