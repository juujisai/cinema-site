import React from 'react';
import { connect } from 'react-redux'
import Loader from '../components/Loader'
import MoviePreview from '../components/MoviePreview'
import Filter from '../components/Filter'
import { IoFilter } from 'react-icons/io5'

const MoviesPage = ({ movies }) => {

  if (movies.loading) return <Loader />

  const moviesToShow = movies.movies.map((item, id) =>
    <MoviePreview key={id} data={item} />
  )

  return (
    <div className="movies-page">


      <h1 className="main-header__h1">Aktualnie grane filmy </h1>

      <div className="filter">
        <div className="filter-controls">
          <span className='filter-controls__span filter-controls__span--icon'><IoFilter /></span> <span className="filetr-controls__span">Filtruj</span>
        </div>
        <div className="filter-container">
          <Filter />
        </div>
      </div>
      <div className="movies-container">
        {moviesToShow}
      </div>

    </div>
  );
}

const mapStateToProps = ({ movies }) => {
  return { movies }
}

export default connect(mapStateToProps)(MoviesPage);