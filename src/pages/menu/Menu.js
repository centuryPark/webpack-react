import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
  /* handelClick = () => {
     import(/!* webpackChunkName: "print" *!/ './print').then(module => {
         let print = module.default;
         print();
     });
 }; */

  render() {
    return (
      <div>
        <div className="page-menu">
          <h1>菜单</h1>
          <ul>
            <li>
              <Link to="/about">关于</Link>
            </li>
            <li>
              <Link to="/login">登陆</Link>
            </li>
            <li>
              <Link to="/live">live</Link>
            </li>
            <li>
              <Link to="/movies">电影列表</Link>
            </li>
            <li>
              <Link to="/dot">积分</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Menu;
