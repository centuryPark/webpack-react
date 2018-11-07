import React, {Component} from 'react';
import HttpClient from '../../tools/httpClient';


class Login extends Component {
    state = {
        username: '',
        password: ''
    };
    handelLogin = () => {
        const {username, password} = this.state;
        if (!username) {
            console.log('请输入用户名');
            return;
        }
        if (!password) {
            console.log('请输入密码');
            return;
        }
        HttpClient.setBefore(()=>{
            console.log(1)
        });
        HttpClient.setAfter(()=>{
            console.log(2)
        });
        HttpClient.send({
            method: 'post',
            url: '/api/my/user/login',
            /*transformResponse: [(res) => {
                // todo 判断code
                console.log(JSON.parse(res).msg);
                return res;
            }],*/
            /*validateStatus(status) { //判断状态码多少属于成功，多少属于失败；比较少使用
                console.log(status);
                return status < 400
            },*/
            data: {
                username,
                password
            }
        }).then((res) => {
            const token = res.data.data.token;
            // todo 保存token
            const {history} = this.props;
            history.push({pathname: '/'});
        });
    };
    handelInput = (key, e) => {
        const value = e.target.value;
        this.setState({
            [key]: value
        })
    };

    render() {
        const {username, password} = this.state;
        return (
            <div className="page-login">
                <h2>登陆</h2>
                <div className="user-group">
                    <p className="title">登录账号，获取更多功能</p>
                    <div className="phone-number">
                        <input
                            value={username}
                            className="input-default"
                            type="text"
                            placeholder="手机号"
                            onChange={(e) => {
                                this.handelInput('username', e)
                            }}
                        />
                    </div>
                    <div className="phone-number">
                        <input
                            value={password}
                            className="input-default"
                            type="password"
                            placeholder="请输入密码"
                            onChange={(e) => {
                                this.handelInput('password', e)
                            }}
                        />
                    </div>
                    <div className="btn submit" onClick={this.handelLogin}><span>立即登录</span></div>
                </div>
                <footer className="footer">
                    Copyright@© 2018 开发者 gong yuan 所有<br/>
                    Email：gongyuan931024@163.com
                </footer>
            </div>
        );
    }
}

export default Login;
