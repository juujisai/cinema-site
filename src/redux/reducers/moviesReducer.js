import { FETCH_MOVIE_DATA_REQUEST, FETCH_MOVIE_DATA_SUCCESS, FETCH_MOVIE_DATA_FAILURE, SWITCH_FILTER_VISIBILITY, SET_FILTERED_DATA, MOVIES_PAGE_UNMOUNTED } from '../actions/moviesAction'

const movesReducerInitialStore = {
  movies: [],
  loading: false,
  filterVisibility: false,
  filteredData: [],
  isFilteredEmpty: false
}

export const moviesReducer = (state = movesReducerInitialStore, action) => {
  if (action.type === FETCH_MOVIE_DATA_REQUEST) {
    console.log('request')
    return { ...state, loading: action.payload.loading }
  }

  if (action.type === FETCH_MOVIE_DATA_SUCCESS) {
    console.log('success')
    return { ...state, movies: action.payload.movies, loading: action.payload.loading }
  }

  if (action.type === FETCH_MOVIE_DATA_FAILURE) {
    console.log('failure')
    return { ...state, loading: action.payload.loading, errorMsg: action.payload.error }
  }

  if (action.type === SWITCH_FILTER_VISIBILITY) {
    return { ...state, filterVisibility: !state.filterVisibility }
  }

  if (action.type === SET_FILTERED_DATA) {
    // console.log('przefiltrowane')
    return { ...state, filteredData: action.payload.data, isFilteredEmpty: action.payload.isEmpty }
  }

  if (action.type === MOVIES_PAGE_UNMOUNTED) {
    // console.log('unmounting from filters')
    return { ...state, filteredData: [], isFilteredEmpty: false }

  }

  return state
}