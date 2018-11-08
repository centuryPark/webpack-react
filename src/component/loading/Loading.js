import React, { Component } from 'react';
import { connect } from 'react-redux';

class Loading extends Component {
  render() {
    const { isShow } = this.props;
    return (
      <div className="component-loading" style={{ display: isShow ? 'flex' : 'none' }}>
        loading...
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isShow: state.loading,
  };
}

export default connect(mapStateToProps)(Loading);
