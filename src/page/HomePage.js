import React from 'react';
import Banner from '../components/Banner'
import { connect } from 'react-redux'
import { bannerData } from '../data/bannerData'
import Loader from '../components/Loader'
import MoviePreview from '../components/MoviePreview'

const HomePage = ({ movies }) => {
  const featuredMovies = movies.movies.filter(item => item.attributes.featured)
  const moviesToShow = featuredMovies.map((item, id) =>
    <MoviePreview key={id} data={item} />
  )
  console.log(movies.movies)
  // React.useEffect(() => {
  //   console.log(movies.movies)
  // }, [movies])

  let kek = true

  // if (movies.loading) return <Loader />
  if (kek) return <Loader />

  return (
    <div className='home-page page-content'>
      <Banner
        data={bannerData}
        animate={true}
      />
      <div className="movie-preview-cont">
        <h1 className="movie-preview-cont__h1">Proponowane filmy</h1>

        {moviesToShow}
      </div>
    </div>
  );
}

const mapStateToProps = ({ movies }) => {
  return { movies }
}


export default connect(mapStateToProps)(HomePage);