import React from 'react';
import { connect } from 'react-redux'
import Loader from '../components/Loader'
import MoviePreview from '../components/MoviePreview'
import Filter from '../components/Filter'
import { IoFilter } from 'react-icons/io5'
import { switchFilterVisibility, moviesPageUnmounted } from '../redux/actions/moviesAction'

const MoviesPage = ({ movies, switchVisibility, unmount }) => {
  const [showCat, setShowCat] = React.useState(false)

  React.useEffect(() => {
    // console.log('mount')
    setShowCat(movies.filterVisibility)
  }, [movies.filterVisibility])

  React.useEffect(() => {
    return () => {
      // console.log('unmount')
      unmount()
    }
  }, [unmount])


  if (movies.loading) return <Loader />



  let moviesToShow;

  if (movies.filteredData.length > 0) {
    moviesToShow = movies.filteredData.map((item, id) =>
      <MoviePreview key={id} data={item} />
    )

  } else {
    moviesToShow = movies.movies.map((item, id) =>
      <MoviePreview key={id} data={item} />
    )

  }


  return (
    <div className="movies-page">


      <h1 className="main-header__h1">Aktualnie grane filmy </h1>

      <div className="filter">
        <div className="filter-controls" onClick={() => switchVisibility()}>
          <span className='filter-controls__span filter-controls__span--icon'><IoFilter /></span> <span className="filetr-controls__span">Filtruj</span>
        </div>
        <div className="filter-wrap">
          <Filter showCat={showCat} />
        </div>
      </div>
      <div className="movies-container">
        {movies.isFilteredEmpty ? <div className='no-movies'>Brak filmów odpowiadających wybranym filtrom</div> : moviesToShow}


      </div>

    </div>
  );
}

const mapStateToProps = ({ movies }) => {
  return { movies }
}
const mapDispatchToProps = (dispatch) => {
  return {
    switchVisibility: () => dispatch(switchFilterVisibility()),
    unmount: () => dispatch(moviesPageUnmounted())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MoviesPage);