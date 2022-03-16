import React from 'react';
import { Routes, Route } from 'react-router-dom'
import HomePage from '../page/HomePage'
import ContactPage from '../page/ContactPage'
import ErrorPage from '../page/ErrorPage'
import MoviesPage from '../page/MoviesPage'
import ReservationPage from '../page/ReservationPage'
import MoviePage from '../page/MoviePage.js'
import { fetchMovieData } from '../redux/actions/moviesAction'
import { connect } from 'react-redux'
import CategoryPage from '../page/CategoryPage'
import MovieReservationPage from '../page/MovieReservationPage';
import CheckReservation from '../page/CheckReservation';

const Page = ({ fetchMovieDataFunction }) => {
  React.useEffect(() => {
    fetchMovieDataFunction()
  }, [fetchMovieDataFunction])

  return (
    <div className='main-page-content'>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/info' element={<ContactPage />}></Route>
        <Route path='/rep' element={<ReservationPage />}></Route>
        <Route path='/movies' element={<MoviesPage />}></Route>
        <Route path={'/movies/:name'} element={<MoviePage />}></Route>
        <Route path={'/cat/:name'} element={<CategoryPage />}></Route>
        <Route path={'/reserve/:name'} element={<MovieReservationPage />} ></Route>
        <Route path={'/checkreservation/:name'} element={<CheckReservation />} ></Route>
        <Route path="*" element={<ErrorPage />}> </Route>
      </Routes>
    </div >
  );
}
const mapStateToProps = ({ movies }) => {
  return { movies }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovieDataFunction: () => dispatch(fetchMovieData())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Page);