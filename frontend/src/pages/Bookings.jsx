import React, { useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";
import BookingCard from "../shared/BookingCard";
import CommonSection from "../shared/CommonSection";

const Bookings = () => {
  const { user } = useContext(AuthContext);

  const {
    data: bookings,
    error,
    loading,
  } = useFetch(`${BASE_URL}/booking/user/${user?._id}`);

  if (!user) {
    // User is not logged in, you can render a message or redirect to a login page
    return (
      <div>
        <CommonSection title={"My Bookings"} />
        <h2>Please log in to view your bookings.</h2>
      </div>
    );
  }

  const today = new Date();

  return (
    <>
      <CommonSection title={"My Bookings"} />
      <div>
        <section className="pt-0 align-items-center">
          <Container>
            {loading && <p>Loading user data...</p>}
            {error && <p>Error: {error}</p>}
            {!error && !loading && bookings && (
              <Row>
                {bookings?.map((booking) => (
                  <Col lg="12" className="mb-4" key={booking._id}>
                    <BookingCard booking={booking} />
                  </Col>
                ))}
              </Row>
            )}
          </Container>
        </section>
      </div>
    </>
  );
};

export default Bookings;
