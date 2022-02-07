import React from 'react';
import {Routes, Route} from 'react-router-dom'
import HomePage from '../page/HomePage'

const Page = () => {
  return ( 
    <div className='main-page-content'>
      <Routes>
<Route path='/' element={<HomePage/>}></Route>
      </Routes>
    </div>
   );
}
 
export default Page;