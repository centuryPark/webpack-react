import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Toast extends Component {
  static show(msg) {
    if (typeof window !== 'undefined') {
      if (!window.appToast) {
        window.appToast = document.createElement('div');
        document.body.appendChild(window.appToast);
      }
      ReactDOM.render(<Toast visible msg={msg} />, window.appToast);
    }
  }

  static hide() {
    ReactDOM.render(<Toast visible={false} />, window.appToast);
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false,
    };
  }

  componentDidMount() {
    const { visible } = this.props;
    if (visible) {
      this.enter(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    clearTimeout(this.timer);

    if (nextProps.visible) {
      this.enter(nextProps);
    } else {
      this.leave(nextProps);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  enter = (props) => {
    this.setState({
      visible: true,
    });

    this.timer = setTimeout(() => {
      this.leave(props);
      clearTimeout(this.timer);
    }, 2000);
  };

  leave = (props) => {
    this.setState({
      visible: false,
    });

    const { onClose } = props;
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  render() {
    const { visible } = this.state;
    const { msg } = this.props;
    return (
      <div className="component-toast" style={{ display: visible ? 'flex' : 'none' }}>
        <span>{msg}</span>
      </div>
    );
  }
}

/* if (typeof window !== 'undefined') {
  if (!window.appToast) {
    window.appToast = document.createElement('div');
    document.body.appendChild(window.appToast);
  }
  ReactDOM.render(<Toast visible={false} />, window.appToast);
} */

export default Toast;
