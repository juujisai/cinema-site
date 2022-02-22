import React from 'react';
import { Link } from "react-router-dom"
import error from '../media/error.webp'

const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="error-image">
        <img src={error} className="error-image__img" alt="Ręka trzymająca napis Błąd" />
      </div>
      <h1 className="error-page__h1">Podana strona nie istnieje</h1>
      <div className="error-page__button">
        <Link to="/" className="button main-button">Wróć do strony głównej</Link>
      </div>

    </div>
  );
}

export default ErrorPage;