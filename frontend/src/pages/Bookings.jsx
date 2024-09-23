import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";
import BookingCard from "../shared/BookingCard";
import CommonSection from "../shared/CommonSection";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/booking/user/${user._id}`
        );
        setBookings(response.data.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  if (!user) {
    // User is not logged in, you can render a message or redirect to a login page
    return (
      <div>
        <CommonSection title={"My Bookings"} />
        <h2>Please log in to view your bookings.</h2>
      </div>
    );
  }

  console.log(bookings);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const futureBookings = bookings
    ?.filter((booking) => new Date(booking.bookAt) >= today)
    .sort((a, b) => new Date(a.bookAt) - new Date(b.bookAt));

  return (
    <>
      <CommonSection title={"My Bookings"} />
      <div>
        <section className="pt-0 align-items-center">
          <Container>
            {loading && <p>Loading user data...</p>}
            {error && <p>Error: {error}</p>}
            {!error && !loading && futureBookings && (
              <Row>
                {futureBookings.map((booking) => (
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
