import React, {Component} from 'react';


class Login extends Component {
    state = {
        mobile: '',
        smsCode: ''
    };
    handelLogin = () => {
        const {mobile, smsCode} = this.state;
        if (!mobile) {
            console.log('请输入手机号');
            return;
        }
        if (!smsCode) {
            console.log('请输入验证码');
            return;
        }
        // todo 验证用户名和密码, 获取登陆成功后返回页面
        setTimeout(() => {
            const {history} = this.props;
            history.push({pathname: '/'});
        }, 100);
    };
    handelInput = (key, e) => {
        const value = e.target.value;
        this.setState({
            [key]: value
        })
    };

    render() {
        const {mobile, smsCode} = this.state;
        return (
            <div className="page-login">
                <h2>登陆</h2>
                <div className="user-group">
                    <p className="title">注册账号，获取更多功能</p>
                    <div className="phone-number">
                        <input
                            value={mobile}
                            className="input-default"
                            type="number"
                            placeholder="手机号"
                            onChange={(e) => {
                                this.handelInput('mobile', e)
                            }}
                        />
                    </div>
                    <div className="sms-number">
                        <input
                            value={smsCode}
                            className="input-default"
                            type="number"
                            placeholder="验证码"
                            onChange={(e) => {
                                this.handelInput('smsCode', e)
                            }}
                        />
                        <button className="btn send-sms"><span>获取验证码</span></button>
                    </div>
                    <div className="btn submit" onClick={this.handelLogin}><span>立即注册</span></div>
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
