import React from 'react';
import '../style/Banner.css';
const Banner = ({ data, animate = true }) => {
  const bannerRef = React.useRef('')
  let bannerSwitchNumber = React.useRef(1)
  let animationTime = 3000
  let timeoutTime = 500


  const bannerData = data.map((item, id) => (
    <div className="banner__wrap" key={id}>
      <div className="banner-image">
        <img src={item.image} alt={item.caption} className="banner-image__img" />
      </div>
      <div className={`banner__wrap-info ${id === 0 ? 'active' : null}`}>
        <p className="banner__wrap-info__p--main">{item.caption}</p>
        <p className="banner__wrap-info__p--secondary">{item.desc}</p>
      </div>
    </div>
  ))

  const box = data.map((item, id) => (
    <span className={`banner-page-squares__span`} key={id} data-value={id + 0}></span>
  ))


  React.useEffect(() => {
    // get all boxes and change collor of the first one to current color
    const boxes = [...document.querySelectorAll(`.banner-page-squares__span`)]
    boxes[0].classList.add('banner-page-squares__span--current')

    let timeout;
    // function to switch images in banner / change current square
    const animateBanner = () => {
      if (bannerSwitchNumber.current < data.length) {
        bannerRef.current.style.transform = `translate(${-100 / data.length * bannerSwitchNumber.current}%)`
        bannerSwitchNumber.current++

      } else {
        bannerRef.current.style.transform = `translate(0%)`
        bannerSwitchNumber.current = 1
      }

      // animate info 
      if (animate) {
        const childrenEl = [...bannerRef.current.children]
        const infoOfCurrentChildren = childrenEl[bannerSwitchNumber.current - 1].children[1]

        childrenEl.forEach(item => { item.children[1].classList.remove('active') })
        infoOfCurrentChildren.classList.add('active')
      }

      // change current square
      boxes.forEach(item => item.classList.remove('banner-page-squares__span--current'))
      boxes[bannerSwitchNumber.current - 1].classList.add('banner-page-squares__span--current')

    }

    // start animating
    let interval = setInterval(() => {
      animateBanner()
    }, animationTime)

    // functions to switch banner image after clicking on a box
    boxes.forEach(item => {
      item.addEventListener('click', function () {
        // stop switch animation
        clearInterval(interval)
        // get value of clicked square
        bannerSwitchNumber.current = this.dataset.value
        // switch banner element to clicked one
        bannerRef.current.style.transform = `translate(${-100 / data.length * bannerSwitchNumber.current}%)`
        // switch current square to the clicked one
        boxes.forEach(item => item.classList.remove('banner-page-squares__span--current'))
        boxes[bannerSwitchNumber.current].classList.add('banner-page-squares__span--current')

        // animate text info of clicked panel
        animate && bannerRef.current.children[bannerSwitchNumber.current].children[1].classList.add('active')

        // start switch animation after delay
        timeout = setTimeout(() => {
          interval = setInterval(() => {
            animateBanner()
          }, animationTime)
        }, timeoutTime)
      })
    })


    return () => {
      // end animation after component unmount
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [bannerSwitchNumber, data, animationTime, timeoutTime, animate])

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