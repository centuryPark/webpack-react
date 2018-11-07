import React, {Component} from 'react';
import { connect } from 'react-redux';
import BaseRoute from '../../pages/router';
import Loading from '../loading';
import Toast from '../toast';

class App extends Component {

  render() {
    const { showToast, toastMsg } = this.props;
    return (
      <div className="container">
        <Loading />
        <Toast visible={showToast} msg={toastMsg} />
        <BaseRoute />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {toast:{show,msg}} = state;
  return {
    showToast: show,
    toastMsg: msg
  }
}

export default connect(mapStateToProps)(App);
