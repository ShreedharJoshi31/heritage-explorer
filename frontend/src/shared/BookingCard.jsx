import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  CardImg,
} from "reactstrap";
import logoWithoutName from "../assets/images/Logowithoutname.png";
import "../shared/booking-card.css";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DownloadPDF from "./DownloadPDF";

const BookingCard = ({ booking }) => {
  const formattedDate = new Date(booking.bookAt).toLocaleDateString();
  const [qrImage, setQrImage] = useState("");

  useEffect(() => {
    const fetchQrCode = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/booking/qrcode/verify/${booking._id}`
        );
        setQrImage(response.data.qrCode);
      } catch (error) {
        console.error("Error fetching QR code:", error);
      }
    };

    fetchQrCode();
  }, [booking._id]);

  const handleCancelBooking = () => {
    const bookingId = booking._id;

    axios
      .delete(`${BASE_URL}/booking/${bookingId}`)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Card className="horizontal-product-card">
      <div className="row no-gutters">
        <div className="col-md-4">
          <CardImg
            src={qrImage}
            alt={logoWithoutName}
            className="product-image"
          />
        </div>
        <div className="col-md-8">
          <CardBody>
            <CardTitle className="card-title">{booking.tourName}</CardTitle>
            <CardText className="card-text">
              <b>Fullname:</b> {booking.fullName}
            </CardText>
            <CardText className="card-text">
              <b>Phone number:</b> {booking.phone}
            </CardText>
            <CardText className="card-text">
              <b>Date:</b> {formattedDate}
            </CardText>
            <CardText className="card-text">
              <b>Number of bookings:</b> {booking.guestSize}
            </CardText>

            {/* Button Wrapper to align buttons or message */}
            {booking.verified ? (
              <Button className="btn booking__btn" disabled>
                Cancel Booking
              </Button>
            ) : (
              <Button
                className="btn booking__btn"
                onClick={handleCancelBooking}
              >
                Cancel Booking
              </Button>
            )}

            <PDFDownloadLink
              document={<DownloadPDF booking={booking} qrCodeUrl={qrImage} />}
              fileName={`Booking_Details_${booking._id}.pdf`}
            >
              <Button className="btn download__btn">Download PDF</Button>
            </PDFDownloadLink>
          </CardBody>
        </div>
      </div>
    </Card>
  );
};

export default BookingCard;
