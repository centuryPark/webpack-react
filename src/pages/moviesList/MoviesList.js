import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getMoviesList} from '../../redux/actions/moviesList';
import { showToast } from '../../redux/actions/toast';

class MoviesList extends Component {
  componentDidMount() {
    this.props.getMoviesList();
    setTimeout(()=>{
      this.props.showToast('请求成功');
    },1000)
  }

  render() {
    const {list} = this.props;
    return (
      <div>
        {
          list.map((item)=>{
            return (<div key={item.id}>{item.name}</div>)
          })
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    list: state.moviesList
  }
}

/*function mapDispatchToProps(dispatch) {
  return {
    getMoviesList() {
      dispatch(getMoviesList())
    },

  }
}*/

export default connect(mapStateToProps, {getMoviesList,showToast})(MoviesList);
