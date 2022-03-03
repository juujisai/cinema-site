import React from 'react';
import { BsCalendar } from 'react-icons/bs'

const ReservationPage = () => {
  const [pickedDate, setPickedDate] = React.useState()
  let today = React.useRef()
  let showPlayDays = React.useRef([])
  let noOfDaysToShow = React.useRef(5)


  const dateToPlay = showPlayDays.current.map((item, id) => (
    <div className='reservation-single-day' key={id}
      onClick={() => setPickedDate(item.day)}
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

  React.useEffect(() => {
    today.current = new Date()

    for (let i = 0; i < noOfDaysToShow.current; i++) {
      let date = new Date()
      let nextDay = new Date(date)
      nextDay.setDate(nextDay.getDate() + i)
      showPlayDays.current = [...showPlayDays.current, { day: nextDay.toLocaleDateString(), dayName: nextDay.toLocaleDateString('pl-PL', { weekday: 'long' }), month: nextDay.toLocaleString('default', { month: 'long' }) }]
    }

    setPickedDate(today.current.toLocaleDateString())

    // console.log(today.current, showPlayDays.current)

  }, [])

  return (
    <div className="reservation-page">
      <div className="reservation-page-play-days">
        <h1 className="movie-preview-cont__h1">Wybierz dzień</h1>
        <div className="reservation-days"
        // style={{ width: `${noOfDaysToShow.current * 100}%` }}
        >
          {dateToPlay}
        </div>
      </div>


    </div>
  );
}

export default ReservationPage;