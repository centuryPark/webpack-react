import _ from 'lodash';
//import print from './print.js';
import './style/style.css';

function component() {
  var element = document.createElement('div');
  element.innerHTML = `<div>${_.join(['Hello', 'webpack'], ' ')}</div>`;// 按需加载
  element.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
    var print = module.default;
    print();
  });
  return element;
}

document.body.appendChild(component());
