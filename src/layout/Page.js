import React from 'react';
import { Routes, Route } from 'react-router-dom'
import HomePage from '../page/HomePage'
import ContactPage from '../page/ContactPage'
import ErrorPage from '../page/ErrorPage'
import MoviesPage from '../page/MoviesPage'
import ReservationPage from '../page/ReservationPage'

const Page = () => {
  return (
    <div className='main-page-content'>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/contact' element={<ContactPage />}></Route>
        <Route path='/reservation' element={<ReservationPage />}></Route>
        <Route path='/movies' element={<MoviesPage />}></Route>
        <Route element={<ErrorPage />}> </Route>
      </Routes>
    </div>
  );
}

export default Page;