import React from 'react';
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import Loader from '../components/Loader'
import { getReservationsForAMovie } from '../redux/actions/reservationAction'


const MovieReservationPage = ({ movies, getReservations }) => {
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

  if (movies.movies.length === 0) return <Loader />


  return (
    <div>
      reservation
    </div>
  );
}

const mapStateToProps = ({ movies }) => {
  return { movies }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getReservations: (data) => dispatch(getReservationsForAMovie(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieReservationPage);