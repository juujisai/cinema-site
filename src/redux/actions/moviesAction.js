import axios from 'axios'
const a = process.env.REACT_APP_API_MOVIES

export const FETCH_MOVIE_DATA_REQUEST = 'FETCH_MOVIE_DATA_REQUEST'
export const FETCH_MOVIE_DATA_SUCCESS = 'FETCH_MOVIE_DATA_SUCCESS'
export const FETCH_MOVIE_DATA_FAILURE = 'FETCH_MOVIE_DATA_FAILURE'
export const FETCH_MOVIE_DATA = 'FETCH_MOVIE_DATA'

export const SWITCH_FILTER_VISIBILITY = 'SWITCH_FILTER_VISIBILITY'



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
    dispatch(fetchMovieDataRequest())
    axios.get(a)
      .then(response => {
        console.log('pobieram filmy')
        dispatch(fetchMovieDataSuccess(response.data.data))
      })
      .catch(err => {
        dispatch(fetchMovieDataFailure(err))
      })
  }
}

export const switchFilterVisibility = () => {
  return { type: SWITCH_FILTER_VISIBILITY }
}


export const FILTER_DATA = 'FILTER_DATA'
export const SET_FILTERED_DATA = 'SET_FILTERED_DATA'

export const setFilteredData = (data, isEmpty) => {
  return { type: SET_FILTERED_DATA, payload: { data, isEmpty } }
}

export const filterData = (data, filters) => {
  return (dispatch) => {
    let originalData = data
    let filtered = [...originalData]
    let filtersArray = filters

    // filter by categories
    if (filtersArray[0] !== 'all') {
      filtered = filtered.filter(item => item.attributes.category.split(' / ').includes(filtersArray[0]))
    }

    // filter by time of play
    if (filtersArray[1] !== 'all') {
      filtered = filtered.filter(item => item.attributes.timeOfPlay === filtersArray[1])
    }

    // filter by year of premiere

    filtered = filtered.filter(item => item.attributes.yearOfPremiere <= filtersArray[2])

    // filter by featured

    if (filtersArray[3]) {
      filtered = filtered.filter(item => item.attributes.featured === true)
    }

    let filteredEmpty = filtered.length === 0

    // console.log('przefiltrowane dane to: ', filtered)

    // console.log(data)
    dispatch(setFilteredData(filtered, filteredEmpty))
  }
}


export const MOVIES_PAGE_UNMOUNTED = "MOVIES_PAGE_UNMOUNTED"

export const moviesPageUnmounted = () => {
  return { type: MOVIES_PAGE_UNMOUNTED }
}