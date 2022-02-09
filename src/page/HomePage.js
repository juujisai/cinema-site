import React from 'react';
import Banner from '../components/Banner'
import { bannerData } from '../data/bannerData'


const HomePage = () => {
  return (
    <div className='home-page page-content'>
      <Banner
        data={bannerData}
        animate={true}
      />

    </div>
  );
}

export default HomePage;