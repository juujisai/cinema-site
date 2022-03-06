import React from 'react';
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import Loader from '../components/Loader'
import { getReservationsForAMovie } from '../redux/actions/reservationAction'
import { cinemaSeats } from '../data/cinemaSeats'

const MovieReservationPage = ({ movies, reservation, getReservations }) => {
  const param = useParams().name
  // const [movieCurrentReservations, setMovieCurrentReservations] = React.useState([])
  const [movie, setMovie] = React.useState()

  React.useEffect(() => {
    if (movies.movies.length > 0 && movie === undefined) {
      let movieCont = movies.movies.filter(item => param === [...item.attributes.name].map(item => item === ' ' ? item = '-' : item).filter(item => item !== "'").join('').toLowerCase())[0]
      setMovie(movieCont)

      getReservations(movieCont.id)

    }

    console.log('rendering movie reservation page')

    // getReservations()
  }, [movie, movies.movies, param, getReservations])

  if (movies.movies.length === 0 || reservation.loading || reservation.currentReservations.length === 0) return <Loader />

  const movieReservations = reservation.currentReservations.find(item => item.movieId === movie.id).reservations

  // console.log(movieReservations)

  // get id of letter A in charcode so i can use letters while getting row numbers after clicking a seat
  const letterACharcode = 65

  const seats = cinemaSeats.map((item, id) => {
    let noSeats = item.rowSeats
    let seatsButtons = []

    for (let i = 1; i <= noSeats; i++) {
      seatsButtons = [...seatsButtons,
      <button
        key={i}
        onClick={() => console.log(`Miejsce ${String.fromCharCode(letterACharcode + id)}-${i}`)}
      >
        {i}
      </button>
      ]
    }

    return (
      <div
        className={`reservation-rows`}
        key={id}
      >
        {seatsButtons}
      </div>
    )
  })




  return (
    <div className='movie-reservation-page'>
      <h1 className="movie-reservation-page__h1">Zarezerwuj bilet</h1>
      <h1 className="movie-reservation-page__h1 movie-reservation-page__h1--name">{movie.attributes.name}</h1>
      <div className="reservation-seats">
        <h1 className="reservation-seats__h1">Wybierz miejsce/a</h1>
        {seats}
      </div>


    </div>
  );
}

const mapStateToProps = ({ movies, reservation }) => {
  return { movies, reservation }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getReservations: (data) => dispatch(getReservationsForAMovie(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieReservationPage);