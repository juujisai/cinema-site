import axios from 'axios'
export const GET_RESERVATIONS_FOR_A_MOVIE = 'GET_RESERVATIONS_FOR_A_MOVIE'
export const GET_RESERVATIONS_FOR_A_MOVIE_REQUEST = 'GET_RESERVATIONS_FOR_A_MOVIE_REQUEST'
export const GET_RESERVATIONS_FOR_A_MOVIE_SUCCESS = 'GET_RESERVATIONS_FOR_A_MOVIE_SUCCESS'
export const GET_RESERVATIONS_FOR_A_MOVIE_FAILURE = 'GET_RESERVATIONS_FOR_A_MOVIE_FAILURE'

const a = process.env.REACT_APP_API_RESERVATION


export const getReservationsForAMovieRequest = (data) => {
  return { type: GET_RESERVATIONS_FOR_A_MOVIE_REQUEST, payload: { loading: true } }

}
export const getReservationsForAMovieSuccess = (reservation) => {
  return { type: GET_RESERVATIONS_FOR_A_MOVIE_SUCCESS, payload: { loading: false, reservation } }

}

export const getReservationsForAMovieFailure = (error) => {
  return { type: GET_RESERVATIONS_FOR_A_MOVIE_FAILURE, payload: { error, loading: false } }

}

export const getReservationsForAMovie = (data) => {
  return (dispatch) => {
    dispatch(getReservationsForAMovieRequest())


    axios.get(a)
      .then(response => {
        console.log('pobieram filmy')
        let dataToPush = response.data.data

        dataToPush = dataToPush.filter(item => item.id === data)
        console.log(dataToPush)


        dispatch(getReservationsForAMovieSuccess(dataToPush))
      })
      .catch(err => {
        dispatch(getReservationsForAMovieFailure(err))
      })
  }
}

export const SET_PICKED_DATE = 'SET_PICKED_DATE'

export const setPickedDate = (data) => {
  return { type: SET_PICKED_DATE, payload: data }
}



