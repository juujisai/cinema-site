import React from 'react';
import { connect } from 'react-redux'
import Loader from './Loader'

const Filter = ({ movies, showCat }) => {

  let filters = React.useRef({
    category: [],
    timeOfPlay: [],
    yearOfPremiere: { min: 10000, max: 0 }
  })


  React.useEffect(() => {

    movies.movies.forEach(item => {
      filters.current.category = [...new Set([...filters.current.category, ...item.attributes.category.split(' / ')])]
      filters.current.timeOfPlay = [...new Set([...filters.current.timeOfPlay, item.attributes.timeOfPlay])]

      if (item.attributes.yearOfPremiere > filters.current.yearOfPremiere.max) {
        filters.current.yearOfPremiere.max = item.attributes.yearOfPremiere
      }
      if (item.attributes.yearOfPremiere < filters.current.yearOfPremiere.min) {
        filters.current.yearOfPremiere.min = item.attributes.yearOfPremiere

      }

    })

  }, [movies.movies])
  console.log(showCat)
  if (filters.current.category === []) return <Loader />
  return (
    <div className={showCat ? 'filter-container' : 'filter-container filter-hide'}>


    </div>
  );
}


const mapStateToProps = ({ movies }) => {
  return { movies }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);