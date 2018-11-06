import React, { Component } from 'react'

class Loading extends Component {
  render() {
    const { show } = this.props;
    return(
      <div className="component-loading" style={{display: show? 'flex':'none'}}>
        loading...
      </div>
    )
  }
}

export default Loading
