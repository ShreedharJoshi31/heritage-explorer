import React from 'react'
import Slider from 'react-slick'
import ava01 from '../../assets/images/avatar.jpg'
import ava02 from '../../assets/images/avatar.jpg'
import ava03 from '../../assets/images/avatar.jpg'

const Testimonials = () => {
  const settings= {
    dots:true,
    infinite:true,
    autoplay:true,
    speed:1000,
    swipeToSlide:true, 
    autoplaySpeed:2000,
    slidesToShow:2,
    responsive:[
      {
      breakpoint:992,
      settings:{
        slidesToShow:2,
        slidesToScroll:1,
        infinite:true,
        dots:true,

      },
    },
      {
      breakpoint:576,
      settings:{
        slidesToShow:1,
        slidesToScroll:1,
            },
    }
      

    ]

  }
  return(
  <Slider {...settings} >

     <div className="testimonial">
      <p>Heritage Explorer Maharashtra made my visit to historical sites a breeze! <br />The guided tour of Ellora Caves was exceptional. The knowledgeable guide shared fascinating insights, and the whole experience was simply unforgettable. <br />I'll definitely be booking more tours with them.</p>
        <div className="d-flex align-items-center gap-3 mt-3 ">
          <img src={ava01} className='w-25 h-25 rounded-2' alt="" />
          <div>
            <h6 className='mb-0 mt-3'>Priya Sharma</h6>
            <p>Mumbai</p>
          </div>
        </div>
     </div>

     <div className="testimonial">
      <p>As a history enthusiast, I'm thrilled with the services provided by Heritage Explorer Maharashtra. Their attention to detail in organizing group tours is commendable. <br />I recently explored Raigad Fort with them, and it was a seamless and <br />enriching experience.</p>
        <div className="d-flex align-items-center gap-3 mt-3 ">
          <img src={ava02} className='w-25 h-25 rounded-2' alt="" />
          <div>
            <h6 className='mb-0 mt-3'>Rajesh Patel</h6>
            <p>Pune</p>
          </div>
        </div>
     </div> 

     <div className="testimonial">
      <p>I had an amazing time exploring Maharashtra's historical sites with my family through Heritage Explorer Maharashtra. Their private tour of Shaniwar Wada was not only educational but also a lot of fun. The kids loved it!</p>
        <div className="d-flex align-items-center gap-3 mt-3 ">
          <img src={ava02} className='w-25 h-25 rounded-2' alt="" />
          <div>
            <h6 className='mb-0 mt-3'>Sarah Johnson</h6>
            <p>New Delhi</p>
          </div>
        </div>
     </div>

     <div className="testimonial">
      <p>Heritage Explorer Maharashtra is a must for anyone wanting to delve into the state's history. Their website is user-friendly, and the booking process is straightforward. <br />I recently booked tickets for Ellora Caves, and it was a smooth experience from start to finish.</p>
        <div className="d-flex align-items-center gap-3 mt-3 ">
          <img src={ava03} className='w-25 h-25 rounded-2' alt="" />
          <div>
            <h6 className='mb-0 mt-3'>Alok Desai</h6>
            <p>Nagpur</p>
          </div>
        </div>
     </div>
    </Slider>
)};

export default Testimonials
