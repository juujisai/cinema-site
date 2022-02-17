import React from 'react';
import { Link } from 'react-router-dom'
import { getSource } from '../utility/methods'

const MoviePreview = ({ data: { attributes: { name, yearOfPremiere, imageThumbnail } } }) => {

  let namePath = name
  namePath = [...name].map(item => item === ' ' ? item = '-' : item).filter(item => item !== "'").join('').toLowerCase()

  return (
    <div className='movie-preview-single-item'
    >
      <div className="movie-preview-thumbnail" >
        <Link to={`/movies/${namePath}`}>
          <img src={getSource(imageThumbnail)} alt={`Zdjęcie przedstawiające plakat filmu ${name}`} className={`movie-preview-thumbnail__img`} />
        </Link>

      </div>


      <div className='movie-preview-info'>
        <Link to={`/movies/${namePath}`}>
          <h1 className="movie-preview-info__h1">{name}</h1>
          <h2 className="movie-preview-info__h2">({yearOfPremiere})</h2>
        </Link>


      </div>
    </div >
  );
}

export default MoviePreview;