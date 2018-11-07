import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Toast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false,
    };
  }

  componentDidMount() {
    if (this.props.visible) {
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
    const {visible} = this.state;
    return (
      <div className="component-toast" style={{display: visible ? 'flex' : 'none'}}>
        <span>toast</span>
      </div>
    )
  }
}

if (typeof window !== 'undefined') {
  if (!window.appToast) {
    window.appToast = document.createElement('div');
    document.body.appendChild(window.appToast);
  }
  ReactDOM.render(<Toast visible={false} />, window.appToast);
}

export default Toast;
