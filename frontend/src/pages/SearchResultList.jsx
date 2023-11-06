import React, { useEffect, useState } from 'react'
import CommonSection from './../shared/CommonSection'
import { Container, Row, Col } from 'reactstrap';


import { useLocation } from 'react-router-dom';
import TourCard from '../shared/TourCard';

const SearchResultList = () => {

  const location = useLocation()

  const [data] = useState(location.state)

  useEffect(() => {
    window.scrollTo(0, 0)
  },[])


  return <>

    <CommonSection title={'Tour search result'} />
    <section>
      <Container>
        <Row>
          {

            data.length === 0 ? (
               <h4 className='text-center'>no tour found</h4> 
               ):(
                 data?.map(tour => (<Col lg='3' className='mb-4 'key={tour._id} >
                
              <TourCard tour={tour}/>
            </Col>
                 ))
          )}
        </Row>
      </Container>
    </section>


  </>
};
export default SearchResultList
