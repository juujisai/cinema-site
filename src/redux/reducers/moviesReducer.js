import { FETCH_MOVIE_DATA_REQUEST, FETCH_MOVIE_DATA_SUCCESS, FETCH_MOVIE_DATA_FAILURE } from '../actions/moviesAction'

const movesReducerInitialStore = {
  movies: []
}

export const moviesReducer = (state = movesReducerInitialStore, action) => {
  if (action.type === FETCH_MOVIE_DATA_REQUEST) {
    console.log('request')
    return { ...state }
  }

  if (action.type === FETCH_MOVIE_DATA_SUCCESS) {
    console.log('success')
    return { ...state }
  }

  if (action.type === FETCH_MOVIE_DATA_FAILURE) {
    console.log('failure')
    return { ...state }
  }


  return state
}