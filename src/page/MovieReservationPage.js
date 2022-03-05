import React from 'react';
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import Loader from '../components/Loader'

const MovieReservationPage = ({ movies }) => {
  const param = useParams().name

  if (movies.movies.length === 0) return <Loader />
  console.log(param)

  return (
    <div>
      reservation
    </div>
  );
}

const mapStateToProps = ({ movies }) => {
  return { movies }
}

export default connect(mapStateToProps)(MovieReservationPage);