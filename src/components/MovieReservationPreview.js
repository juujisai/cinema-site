import React from 'react';

const MovieReservationPreview = ({ data }) => {
  const { name } = data

  return (
    <div>
      {name}
    </div>
  );
}

export default MovieReservationPreview;