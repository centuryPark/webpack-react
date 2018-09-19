import _ from 'lodash';
import print from './print.js';
import './style/style.css';

function component() {
  var element = document.createElement('div');
  element.innerHTML = `<div>${_.join(['Hello', 'webpack'], ' ')}</div>`;
  element.onclick = function () {
    print();
  }
  return element;
}

document.body.appendChild(component());
