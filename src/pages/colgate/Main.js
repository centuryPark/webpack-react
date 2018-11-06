import React, { Component } from 'react';
import kv from './images/KV@2x.png';


class Login extends Component {
    render() {
        return (
            <div className="page-colgate">
                <div className="logo" />
                <div className="banner">
                    <div className="txt">
                        <h1>1元秒杀</h1>
                        <h4>活动倒计时：<span className="red">12:42:59:11</span></h4>
                        <p>高露洁火山矿石精粹 劲白牙膏</p>
                        <p>高露洁贝齿漱口水（口味随机发送）</p>
                    </div>
                    <div className="image">
                        <span className="tip">漱口水口味随机发送</span>
                    </div>
                </div>
                <div className="user-group">
                    <p className="title">两款产品仅需<span className="red">1元</span>，现在购买免<span className="red">邮费</span></p>
                    <div className="phone-number">
                        <input className="input-default" type="number" placeholder="手机号" />
                    </div>
                    <div className="sms-number">
                        <input className="input-default" type="number" placeholder="验证码" />
                        <button className="btn send-sms"><span>获取验证码</span></button>
                    </div>
                    <div className="btn submit"><span>立即注册</span></div>
                </div>
                <div className="kv">
                    <img className="kv-img" src={kv} alt="牙刷海报" />
                    <div className="download" />
                </div>
                <footer className="footer">
                    Copyright@© 2018  高露洁棕榄（中国）有限公司版权所有<br />
                    粤ICP备11046058号
                </footer>
            </div>
        );
    }
}

export default Login;
