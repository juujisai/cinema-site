import { GET_RESERVATIONS_FOR_A_MOVIE_REQUEST, GET_RESERVATIONS_FOR_A_MOVIE_SUCCESS, GET_RESERVATIONS_FOR_A_MOVIE_FAILURE, SET_PICKED_DATE, SHOW_RESERVATION_SUMMARY, CLOSE_RESERVATION_SUMMARY, POST_RESERVATION_SUMMARY_FAILURE, POST_RESERVATION_SUMMARY_SUCCESS, POST_RESERVATION_SUMMARY_REQUEST } from '../actions/reservationAction'


const reservationInitialState = {
  currentReservations: [],
  loading: false,
  errorMsg: '',
  pickedDate: '',
  showReservationSummary: false,
  postLoading: false,
  postErrorMsg: ''
}


export const reservationReducer = (state = reservationInitialState, action) => {
  if (action.type === GET_RESERVATIONS_FOR_A_MOVIE_REQUEST) {
    // console.log('get reservation request')
    return { ...state, loading: action.payload.loading }
  }
  if (action.type === GET_RESERVATIONS_FOR_A_MOVIE_SUCCESS) {
    // console.log('get reservation success')
    let currentReservations = [...state.currentReservations]
    currentReservations = currentReservations.filter(item => item.id !== action.payload.reservation.id)
    currentReservations = [...currentReservations, action.payload.reservation]

    return { ...state, loading: action.payload.loading, currentReservations }
  }
  if (action.type === GET_RESERVATIONS_FOR_A_MOVIE_FAILURE) {
    // console.log('get reservation failure')
    return { ...state, loading: action.payload.loading, errorMsg: action.payload.error }
  }
  if (action.type === SET_PICKED_DATE) {
    console.log(action.payload)
    return { ...state, pickedDate: action.payload }
  }
  if (action.type === SHOW_RESERVATION_SUMMARY) {
    return { ...state, showReservationSummary: true }
  }
  if (action.type === CLOSE_RESERVATION_SUMMARY) {
    return { ...state, showReservationSummary: false }
  }
  if (action.type === POST_RESERVATION_SUMMARY_REQUEST) {
    return { ...state, postLoading: true }
  }
  if (action.type === POST_RESERVATION_SUMMARY_SUCCESS) {
    return { ...state, postLoading: false, showReservationSummary: true }
  }
  if (action.type === POST_RESERVATION_SUMMARY_FAILURE) {
    return { ...state, postLoading: false, postErrorMs: action.payload }
  }




  return state
}