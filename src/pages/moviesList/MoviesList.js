import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMoviesList } from '../../redux/actions/moviesList';

class MoviesList extends Component {
  componentDidMount() {
    this.props.getMoviesList();
  }

  render() {
    const { list } = this.props;
    return (
      <div className="page-movie-list">
        {
          list.map(item => (<div key={item.id}>{item.name}</div>))
        }
        <button type="button" onClick={() => this.props.getMoviesList()}>再来一次</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { moviesList } = state;
  return {
    list: moviesList,
  };
}

/* function mapDispatchToProps(dispatch) {
  return {
    getMoviesList() {
      dispatch(getMoviesList())
    },

  }
} */

export default connect(mapStateToProps, { getMoviesList })(MoviesList);
