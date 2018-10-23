import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

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

  componentDidMount() {
    axios.get('api/live/now/streams?size=11&marker=', {
      withCredentials: true
    }).then((res) => {
      this.setState({
        liveList: res.data.result
      })
    }).catch((err) => {
      console.log(err);
    });
  }

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
                    <li>
                        <Link to="/live">live</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Menu;
