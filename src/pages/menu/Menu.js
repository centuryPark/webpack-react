import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Menu extends Component {
  state = {
    moviesList: []
  };

  /*handelClick = () => {
     import(/!* webpackChunkName: "print" *!/ './print').then(module => {
         let print = module.default;
         print();
     });
 };*/

  componentDidMount() {
    axios.get('/api/my/movies', {
      // withCredentials: true,
      headers: {
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDIwOTc5MDAsInVzZXJuYW1lIjoiZ29uZ3l1YW4ifQ.MO5Wau3dgSJtjGErzxbNDJHzu40hhkgw8Qr060W0aCg'
      }
    }).then((res) => {
      this.setState({
        moviesList: res.data
      })
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    const {moviesList} = this.state;
    return (
      <div>
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
            <li>
              <Link to="/live">live</Link>
            </li>
          </ul>
        </div>
        <div>
          {
            moviesList.map((item) => {
              return (
                <p key={item.id}>{item.name}</p>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Menu;
