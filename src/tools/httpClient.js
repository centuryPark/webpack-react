import axios from 'axios';
import Toast from '../component/toast'

class HttpClient {
  static setBefore(hook) {
    axios.interceptors.request.use((config) => {
      if (typeof hook === 'function') {
        hook();
      }
      return config;
    }, ((error) => {
      return Promise.reject(error);
    }));
  }

  static setAfter(hook) {
    axios.interceptors.response.use((response) => {
      if (typeof hook === 'function') {
        hook();
      }
      return response;
    }, ((error) => {
      if (typeof hook === 'function') {
        hook();
      }
      return Promise.reject(error);
    }));
  }

  static request(opt) {
    return axios(opt)
      .then((response) => {
        // >>>>>>>>>>>>>> 请求成功 <<<<<<<<<<<<<<
        // 业务逻辑错误
        if (response.data && response.data.code !== '0000') {
          // todo 增加业务逻辑判断
        }
        return response.data;
      })
      .catch((error) => {
        // >>>>>>>>>>>>>> 请求失败 <<<<<<<<<<<<<<
        // 请求配置发生的错误,ex:没有网络
        if (!error.response) {
          return Toast.show(`无反馈：${error.message}`);
        }
        // 响应时状态码处理
        const status = error.response.status;
        // const errortext = codeMessage[status] || error.response.statusText;
        const errortext = error.response.statusText;

        if (error.response.data && error.response.data.msg) {
          Toast.show(error.response.data.msg);
          return Promise.reject();
        }

        // 存在请求，服务器的返回非2XX状态码
        if (status === 401) {
          // todo 重定向到登陆页面
        } else if (status === 403) {
          Toast.show(`${status}: 没有权限访问,请联系管理员`);
        } else if (status <= 504 && status >= 500) {
          Toast.show(`${status}: 服务器内部错误`);
        } else if (status >= 404 && status < 422) {
          Toast.show(`${status}: 未找到资源`);
        }
        return Promise.reject();
      });
  }
}

export default HttpClient;

