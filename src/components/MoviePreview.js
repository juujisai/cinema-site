import React from 'react';
import { Link } from 'react-router-dom'

const MoviePreview = ({ data: { attributes: { name, author, category, timeOfPlay, description, ytlink, yearOfPremiere, image } } }) => {
  const [canAutoplay, setCanAutoplay] = React.useState(0)
  const ytlinkReworked = ytlink.replace('watch?v=', 'embed/')

  let namePath = name
  namePath = [...name].map(item => item === ' ' ? item = '-' : item).filter(item => item !== "'").join('').toLowerCase()


  const isDesktop = window.innerWidth > 1024 ? true : false
  // const isDesktop = false;

  // React.useEffect(() => {
  //   console.log(canAutoplay)

  //   console.log(image)

  // }, [canAutoplay])

  return (
    <div className='movie-preview-single-item'
    >
      <div className="movie-preview-thumbnail" >
        {isDesktop &&
          <iframe
            title="YouTube video player"
            src={`${ytlinkReworked}?autoplay=${canAutoplay}&mute=1&cc_load_policy=0&rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0`}

            allow='autoplay'
            // autoPlay={true}
            onMouseOver={() => setCanAutoplay(1)} onMouseOut={() => setCanAutoplay(0)}
          >
          </iframe>
        }
        {!isDesktop && <img src={`https://i.imgur.com/XUqZ0ZB.png`} alt={`Zdjęcie przedstawiające plakat filmu ${name}`} className='movie-preview-thumbnail__img' />}

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