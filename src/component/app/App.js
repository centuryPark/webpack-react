import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class App extends Component {
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
            <div>
                <h1>my react</h1>
                <ul>
                    <li>
                        <Link to="/">home</Link>
                    </li>
                    <li>
                        <Link to="/about">about</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default App;