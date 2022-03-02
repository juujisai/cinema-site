import React from 'react';
import { connect } from 'react-redux'
import Loader from './Loader'
import { switchFilterVisibility } from '../redux/actions/moviesAction'
import { IoClose } from 'react-icons/io5'

const videoPlayTime = ['12:00', '14:00', '16:00', '18:00', '20:00']

const Filter = ({ movies, showCat, switchVisibility }) => {
  const [category, setCategory] = React.useState('all')
  const [timeOfPlay, setTimeOfPlay] = React.useState('all')
  const [yearOfPremiere, setYearOfPremiere] = React.useState(0)
  const [featured, setFeatured] = React.useState(false)


  let rangeInputRef = React.useRef(null)



  let filters = React.useRef({
    category: [],
    timeOfPlay: [],
    yearOfPremiere: { min: 10000, max: 0 }
  })




  const cats = filters.current.category.map((item, id) => (
    <option value={item} key={id}>{item}</option>
  ))

  const time = filters.current.timeOfPlay.map((item, id) => (
    <option value={item} key={id}>{videoPlayTime[id]}</option>
  ))

  const handleClick = () => {
    console.log(category, timeOfPlay, yearOfPremiere, featured)
  }

  React.useEffect(() => {

    // get data for filters
    movies.movies.forEach(item => {
      filters.current.category = [...new Set([...filters.current.category, ...item.attributes.category.split(' / ')])]
      filters.current.timeOfPlay = [...new Set([...filters.current.timeOfPlay, item.attributes.timeOfPlay])]

      if (item.attributes.yearOfPremiere > filters.current.yearOfPremiere.max) {
        filters.current.yearOfPremiere.max = item.attributes.yearOfPremiere
        setYearOfPremiere(item.attributes.yearOfPremiere)
      }
      if (item.attributes.yearOfPremiere < filters.current.yearOfPremiere.min) {
        filters.current.yearOfPremiere.min = item.attributes.yearOfPremiere

      }
    })

  }, [movies.movies])


  if (filters.current.category === []) return <Loader />
  return (
    <div className={showCat ? 'filter-container' : 'filter-container filter-hide'}>
      <h1 className="filter-container__h1">Filtry</h1>
      <span className="close-icon"><IoClose onClick={() => switchVisibility()} /></span>

      <div className="filters-filters">

        <div className="filter-data filter-data--category">
          <label htmlFor="filter-category">Kategoria:</label>
          <select name="filter-category" id="filter-category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value={'all'}>Wszystkie</option>
            {cats}
          </select>
        </div>

        <div className="filter-data filter-data--timeOfPlay">
          <label htmlFor="filter-timeOfPlay">Godzina wyświetlania:</label>
          <select name="filter-timeOfPlay" id="filter-timeOfPlay" value={timeOfPlay} onChange={(e) => setTimeOfPlay(e.target.value)}>
            <option value={'all'}>Wszystkie</option>
            {time}
          </select>
        </div>

        <div ref={rangeInputRef} className="filter-data filter-data--yearOfPremiere">
          <label htmlFor="filter-yearOfPremiere">Data premiery:</label>
          <input type="range" id="filter-yearOfPremiere" name="filter-yearOfPremiere" onChange={(e) => setYearOfPremiere(e.target.value)} value={yearOfPremiere}
            min={filters.current.yearOfPremiere.min} max={filters.current.yearOfPremiere.max} />
          <span className="yearOfPremiere-date"
            style={
              {
                // dont ask
                transform: `translateX(calc(${100 * ((yearOfPremiere - filters.current.yearOfPremiere.min) / (filters.current.yearOfPremiere.max - filters.current.yearOfPremiere.min))}% - ${20 * ((yearOfPremiere - filters.current.yearOfPremiere.min) / (filters.current.yearOfPremiere.max - filters.current.yearOfPremiere.min))}px)`,
              }
            }

          >{yearOfPremiere}</span>
        </div>

        <div className="filter-data filter-data--featured">
          <label htmlFor="filter-featured">Polecane:</label>
          <input type="checkbox" name="filter-featured" id="filter-featured" value={featured} onChange={(e) => setFeatured(e.target.checked)} />

        </div>
      </div>
      <div className=" page__button">
        <button className="button filter-btn main-button" onClick={handleClick}>Filtruj</button>
      </div>
    </div>
  );
}


const mapStateToProps = ({ movies }) => {
  return { movies }
}

const mapDispatchToProps = (dispatch) => {
  return {
    switchVisibility: () => dispatch(switchFilterVisibility())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);