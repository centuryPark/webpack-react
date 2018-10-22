import React, { Component } from 'react';
import axios from 'axios';

class LiveList extends Component {
  state = {
    liveList: []
  };

  componentDidMount() {
    axios.get('api/live/now/streams?size=11&marker=').then((res) => {
      this.setState({
        liveList: res.data.result
      })
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    const { liveList } = this.state;
    return (
      <div className="page-live-list">
        <h3>跨域代理请求测试，数据采用造就直播列表。（如有侵权请联系删除）</h3>
        <div className="live-list">
          {
            liveList.map((item) => {
              const { coverUrl, desc, id } = item;
              return(
                <div className="live-item" key={id}>
                  <div className="banner">
                    <img src={coverUrl}/>
                  </div>
                  <div className="desc">
                    {desc}
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default LiveList;
