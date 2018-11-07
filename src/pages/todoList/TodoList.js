import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../../redux/actions/counter';

class TodoList extends Component {
  render(){
    const { value, onIncrement, onDecrement } = this.props;
    return(
      <div>
        {/*<input type="text" placeholder="请输入代办事项"/>*/}
        <hr/>
        <div>
          <span onClick={()=>{onDecrement()}}>-</span>
          <span>{value}</span>
          <span onClick={()=>{onIncrement()}}>+</span>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return{
    value: state.counter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onIncrement() {
      dispatch(increment());
    },
    onDecrement() {
      dispatch(decrement());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
