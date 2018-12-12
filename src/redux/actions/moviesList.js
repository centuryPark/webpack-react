import HttpClient from '../../tools/httpClient';

export const SET_MOVIES_LIST = 'SET_MOVIES_LIST';

const setMovies = data => ({
  type: SET_MOVIES_LIST,
  data,
});

export function getMoviesList() {
  return (dispatch) => {
    HttpClient.request(
      {
        method: 'get',
        url: '/api/my/movies',
        withCredentials: true,
      },
    ).then((data) => {
      dispatch(setMovies(data));
    });
  };
}
