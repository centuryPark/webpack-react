import React, {Component} from 'react';
import axios from 'axios';
import BaseRoute from '../../pages/router';
import Loading from '../loading';

class App extends Component {

  componentDidMount() {
    /*axios.get('/api/my/movies', {
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
    });*/
  }

  render() {
    return (
      <div className="container">
        <Loading />
        <BaseRoute />
      </div>
    )
  }
}

export default App;
