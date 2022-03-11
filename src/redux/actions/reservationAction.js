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
        // console.log('pobieram filmy')
        let dataToPush = response.data.data
        console.log(dataToPush)
        dataToPush = dataToPush.filter(item => item.attributes.movieId === `${data}`)
        // console.log(dataToPush)


        dispatch(getReservationsForAMovieSuccess({ movieId: data, reservations: dataToPush }))
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


export const SHOW_RESERVATION_SUMMARY = 'SHOW_RESERVATION_SUMMARY'
export const CLOSE_RESERVATION_SUMMARY = 'CLOSE_RESERVATION_SUMMARY'

export const showReservationSummary = () => {
  return { type: SHOW_RESERVATION_SUMMARY }
}

export const closeReservationSummary = () => {
  return { type: CLOSE_RESERVATION_SUMMARY }
}

export const POST_RESERVATION_SUMMARY_REQUEST = 'POST_RESERVATION_SUMMARY_REQUEST'
export const POST_RESERVATION_SUMMARY_SUCCESS = 'POST_RESERVATION_SUMMARY_SUCCESS'
export const POST_RESERVATION_SUMMARY_FAILURE = 'POST_RESERVATION_SUMMARY_FAILURE'

export const postReservationSummaryRequest = () => {
  return { type: POST_RESERVATION_SUMMARY_REQUEST }
}
export const postReservationSummarySuccess = () => {
  return { type: POST_RESERVATION_SUMMARY_SUCCESS }
}
export const postReservationSummaryFailure = (error) => {
  return { type: POST_RESERVATION_SUMMARY_FAILURE, payload: error }
}
export const postReservationSummary = (data) => {
  return (dispatch) => {
    dispatch(postReservationSummaryRequest())

    // post

    let dataToPost = {
      "data": {
        date: data.date,
        name: `${data.name} ${data.sndName}`,
        movie: data.movie.attributes.name,
        time: data.movie.attributes.timeOfPlay,
        seats: `${data.seatsToBook.join(' ')}`,
        movieId: `${data.movie.id}`,
        idOfReservation: data.id,
        telNo: data.phoneNo,
      }
    }

    console.log(dataToPost)
    // dataToPost = JSON.stringify(dataToPost)

    // const controls = {
    //   headers: {
    //     'Content-Type': 'text/plain'
    //   },
    // }

    axios.post(a, dataToPost)
      .then(response => { console.log(response); dispatch(postReservationSummarySuccess()); return response.data.token })
      .catch(error => { console.log(error.response.data); dispatch(postReservationSummaryFailure(error)) }
      )

    // post error
    // dispatch(postReservationSummaryFailure)
  }
}


// //////////////////////////////////////////////////////////////////////////////////////
// naprawić odświeżanie api po wyświetleniu, błąd z includes dodaje więcej miejsc zarezerwowanych niż powinno