import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div className="page-about">
        <h2>技术栈描述</h2>
        <hr />
        <h4>1. 前端环境</h4>
        <p>
                    webpack4 react16 react-router4
        </p>
        <p>
                    生产环境使用docker部署，koa代理出静态页面
        </p>
        <h4>2. 后端</h4>
        <p>打算使用golang,同样使用docker部署</p>
      </div>
    );
  }
}

export default About;
