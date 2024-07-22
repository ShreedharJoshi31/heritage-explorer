import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText, Button, CardImg } from "reactstrap";
import logoWithoutName from '../assets/images/Logowithoutname.png'
import '../shared/booking-card.css'
import axios from 'axios'
import { BASE_URL } from "../utils/config";
import jsPDF from 'jspdf';

const BookingCard = ({ booking }) => {

    const formattedDate = new Date(booking.bookAt).toLocaleDateString();

    const [qrImage, setQrImage] = useState('');

    const data = {
        "Place": booking["tourName"],
        "Number of bookings": booking["guestSize"],
        "Date": formattedDate,
        "Fullname": booking["fullName"],
        "Phone number": booking["phone"],
        "Email ID": booking["userEmail"]
    }



    useEffect(() => {
        axios.get(`${BASE_URL}/booking/qrcode/${booking._id}`).then(response => {
            setQrImage(response.data);
        })
      }, [])

  const handleCancelBooking = () => {
    const bookingId = booking._id

    axios.delete(`${BASE_URL}/booking/${bookingId}`)
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const generatePDF = () => {
    console.log("handle pdf");
    const doc = new jsPDF();

    const content = `
      Tour Name: ${booking.tourName}
      Fullname: ${booking.fullName}
      Phone number: ${booking.phone}
      Date: ${formattedDate}
      Number of bookings: ${booking.guestSize}
    `;

    doc.text(content, 10, 10);

    const pdfFileName = `Booking_Details_${booking._id}.pdf`;
    doc.save(pdfFileName);
  }


  return (
    <Card className="horizontal-product-card">
      <div className="row no-gutters">
        <div className="col-md-4">
          <CardImg src={qrImage} alt={logoWithoutName} className="product-image"/>
        </div>
        <div className="col-md-8">
          <CardBody>
            <CardTitle className="card-title">{booking.tourName}</CardTitle>
            <CardText className="card-text"> <b>Fullname:</b> {booking.fullName}</CardText>
            <CardText className="card-text"> <b>Phone number:</b> {booking.phone}</CardText>
            <CardText className="card-text"> <b>Date:</b> {formattedDate}</CardText>
            <CardText className="card-text"> <b>Number of bookings:</b> {booking.guestSize}</CardText>
            <Button className="btn booking__btn" onClick={handleCancelBooking}>Cancel Booking</Button>
          </CardBody>
        </div>
      </div>
    </Card>
  );
};

export default BookingCard;
