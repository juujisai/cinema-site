import React from 'react';
import { BsCalendar } from 'react-icons/bs'
import { connect } from 'react-redux'
import MovieReservationPreview from '../components/MovieReservationPreview';
import Loader from '../components/Loader'
import { setPickedDate } from '../redux/actions/reservationAction'

const ReservationPage = ({ movies, setPicked }) => {
  const [pickedDate, setPickedDate] = React.useState(new Date().toLocaleDateString())
  let today = React.useRef()
  const [showPlayDays, setShowPlayDays] = React.useState([])
  let noOfDaysToShow = React.useRef(5)

  React.useEffect(() => {
    today.current = new Date()
    let daysToShow = []

    if (showPlayDays.length === 0) {
      setPicked(new Date().toLocaleDateString())
      for (let i = 0; i < noOfDaysToShow.current; i++) {
        let date = new Date()
        let nextDay = new Date(date)
        nextDay.setDate(nextDay.getDate() + i)
        daysToShow = [...daysToShow, { day: nextDay.toLocaleDateString(), dayName: nextDay.toLocaleDateString('pl-PL', { weekday: 'long' }), month: nextDay.toLocaleString('default', { month: 'long' }) }]
        setShowPlayDays(daysToShow)
      }
    }
    // setPickedDate(today.current.toLocaleDateString())

    // console.log(today.current, showPlayDays.current)

  }, [showPlayDays, setPicked])


  if (movies.movies.length === 0) return <Loader />


  // console.log(showPlayDays)
  const dateToPlay = showPlayDays.map((item, id) => (
    <div className='reservation-single-day' key={id}
      onClick={() => { setPickedDate(item.day); setPicked(item.day) }}
      style={item.day === pickedDate ? { backgroundColor: 'var(--lightBrown)' } : { backgroundColor: 'white' }}
    >
      <span className="reservation-single-day-name reservation-single-day__span"
        style={item.day === pickedDate ? { color: 'white' } : { color: 'black' }}
      >{item.dayName}</span>
      <span className="reservation-single-day-day reservation-single-day__span"
        style={item.day === pickedDate ? { color: 'white' } : { color: 'var(--mainBrown)' }}
      >{item.day.split('.')[0]}</span>
      <span className="reservation-single-day-month reservation-single-day__span"
        style={item.day === pickedDate ? { color: 'white' } : { color: 'black' }}
      >{item.month}</span>
      <span className="reservation-single-day-icon reservation-single-day__span"
        style={item.day === pickedDate ? { color: 'white' } : { color: 'var(--mainBrown)' }}
      ><BsCalendar /></span>
    </div>
  ))


  let moviesToPlay = movies.movies.filter(items => items.id % 2 === pickedDate.split('.')[0] % 2)

  const sorter = function (a, b) {
    let x = a.attributes.timeOfPlay
    let y = b.attributes.timeOfPlay
    if (x === y)
      return 0;
    return x < y ? -1 : 1;
  }

  moviesToPlay.sort(sorter)

  moviesToPlay = moviesToPlay.map((item, id) => (
    <div className="movie-to-play" key={id}>
      <MovieReservationPreview data={item.attributes} pickedDate={pickedDate} />
    </div>
  ))

  return (
    <div className="reservation-page">
      <div className="reservation-page-play-days">
        <h1 className="movie-preview-cont__h1">Wybierz dzie??</h1>
        <div className="reservation-days"
        // style={{ width: `${noOfDaysToShow.current * 100}%` }}
        >
          {dateToPlay}
        </div>
      </div>

      <div className="reservation-page-movies-that-day">
        <h1 className="movie-preview-cont__h1">Filmy grane dnia: {pickedDate}</h1>
        <div className="movies-reservation-list">
          {moviesToPlay}
        </div>
      </div>

    </div>
  );
}

const mapStateToProps = ({ movies }) => {
  return {
    movies
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPicked: (data) => dispatch(setPickedDate(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationPage);