import React from 'react'
import ServiceCard from './ServiceCard'
import {Col} from 'reactstrap'
import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData = [
    {
        imgUrl:weatherImg,
        title:"Comprehensive Historical Tours",
        desc:"Our portfolio features Maharashtra's iconic historical sites, from the intricate caves of Ajanta and Ellora to the mighty Raigad forts and opulent Shaniwar Wada palaces. We offer a captivating journey through the state's rich heritage.",
    },
    {
        imgUrl:guideImg,
        title:"Educational Experiences",
        desc:"For educational institutions, we offer tours that align seamlessly with curriculum requirements, transforming history into a living, breathing classroom. Our tours provide enriching learning experiences for students of all ages.",
    },
    {
        imgUrl:customizationImg,
        title:"Cultural Immersion",
        desc:"Beyond history, our tours offer cultural immersion opportunities. Engage with local culture, savor traditional cuisine, and witness age-old traditions, enhancing your journey with a deeper understanding of the region's heritage.",
    },
]
const ServiceList = () => {
  return(
  <>
  {servicesData.map((item, index) => (
    <Col lg='3' key={index}>
        <ServiceCard item={item}/>
        </Col>
        ))}
  </>
  );
};

export default ServiceList
