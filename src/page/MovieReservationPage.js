import React from 'react';
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import Loader from '../components/Loader'
import { getReservationsForAMovie, postReservationSummary } from '../redux/actions/reservationAction'
import { cinemaSeats } from '../data/cinemaSeats'
import ReservationSummary from '../components/ReservationSummary'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom'


const MovieReservationPage = ({ movies, reservation, getReservations, postReservations }) => {
  const param = useParams().name
  const [movie, setMovie] = React.useState()
  const [seatsToBook, setSeatsToBook] = React.useState([])
  const [name, setName] = React.useState('')
  const [sndName, setSndName] = React.useState('')
  const [phoneNo, setPhoneNo] = React.useState('')
  const [validationResult, setValidationResult] = React.useState({
    name: false,
    sndName: false,
    phoneNo: false,
    result: false,
  })
  const [uuid, setUuid] = React.useState('')
  let navigate = useNavigate();


  React.useEffect(() => {
    // return to site where you can pick data if you happen to be in a reservation page without chosen date
    if (reservation.pickedDate === '') {
      console.log('brak wybranej daty - przekierowuje do reperturaru')
      return navigate("/rep")

    }

    // 
    if (movies.movies.length > 0 && movie === undefined) {
      let movieCont = movies.movies.filter(item => param === [...item.attributes.name].map(item => item === ' ' ? item = '-' : item).filter(item => item !== "'").join('').toLowerCase())[0]
      setMovie(movieCont)

      getReservations(movieCont.id)

    }

    // console.log('rendering movie reservation page')

  }


    , [movie, movies.movies, param, getReservations, seatsToBook, navigate, reservation.pickedDate, reservation.currentReservations])

  if (movies.movies.length === 0 || reservation.loading || reservation.currentReservations.length === 0 || movie === undefined) return <Loader />


  let movieReservations = []
  // filter items that id match reservation page id and selected date
  movieReservations = reservation.currentReservations.find(item => item.movieId === movie.id).reservations.filter(item => item.attributes.date === reservation.pickedDate)

  // get id of letter A in charcode so i can use letters while getting row numbers after clicking a seat
  const letterACharcode = 65

  // create rows
  const seats = cinemaSeats.map((item, id) => {
    let noSeats = item.rowSeats
    let seatsButtons = []
    // create seats for rows
    for (let i = 1; i <= noSeats; i++) {
      const seatName = `${String.fromCharCode(letterACharcode + id)}-${i}`

      seatsButtons = [...seatsButtons,
      <button
        key={i}
        onClick={() => {
          if (!seatsToBook.includes(seatName)) {
            setSeatsToBook([...seatsToBook, seatName])
            // console.log('new')
          } else {
            setSeatsToBook(seatsToBook.filter(item => item !== seatName))
            // console.log('not new')
          }
        }}

        className={`ticket-seat ticket-${seatsToBook.includes(seatName) ? `active` : `not-active`}`}

        disabled={movieReservations.filter((item) => {
          return item.attributes.seats.split(' ').includes(`${String.fromCharCode(letterACharcode + id)}-${i}`)
        }

        ).length > 0 ? true : false}
      >
        {i}
      </button>
      ]
    }

    return (
      <div
        className={`reservation-rows`}
        key={id}
        data-row={String.fromCharCode(letterACharcode + id)}
      >
        {seatsButtons}
      </div>
    )
  })

  // show which seats are selected
  const chosenSeatsToShow = seatsToBook.map((item, id) => (
    <span className='chosen-seats-span' key={id}>{id !== 0 ? ' / ' : ' '}{item}</span>
  ))

  // functions

  const validateForm = () => {
    let nameX = false
    let sndNameX = false
    let phoneNoX = false
    let resultX = false

    if (name.length < 2) {
      nameX = true
    }
    if (sndName.length < 2) {
      sndNameX = true
    }
    if (`${phoneNo}`.length < 9) {
      phoneNoX = true
    }
    if (nameX && sndNameX && phoneNoX) {
      resultX = true
    }
    return {
      name: nameX,
      sndName: sndNameX,
      phoneNo: phoneNoX,
      result: resultX
    }
  }

  const handleReservationClick = () => {
    const result = validateForm()
    setValidationResult(result)


    // send only when validation is passed
    if (!result.result) {
      let id = uuidv4()
      setUuid(id)
      postReservations({ name, sndName, phoneNo, id, seatsToBook, date: reservation.pickedDate, movie })
      getReservations(movie.id)
    }

  }

  return (
    <div className='movie-reservation-page'>
      <h1 className="movie-reservation-page__h1">Zarezerwuj bilet</h1>
      <h1 className="movie-reservation-page__h1 movie-reservation-page__h1--name">{movie.attributes.name}</h1>
      <div className="reservation-seats">
        <h1 className="reservation-seats__h1">Wybierz miejsce/a</h1>
        {seats}
      </div>


      <div className="reservation-legend">
        <div className="reservation-legend__div"><button className='ticket-seat' >X</button><span className="legend-desc">miejsce</span></div>
        <div className="reservation-legend__div"><button className='ticket-seat ticket-active' >X</button><span className="legend-desc">wybrane miejsce</span></div>
        <div className="reservation-legend__div"><button className='ticket-seat' disabled>X</button><span className="legend-desc">miejsce razerwowane</span></div>
      </div>


      <div className="reservation-data">
        {seatsToBook.length > 0 && <div className="reservation-chosenseats">
          <h2 className='reservation-chosenseats__h2'>Wybrane miejsca:</h2>
          {chosenSeatsToShow}
        </div>}
        <form className="reservation-data__form">
          <div className="reservation-name">
            <label htmlFor="reservation-name__input">
              Imi??:
              <input type="text" id='reservation-name__input' value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <span className={`error-msg ${validationResult.name ? 'error-show' : null}`}>Imi?? musi zawiera?? minimum 2 znaki</span>
          </div>
          <div className="reservation-secondname">
            <label htmlFor="reservation-secondname__input">
              Nazwisko:
              <input type="text" id='reservation-secondname__input' value={sndName} onChange={(e) => setSndName(e.target.value)} />
            </label>
            <span className={`error-msg ${validationResult.sndName ? 'error-show' : null}`}>Nazwisko musi zawiera?? minimum 2 znaki</span>
          </div>
          <div className="reservation-phonenumber">
            <label htmlFor="reservation-phonenumber__input">
              Numer telefonu:
              <input type="number" id='reservation-phonenumber__input' value={phoneNo} onChange={(e) => {
                let value;
                phoneNo.length >= 9 ? value = phoneNo : value = e.target.value
                setPhoneNo(value)
              }} />
            </label>
            <span className={`error-msg ${validationResult.phoneNo ? 'error-show' : null}`}>Numer telefonu musi zawiera?? 9 cyfr</span>
          </div>
        </form>

        {seatsToBook.length !== 0 && <div className="page__button">
          <button className="button main-button" onClick={handleReservationClick}>Zarezewuj bilet(y)</button>
        </div>}
      </div>
      {reservation.showReservationSummary &&
        <ReservationSummary
          name={name}
          sndName={sndName}
          phoneNo={phoneNo}
          seatsToBook={seatsToBook}
          idOfReservation={uuid}
        />}
    </div>
  );
}

const mapStateToProps = ({ movies, reservation }) => {
  return { movies, reservation }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getReservations: (data) => dispatch(getReservationsForAMovie(data)),
    postReservations: (data) => dispatch(postReservationSummary(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieReservationPage);