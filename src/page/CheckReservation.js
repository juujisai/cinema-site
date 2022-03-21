import React from 'react';
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { getReservationDataFromId } from '../redux/actions/reservationAction'
import Loader from '../components/Loader'
import { getSource } from '../utility/methods'
import { Link } from 'react-router-dom'

const videoPlayTime = ['12:00', '14:00', '16:00', '18:00', '20:00']
const videoPlayTimeCode = ['m1', 'm2', 'm3', 'm4', 'm5']



const CheckReservation = ({ reservation, getReservationById, movies }) => {
  const param = useParams().name
  const [resData, setResData] = React.useState(reservation.reservationDataById)

  React.useEffect(() => {
    if (resData.length === 0) {
      getReservationById(param)
    }
  }, [param, getReservationById, resData])

  React.useEffect(() => { setResData(reservation.reservationDataById) }, [reservation])


  if (movies.loading || reservation.reservationDataByIdLoading || resData.length === 0) return <Loader />

  const mainData = resData[0].attributes

  const { createdAt, date, idOfReservation, movie, name, seats, telNo, time } = mainData

  const sourceImg = movies.movies.find(item => item.attributes.name === movie).attributes.imageThumbnail

  let namePath = movie
  namePath = [...movie].map(item => item === ' ' ? item = '-' : item).filter(item => item !== "'").join('').toLowerCase()

  let timeZ = videoPlayTime[videoPlayTimeCode.findIndex(item => item === time)]

  let createdWhen = createdAt.split('T')
  createdWhen[1] = createdWhen[1].split('.')[0]

  return (
    <div className="check-reservation">
      <div className="check-reservation-name">
        <h1 className="check-reservation__h1">Dane rezerwacji</h1>
        <p className="check-reservation__p">dla id {idOfReservation}</p>
      </div>
      <div className="check-reservation-data">
        <div className="check-reservation-data-image">
          <Link to={`/movies/${namePath}`}>
            <img src={getSource(sourceImg)} alt={`Zdjęcie przedstawiające plakat filmu ${name}`} className={`movie-preview-thumbnail__img check-reservation-data-image__img`} />
          </Link>
        </div>
        <div className="check-reservation-data-reservation">
          <div className="check-reservation-data-reservation__div movie-name-res">
            {movie}
          </div>
          <div className="check-reservation-data-reservation__div">
            Rezerwacja na: <span className='check-reservation-data-reservation__span'>{name}</span>
          </div>
          <div className="check-reservation-data-reservation__div">
            Data rezerwacji: <span className='check-reservation-data-reservation__span'>{date}</span>
          </div>
          <div className="check-reservation-data-reservation__div">
            Godzina rezerwacji: <span className='check-reservation-data-reservation__span'>{timeZ}</span>
          </div>
          <div className="check-reservation-data-reservation__div">
            Zarezerwowane miejsca: <span className='check-reservation-data-reservation__span'>{seats}</span>
          </div>
          <div className="check-reservation-data-reservation__div">
            Nr telefonu: <span className='check-reservation-data-reservation__span'>{telNo}</span>
          </div>
          <div className="check-reservation-data-reservation__div">
            <span className='check-reservation-data-reservation__span reservation-time'>{createdWhen[0]} / {createdWhen[1]}</span>
          </div>
        </div>
      </div>

    </div>
  );
}



const mapStateToProps = ({ reservation, movies }) => {
  return {
    reservation, movies
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getReservationById: (data) => dispatch(getReservationDataFromId(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckReservation);