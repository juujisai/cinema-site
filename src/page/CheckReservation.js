import React from 'react';
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { getReservationDataFromId } from '../redux/actions/reservationAction'
import Loader from '../components/Loader'

const CheckReservation = ({ reservation, getReservationById }) => {
  const param = useParams().name
  const [resData, setResData] = React.useState(reservation.reservationDataById)

  React.useEffect(() => {
    // console.log(reservation.reservationDataById)
    if (resData.length === 0) {
      getReservationById(param)
    }
    // console.log(resData)
  }, [param, getReservationById, resData])

  if (reservation.reservationDataByIdLoading) return <Loader />
  console.log(param)


  return (
    <div className="check-reservation">
      rezerwacja
    </div>
  );
}



const mapStateToProps = ({ reservation }) => {
  return {
    reservation
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getReservationById: (data) => dispatch(getReservationDataFromId(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckReservation);