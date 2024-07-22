import React, { useEffect } from "react";
import CommonSection from "../shared/CommonSection";
import Subtitle from "../shared/Subtitle";
import "../styles/about.css";
import { Container, Row, Col } from "reactstrap";
import Testimonials from "../components/Testimonial/Testimonials";

const About = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <CommonSection title={"About us"} />
      <section>
        <Container>
          <Row>
            <Col>
              <div className="sec__content">
                <h1>About Heritage Explorer</h1>
                <p>
                  Welcome to Heritage Explorer, your gateway to the rich
                  tapestry of heritage sites and cultural wonders in the
                  magnificent state of Maharashtra. We are passionate about
                  preserving and celebrating the rich history and cultural
                  heritage that Maharashtra has to offer. Our mission is to make
                  these treasures accessible to everyone, enabling you to
                  explore and experience the magic of our heritage.
                </p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="sec__content">
                <h1>Our Journey</h1>
                <p>
                  Heritage Explorer was born from a deep-rooted love for history
                  and a burning desire to share the incredible heritage of
                  Maharashtra with the world. Founded by a group of history
                  enthusiasts, archaeologists, and travel aficionados, our
                  platform was established as a bridge between the past and the
                  present. Our journey began with a simple yet powerful idea: to
                  create a platform where you could seamlessly explore, learn
                  about, and book tickets to the countless heritage sites
                  scattered throughout Maharashtra. Our team's dedication to
                  preserving and promoting these cultural gems has driven us to
                  craft an experience that is both informative and convenient.
                </p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="sec__content">
                <h1>Our Vision</h1>
                <p>
                  At Heritage Explorer, we envision a future where everyone can
                  appreciate the heritage of Maharashtra and understand the
                  significance of these cultural treasures. We aim to be more
                  than just a ticket booking platform; we aim to be your
                  companion on a journey of discovery. Our vision extends to:
                  <ol>
                    <li>
                      <b>Promoting Awareness:</b> We believe in the power of
                      knowledge. We provide detailed information about each
                      heritage site, its historical significance, and cultural
                      context to deepen your appreciation of the past.
                    </li>
                    <li>
                      <b>Accessibility:</b> Heritage Explorer ensures that
                      visiting these sites is accessible to all. We offer
                      convenient booking options and support for people of all
                      backgrounds and abilities.
                    </li>
                    <li>
                      <b>Sustainability:</b> We are committed to the sustainable
                      preservation of these sites, working closely with local
                      communities and authorities to ensure their long-lasting
                      existence.
                    </li>
                    <li>
                      <b>Authentic Experiences:</b> We aim to provide you with
                      an authentic and immersive experience when you explore
                      these sites. From guided tours to unique cultural events,
                      we strive to make your visit unforgettable.
                    </li>
                  </ol>
                </p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="sec__content">
                <h1>Why Choose Heritage Explorer?</h1>
                <p>
                  When you choose Heritage Explorer, you choose:
                  <ol>
                    <li>
                      <b>Expertise:</b> Our team of historians, archaeologists,
                      and local experts collaborate to bring you in-depth
                      knowledge and authentic experiences.
                    </li>
                    <li>
                      <b>Convenience:</b> Our user-friendly platform allows you
                      to effortlessly browse and book tickets to multiple
                      heritage sites from the comfort of your own home.
                    </li>
                    <li>
                      <b>Passion:</b> Our love for history and heritage drives
                      us to go the extra mile in curating exceptional
                      experiences for you.
                    </li>
                    <li>
                      <b>Authentic Experiences:</b> We aim to provide you with
                      an authentic and immersive experience when you explore
                      these sites. From guided tours to unique cultural events,
                      we strive to make your visit unforgettable.
                    </li>
                  </ol>
                  Join us on this exciting journey of exploration, preservation,
                  and appreciation. Together, we'll uncover the untold stories
                  of Maharashtra's magnificent past and create lasting memories
                  for future generations. Come, be a part of the Heritage
                  Explorer community and embark on an unforgettable journey
                  through time. <br />
                  Thank you for choosing Heritage Explorer to discover the soul
                  of Maharashtra's heritage.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
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
    </>
  );
};

export default About;