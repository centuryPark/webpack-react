import axios from "axios";
import { show, hide } from './loading';

export const SET_MOVIES_LIST = 'SET_MOVIES_LIST';

const setMovies = (data) => {
  return {
    type: SET_MOVIES_LIST,
    data: data
  }
};

export function getMoviesList() {
  return (dispatch) => {
    dispatch(show());
    axios.get('/api/my/movies', {
      // withCredentials: true,
      headers: {
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDIwOTc5MDAsInVzZXJuYW1lIjoiZ29uZ3l1YW4ifQ.MO5Wau3dgSJtjGErzxbNDJHzu40hhkgw8Qr060W0aCg'
      }
    }).then((res) => {
      dispatch(hide());
      dispatch(setMovies(res.data))
    }).catch((err) => {
      console.log(err);
    });
  };
}
