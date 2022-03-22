import React from 'react';
import { Link } from 'react-router-dom'

const ContactPage = () => {
  const [idOfReservation, setIdOfReservation] = React.useState('')

  return (
    <div className='info-page'>
      <h1 className="info-page__h1">Sprawdź swoją rezerwację</h1>
      <label className='info-page__label' htmlFor="info-page-input">
        Podaj numer rezerwacji
        <input type="text" id='info-page-input'
          value={idOfReservation}
          onChange={(e) => setIdOfReservation(e.target.value)}
        />
      </label>
      <div className="page__button">
        <Link to={`/checkreservation/${idOfReservation}`} className="button main-button" >Sprawdź rezerwację</Link>
      </div>
    </div>
  );
}

export default ContactPage;