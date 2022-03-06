import { GET_RESERVATIONS_FOR_A_MOVIE_REQUEST, GET_RESERVATIONS_FOR_A_MOVIE_SUCCESS, GET_RESERVATIONS_FOR_A_MOVIE_FAILURE, SET_PICKED_DATE } from '../actions/reservationAction'


const reservationInitialState = {
  currentReservations: [],
  pickedDate: ''
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
  if (action.type === SET_PICKED_DATE) {
    console.log(action.payload)
    return { ...state, pickedDate: action.payload }
  }





  return state
}