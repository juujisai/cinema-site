import React from 'react';
import Banner from '../components/Banner'
import { connect } from 'react-redux'
import { bannerData } from '../data/bannerData'
import Loader from '../components/Loader'
import MoviePreview from '../components/MoviePreview'

const HomePage = ({ movies }) => {
  const moviesToShow = movies.movies.map((item, id) =>
    <MoviePreview key={id} data={item} />
  )
  // React.useEffect(() => {
  //   console.log(movies.movies)
  // }, [movies])

  if (movies.loading) return <Loader />

  return (
    <div className='home-page page-content'>
      <Banner
        data={bannerData}
        animate={true}
      />
      <div className="movie-preview-cont">
        {moviesToShow}
      </div>
    </div>
  );
}

const mapStateToProps = ({ movies }) => {
  return { movies }
}


export default connect(mapStateToProps)(HomePage);