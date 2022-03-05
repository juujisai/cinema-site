import React from 'react';
import { getSource } from '../utility/methods'
import { Link } from 'react-router-dom'

const videoPlayTime = ['12:00', '14:00', '16:00', '18:00', '20:00']
const videoPlayTimeCode = ['m1', 'm2', 'm3', 'm4', 'm5']

const MovieReservationPreview = ({ data, pickedDate }) => {
  const { name, author, timeOfPlay, description, imageThumbnail } = data

  let namePath = name
  namePath = [...name].map(item => item === ' ' ? item = '-' : item).filter(item => item !== "'").join('').toLowerCase()

  let time = videoPlayTime[videoPlayTimeCode.findIndex(item => item === timeOfPlay)]


  return (
    <div className='movie-reservation-preview'>
      <div className="movie-reservation-preview-thumbnail">
        <img src={getSource(imageThumbnail)} className='movie-reservation-preview-thumbnail__img' alt={`Plakat z filmu ${name}`} />
      </div>
      <div className="movie-reservation-preview-info">
        <h1 className="preview-info-name">{name}</h1>
        <div className="preview-info-author"><strong>Reżyseria: </strong><span className="preview-info-author__span">{author}</span></div>
        <div className="preview-info-description">
          <p className="preview-info-description__p">{description.split('.')[0]}. {description.split('.')[1]}.</p>
          <Link to={`/movies/${namePath}`} className='preview-info-description__a'>
            Czytaj więcej
          </Link>

        </div>
        <div className="movie-reservation-preview-reserve">
          <div className="page__button">
            <Link to={`/reserve/${namePath}`} className='preview-info-reserve button main-button'>
              {time}
            </Link>
          </div>
        </div>


      </div>


    </div>
  );
}

export default MovieReservationPreview;