import axios from 'axios'
const a = process.env.REACT_APP_API_MOVIES

export const FETCH_MOVIE_DATA_REQUEST = 'FETCH_MOVIE_DATA_REQUEST'
export const FETCH_MOVIE_DATA_SUCCESS = 'FETCH_MOVIE_DATA_SUCCESS'
export const FETCH_MOVIE_DATA_FAILURE = 'FETCH_MOVIE_DATA_FAILURE'
export const FETCH_MOVIE_DATA = 'FETCH_MOVIE_DATA'

export const fetchMovieDataRequest = () => {
  return { type: FETCH_MOVIE_DATA_REQUEST, payload: { loading: true } }
}
export const fetchMovieDataSuccess = (movies) => {
  return { type: FETCH_MOVIE_DATA_SUCCESS, payload: { loading: false, movies } }
}
export const fetchMovieDataFailure = (error) => {
  return { type: FETCH_MOVIE_DATA_FAILURE, payload: { error, loading: false } }
}

export const fetchMovieData = () => {
  return (dispatch) => {
    console.log(a)
    dispatch(fetchMovieDataRequest())

    axios.get(a)
      .then(response => {
        console.log(response)
      })




  }
}
