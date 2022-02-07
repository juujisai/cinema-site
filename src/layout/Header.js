import React from 'react';
import Navigation from './Navigation';

const Header = () => {
  return (
    <header>
      <Navigation />
      <div className="banner">
        <h1 className="banner__h1">
          Witamy w kinie!
        </h1>
        <h2 className="banner__h2">
          Najnowsze produkcje tylko u nas!
        </h2>
      </div>
    </header>
  );
}

export default Header;