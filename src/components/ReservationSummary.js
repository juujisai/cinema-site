import React from 'react';
import { connect } from 'react-redux'
import { closeReservationSummary } from '../redux/actions/reservationAction'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'

const ReservationSummary = ({ reservation, name, sndName, phoneNo, seatsToBook, idOfReservation, close }) => {
  const chosenSeatsToShow = seatsToBook.map((item, id) => (
    <span className='chosen-seats-span' key={id}>{id !== 0 ? ' / ' : ' '}{item}</span>
  ))


  if (reservation.postLoading) return (
    <div className="reservation-summary">
      <h3 className="reservation-summary__h3">Podsumowanie rezerwacji:</h3>
      <Loader />
    </div>
  )


  return (
    <div className="reservation-summary">

      <div className="reservation-summary-cont">

        <h3 className="reservation-summary__h3">Podsumowanie rezerwacji:</h3>
        <div className="reservation-summary-cont__div">
          <h4 className="reservation-summary-cont__h4">Zamówione miejsca:</h4>
          <span className="reservation-summary-cont__span">{chosenSeatsToShow}</span>
        </div>
        <div className="reservation-summary-cont__div">
          <h4 className="reservation-summary-cont__h4">Rezerwacja na:</h4>
          <span className="reservation-summary-cont__span">{name} {sndName}</span>
        </div>
        <div className="reservation-summary-cont__div">
          <h4 className="reservation-summary-cont__h4">Nr telefonu:</h4>
          <span className="reservation-summary-cont__span">{phoneNo}</span>
        </div>
        <div className="reservation-summary-cont__div">
          <h4 className="reservation-summary-cont__h4">Id rezerwacji:</h4>
          <span className="reservation-summary-cont__span">{idOfReservation}</span>
          <p className="reservation-summary-cont__p" style={{ marginTop: '10px' }}>Zachowaj ID do sprawdzenia rezerwacji</p>
        </div>
        <div className="page__button">
          <Link to="/" className="button main-button" onClick={() => close()}>Strona główna</Link>
        </div>
      </div>


    </div>

  );
}

const mapStateToProps = ({ movies, reservation }) => {
  return { movies, reservation }
}

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => dispatch(closeReservationSummary())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationSummary);