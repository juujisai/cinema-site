import React from 'react';
import Banner from '../components/Banner'
import { connect } from 'react-redux'
import { bannerData } from '../data/bannerData'
import { fetchMovieData } from '../redux/actions/moviesAction'

const HomePage = ({ fetchMovieDataFunction }) => {
  React.useEffect(() => {
    fetchMovieDataFunction()
  }, [fetchMovieDataFunction])
  return (
    <div className='home-page page-content'>
      <Banner
        data={bannerData}
        animate={true}
      />

    </div>
  );
}

const mapStateToProps = ({ movies }) => {
  return { movies }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovieDataFunction: () => dispatch(fetchMovieData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);