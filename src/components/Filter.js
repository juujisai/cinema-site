import React from 'react';
import { connect } from 'react-redux'

const Filter = ({ movies }) => {
  console.log(movies.movies)

  const filters = React.useRef(null)


  React.useEffect(() => {
    let fs = {
      category: [],
      timeOfPlay: [],
      yearOfPremiere: { min: 10000, max: 0 }
    };


    movies.movies.forEach(item => {
      fs.category = [...new Set([...fs.category, ...item.attributes.category.split(' / ')])]
      fs.timeOfPlay = [...new Set([...fs.timeOfPlay, item.attributes.timeOfPlay])]
      // fs.yearOfPremiere.min =
      if (item.attributes.yearOfPremiere > fs.yearOfPremiere.max) {
        fs.yearOfPremiere.max = item.attributes.yearOfPremiere
      }
      if (item.attributes.yearOfPremiere < fs.yearOfPremiere.min) {
        fs.yearOfPremiere.min = item.attributes.yearOfPremiere

      }


    })
    console.log(fs)

  }, [movies.movies])

  return (
    <div>


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