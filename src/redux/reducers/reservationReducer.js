import { GET_RESERVATIONS_FOR_A_MOVIE_REQUEST, GET_RESERVATIONS_FOR_A_MOVIE_SUCCESS, GET_RESERVATIONS_FOR_A_MOVIE_FAILURE, SET_PICKED_DATE } from '../actions/reservationAction'


const reservationInitialState = {
  currentReservations: [],
  loading: false,
  errorMsg: '',
  pickedDate: ''
}


export const reservationReducer = (state = reservationInitialState, action) => {
  if (action.type === GET_RESERVATIONS_FOR_A_MOVIE_REQUEST) {
    console.log('get reservation request')
    return { ...state, loading: action.payload.loading }
  }
  if (action.type === GET_RESERVATIONS_FOR_A_MOVIE_SUCCESS) {
    console.log('get reservation success')
    let currentReservations = [...state.currentReservations, action.payload.reservation]
    return { ...state, loading: action.payload.loading, currentReservations }
  }
  if (action.type === GET_RESERVATIONS_FOR_A_MOVIE_FAILURE) {
    console.log('get reservation failure')
    return { ...state, loading: action.payload.loading, errorMsg: action.payload.error }
  }
  if (action.type === SET_PICKED_DATE) {
    console.log(action.payload)
    return { ...state, pickedDate: action.payload }
  }





  return state
}