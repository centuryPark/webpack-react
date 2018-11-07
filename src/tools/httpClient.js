import axios from 'axios';

class HttpClient {
  constructor() {
    this.before = null;
    this.showLoading = true;
    this.withCredentials = true;
    this.options = {};
  }

  setBefore(hook) {
    this.before = hook;
  }

  setAfter(hook) {
    this.after = hook;
  }

  send(opt) {
    let {before, after, showLoading, options} = this;
    options = Object.assign(this.options, opt);
    if (typeof before === 'function') {
      before(showLoading);
    }
    let _promise = axios(options);
    // todo middlewares
    _promise = _promise.then(
      (res) => {
        if (typeof after === 'function') {
          after(showLoading);
        }
        return res;
      },
      (err) => {
        if (typeof after === 'function') {
          after(showLoading);
        }
        return Promise.reject(err);
      });
    _promise.catch((error) => {
      if (!error.response) {
        return console.log('Error', error.message);
      }
      if (error.response.status === 403) {
        return console.log(error.response.data.msg);
      }
    });
    return _promise;
  }
}

export default new HttpClient();
