import { GET_RESERVATIONS_FOR_A_MOVIE_REQUEST, GET_RESERVATIONS_FOR_A_MOVIE_SUCCESS, GET_RESERVATIONS_FOR_A_MOVIE_FAILURE } from '../actions/reservationAction'


const reservationInitialState = {
  currentReservations: []
}


export const reservationReducer = (state = reservationInitialState, action) => {
  if (action.type === GET_RESERVATIONS_FOR_A_MOVIE_REQUEST) {
    console.log('reservation request')
    return { ...state }
  }
  if (action.type === GET_RESERVATIONS_FOR_A_MOVIE_SUCCESS) {
    console.log('reservation success')
    return { ...state }
  }
  if (action.type === GET_RESERVATIONS_FOR_A_MOVIE_FAILURE) {
    console.log('reservation failure')
    return { ...state }
  }
  return state
}