import React from 'react';
import { useParams } from 'react-router-dom'

const MoviePage = () => {
  const path = useParams().name

  return (<div>
    {path}
  </div>);
}

export default MoviePage;