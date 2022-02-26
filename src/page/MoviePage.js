import React from 'react';
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import { getSource } from '../utility/methods'
import { ImYoutube2 } from 'react-icons/im'

const MoviePage = ({ movies }) => {
  const path = useParams().name
  const [videoVisible, setVideoVisible] = React.useState(false)
  const [canAutoplay, setCanAutoplay] = React.useState(0)


  if (movies.movies.length === 0) return <Loader />

  const thisMovie = movies.movies.filter(item => path === [...item.attributes.name].map(item => item === ' ' ? item = '-' : item).filter(item => item !== "'").join('').toLowerCase())[0]

  // const idOfMovie = thisMovie.id
  // timeOfPlay
  const { author, category, description, image1, image2, imageThumbnail, name, yearOfPremiere, ytlink } = thisMovie.attributes
  const ytlinkReworked = ytlink.replace('watch?v=', 'embed/')

  let categories = category.split(' / ')

  const cat = categories.map((item, id) => (
    <span className="movie-page-categories__span" key={id}>{id > 0 ? " /" : ''} <Link to={`/cat/${item.replace(' ', '-').toLowerCase()}`}>{item}</Link></span>
  ))

  const cat2 = categories.map((item, id) => (
    <span key={id}>{id > 0 ? ` / ${item}` : `${item}`} </span>
  ))

  return (<div className="movie-page">
    <div className="movie-page-info">
      <h1 className="movie-page-info__h1">{name}</h1>
      <div className="movie-page-categories">{cat}</div>

      <div className="movie-page-info-thumbnail">
        <img src={getSource(imageThumbnail)} alt={`Plakat filmu ${name}`} className="movie-page-info-thumbnail__img" />
      </div>
      <div className="movie-page-info-cont">
        <div className="movie-author">Reżyseria: <span className='movie__span'>{author}</span></div>
        <div className="movie-premiere">Data premiery: <span className='movie__span'>{yearOfPremiere}</span></div>
        <div className="movie-cat">Kategoria: <span className='movie__span'>{cat2}</span></div>
        <div className="movie-yt"><ImYoutube2 onClick={() => setVideoVisible(!videoVisible)} /></div>
      </div>
    </div>
    <div className="movie-page-desc">
      <div className="movie-page-desc-text">{description}</div>
      <div className="movie-page-desc-image">
        <img src={getSource(image1)} alt={`Zdjęcie nr 1 z filmu ${name}`} className="movie-page-desc-image__img" />
      </div>
      <div className="movie-page-desc-image">
        <img src={getSource(image2)} alt={`Zdjęcie nr 2 z filmu ${name}`} className="movie-page-desc-image__img" />
      </div>
    </div>
    <div className="reservation-link">
      <div className="page__button">
        <Link to="/rep" className="button main-button">Zarezewuj bilet</Link>
      </div>
    </div>

    {videoVisible && <div className="yt-video" onClick={() => { setVideoVisible(!videoVisible); setCanAutoplay(!canAutoplay) }}>
      <iframe
        className='movie-preview-thumbnail__iframe'
        title="YouTube video player"
        src={`${ytlinkReworked}?autoplay=${canAutoplay}&mute=1&cc_load_policy=0&rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0`}

        allow='autoplay'
      >
      </iframe>
    </div>}

  </div>);
}

const mapStateToProps = ({ movies }) => {
  return { movies }
}

export default connect(mapStateToProps)(MoviePage);