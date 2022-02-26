import React from 'react';
import { useParams, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import MoviePreview from '../components/MoviePreview'
import Loader from '../components/Loader'

const CategoryPage = ({ movies }) => {
  let path = useParams().name

  if (movies.loading) return <Loader />

  path = path.replace('-', ' ')

  const cat = movies.movies.map(item => item.attributes.category.toLowerCase().replace('-', ' ').split(' / '))

  const moviesToShow = movies.movies.filter((item, id) => cat[id].includes(path.toLowerCase())).map((item, id) => (
    <MoviePreview key={id} data={item} />

  ))



  return (<div className="category-page">
    <h1 className="category-page__h1">Filmy z kategorii {path}</h1>


    {moviesToShow}

    <div className="page__button">
      <Link to="/" className="button main-button">Strona główna</Link>
    </div>

  </div>);
}

const mapStateToProps = ({ movies }) => {
  return { movies }
}

export default connect(mapStateToProps)(CategoryPage);