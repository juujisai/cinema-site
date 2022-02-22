import React from 'react';
import logo from '../media/cinema_logo.svg'
import { Link } from 'react-router-dom'

const menuData = [
  {
    path: '/',
    name: 'home',
  },
  {
    path: '/movies',
    name: 'filmy'
  },
  {
    path: '/rep',
    name: 'repertuar'
  },
  {
    path: '/info',
    name: 'informacje'
  },

]


const Footer = () => {



  const menu = menuData.map((item, id) => (
    <li className='footer-menu__li' key={id} >
      <Link to={item.path} className='footer-menu__li__a'  >{item.name}</Link>
    </li >
  ))


  return (
    <footer>
      <h1 className="footer__h1">Zapraszamy do kina!</h1>

      <ul className="footer-menu">
        {menu}
      </ul>
      <div className="logo">
        <img className='logo__img' src={logo} alt="logo kina cinemon" />
      </div>

    </footer>
  );
}

export default Footer;