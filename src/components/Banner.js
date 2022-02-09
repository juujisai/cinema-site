import React from 'react';

const Banner = ({ data, animate }) => {
  const bannerRef = React.useRef('')
  let bannerSwitchNumber = React.useRef(0)




  const bannerData = data.map((item, id) => (
    <div className="banner__wrap" key={id}>
      <div className="banner-image">
        <img src={item.image} alt={item.caption} className="banner-image__img" />
      </div>
      <div className="banner__wrap-info">
        <p className="banner__wrap-info__p--main">{item.caption}</p>
        <p className="banner__wrap-info__p--secondary">{item.desc}</p>
      </div>
    </div>
  ))

  const box = data.map((item, id) => (
    <span className="banner-page-squares__span" key={id} ></span>
  ))


  React.useEffect(() => {
    const animateBanner = () => {

      if (bannerSwitchNumber.current < data.length) {
        bannerRef.current.style.transform = `translate(${-100 / data.length * bannerSwitchNumber.current}%)`
        bannerSwitchNumber.current++

      } else {
        bannerRef.current.style.transform = `translate(0%)`
        bannerSwitchNumber.current = 1
      }

      const boxes = [...document.querySelectorAll(`.banner-page-squares__span`)]
      boxes.forEach(item => item.classList.remove('banner-page-squares__span--current'))
      boxes[bannerSwitchNumber.current - 1].classList.add('banner-page-squares__span--current')

    }

    let interval = setInterval(() => {
      animateBanner()
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [bannerSwitchNumber, data])

  return (
    <div className="banner-page">
      <div ref={bannerRef} className="banner-page-content" style={{ width: `${data.length * 100}%` }}>
        {bannerData}
      </div>
      <div className="banner-page-squares">
        {box}
      </div>
    </div>
  );
}

export default Banner;