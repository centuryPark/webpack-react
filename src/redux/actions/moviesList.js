import HttpClient from '../../tools/httpClient';

export const SET_MOVIES_LIST = 'SET_MOVIES_LIST';

const setMovies = (data) => {
  return {
    type: SET_MOVIES_LIST,
    data: data
  }
};

export function getMoviesList() {
  return (dispatch) => {
    HttpClient.request(
      {
        method: 'get',
        url: '/api/my/movies',
        withCredentials: true,
        headers: {
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDIwOTc5MDAsInVzZXJuYW1lIjoiZ29uZ3l1YW4ifQ.MO5Wau3dgSJtjGErzxbNDJHzu40hhkgw8Qr060W0aCg'
        }
      }
    ).then((data)=>{
      dispatch(setMovies(data))
    })
  };
}
