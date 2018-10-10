import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Menu extends Component {
    constructor() {
        super();
    }

    /* handelClick = () => {
        import(/!* webpackChunkName: "print" *!/ './print').then(module => {
            let print = module.default;
            print();
        });
    }; */

    render() {
        return (
            <div className="page-menu">
                <h1>菜单</h1>
                <ul>
                    <li>
                        <Link to="/">home</Link>
                    </li>
                    <li>
                        <Link to="/about">关于</Link>
                    </li>
                    <li>
                        <Link to="/colgate">colgate</Link>
                    </li>
                    <li>
                        <Link to="/login">登陆</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Menu;
