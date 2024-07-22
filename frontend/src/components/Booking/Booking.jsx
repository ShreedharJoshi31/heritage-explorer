import React, { useContext, useState } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";
import axios from "axios";
import smallLogo from "../../assets/images/Logowithoutname.png";

const Booking = ({ tour, avgRating, setSelectedDate, totalAvailableTickets, setTotalAvailableTickets }) => {
  const { price, reviews, title } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: "1",
    bookAt: new Date(),
  });

  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 10;
  const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      if (!user || user === undefined || user === null) {
        return alert("Please sign in");
      }

      if (!booking.fullName || !booking.phone || !booking.bookAt || !booking.guestSize) {
        alert("All fields are required!");
        return;
      }

      if (totalAvailableTickets === null || totalAvailableTickets < booking.guestSize) {
        alert("No available tickets for the selected date or insufficient available tickets.");
        return;
      }

      const res = await fetch(`${BASE_URL}/booking`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(booking),
      });

      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }

      // Update totalAvailableTickets after booking
      setTotalAvailableTickets(totalAvailableTickets - booking.guestSize);
      checkoutHandler();
      // navigate('/thank-you')
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const checkoutHandler = async () => {
    const {
      data: { key },
    } = await axios.get(`${BASE_URL}/getkey`);

    const { data } = await axios.post(`${BASE_URL}/payment/checkout`, {
      totalAmount,
    });

    console.log(data.order.amount);

    const options = {
      key: key, // Enter the Key ID generated from the Dashboard
      amount: data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Heritage Explorer",
      description: "Test Transaction",
      image: smallLogo,
      order_id: data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${BASE_URL}/payment/verification`,
      prefill: {
        name: booking.fullName,
        email: booking.userEmail,
        contact: booking.phone,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#ff7e01",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();

    console.log(data);
  };


  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ₹{price} <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center ">
          <i className="ri-star-s-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* {================booking form================} */}

      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3 ">
            <input type="date" placeholder="" id="bookAt" onChange={(e)=>{
              handleChange(e);
              setSelectedDate(e.target.value);
            }} required />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>

      {/* {================booking end================} */}

      {/* booking bottom */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ₹{price} <i className="ri-close-line"></i>1 person{" "}
            </h5>
            <span>₹{price}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span> ₹{serviceFee} </span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5> Total </h5>
            <span> ₹{totalAmount} </span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
          Book Now{" "}
        </Button>
      </div>
    </div>
  );
};

export default Booking;
