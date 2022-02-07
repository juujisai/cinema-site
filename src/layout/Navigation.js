import React from 'react';
import { GoKebabVertical } from 'react-icons/go'
import { NavLink } from 'react-router-dom'
import logo from '../media/cinema_logo.svg'

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
    path: '/reservation',
    name: 'rezerwacja'
  },
  {
    path: '/contact',
    name: 'kontakt'
  },

]


const Navigation = () => {
  const menuBtnRef = React.useRef('')
  const [navOpen, setNavOpen] = React.useState(false)


  const menu = menuData.map((item, id) => (
    <li className='main-menu__li' key={id} style={navOpen ? { transform: `translateY(0%)` } : { transform: `translateY(${-100 * (id + 1)}%)` }}>
      <NavLink to={item.path} onClick={() => setNavOpen(!navOpen)} className='main-menu__li__a'  >{item.name}</NavLink>
    </li >
  ))

  const handleMenuBtnClick = () => {
    setNavOpen(!navOpen)
    !navOpen ? menuBtnRef.current.style.transform = 'rotate(90deg)' : menuBtnRef.current.style.transform = 'rotate(0deg)'

  }

  return (
    <nav className='navi'>
      <div className="logo">
        <img className='logo__img' src={logo} alt="logo kina cinemon" />
      </div>
      <ul className="main-menu">
        {menu}
      </ul>
      <div className="menu-button" ref={menuBtnRef}>
        <GoKebabVertical className="menu-button__button" onClick={() => handleMenuBtnClick()} />
      </div>
    </nav>
  );
}

export default Navigation;