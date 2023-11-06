import React, { useEffect } from "react";
import "../styles/home.css";
import { Container, Row, Col } from "reactstrap";
import worldImg from "../assets/images/world.png";
import Subtitle from "../shared/Subtitle";
import SearchBar from "../shared/SearchBar";
import ServiceList from "../services/ServiceList";
import FeaturedTourList from "../components/Featured-tours/FeaturedTourList";
import MasonryImagesGallery from "../components/image-gallery/MasonaryImagesGallery";
import Testimonials from "../components/Testimonial/Testimonials";
import Map from "../components/Map/Map";

const Home = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      {/* ==================Hero Section start=================== */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Discover the Beauty of the Past"} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>
                  Discover the Magnificence of{" "}
                  <span className="highlight">Maharashtra's</span> Storied Past
                </h1>
                <p>
                  Welcome to Heritage Explorer Maharashtra, your gateway to a
                  journey through the annals of time. Immerse yourself in the
                  ancient stories, architectural marvels, and cultural heritage
                  of one of India's most historically vibrant states. From the
                  awe-inspiring caves of Ajanta and Ellora to the formidable
                  fortresses like Raigad, embark on a captivating adventure that
                  will leave you in awe of Maharashtra's profound history. Let's
                  explore history together!
                </p>
              </div>
            </Col>

            <Col lg="2">
              <div className="hero__img-box">
                <img
                  src="https://playingwithmemories.files.wordpress.com/2012/11/cst-day-2.jpg"
                  alt=""
                />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-4">
                {/* <video src={herVideo} alt="" controls /> */}
                <img
                  src="https://images.pexels.com/photos/5732839/pexels-photo-5732839.jpeg"
                  alt=""
                />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-5">
                <img
                  src="https://images.pexels.com/photos/15919818/pexels-photo-15919818/free-photo-of-peunguins-in-zoo.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </div>
            </Col>
            <SearchBar />
          </Row>
        </Container>
      </section>
      {/* ==================Hero Section end =================== */}
      <section>
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="services__subtitle">What we serve</h5>
              <h2 className="services__title">We offer our best services</h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>

      {/* =============featured tours section start ============= */}
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <Subtitle subtitle={"Explore"} />
            <h2 className="featured__tour-title">Our featured tours</h2>
          </Col>
          <FeaturedTourList />
        </Row>
      </Container>
      {/* =============featured tours section end ============= */}
      {/* =============Map section starts ============= */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Maharashtra's Historic Treasures"} />
              <h2 className="featured__tour-title">
                Explore the Rich History of Maharashtra's Landmarks
              </h2>
            </Col>
          </Row>
          <Row>
            <Col lg="12" className="map__section">
              <Map />
            </Col>
          </Row>
        </Container>
      </section>
      {/* =============Map section ends ============= */}

      {/* =========gallery section start====================== */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Gallery"} />
              <h2 className="gallery__title">
                Visit our customers tour gallery
              </h2>
            </Col>
            <Col lg="12">
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>

      {/* =========gallary section end====================== */}

      {/* =========testimonial secyion start ====================== */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Funs love"} />
              <h2 className="testimonil__title">What our fans say about us</h2>
            </Col>
            <Col lg="12">
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>

      {/* =========testimonial section end ====================== */}
    </>
  );
};

export default Home;
