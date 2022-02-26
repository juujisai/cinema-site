import React from 'react';
import { connect } from 'react-redux'
import Loader from '../components/Loader'
import MoviePreview from '../components/MoviePreview'

const MoviesPage = ({ movies }) => {
  const [cat, setCat] = React.useState()


  if (movies.loading) return <Loader />
  const moviesToShow = movies.movies.map((item, id) =>
    <MoviePreview key={id} data={item} />
  )
  console.log(cat)
  return (
    <div className="movies-page">
      <h1 className="main-header__h1">Aktualnie grane filmy </h1>

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