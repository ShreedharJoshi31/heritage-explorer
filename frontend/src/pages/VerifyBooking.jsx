import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import "../styles/verify-bookings.css"; // Custom CSS for centering content

const VerifyBooking = () => {
  const { id } = useParams(); // Extract id from the URL
  const [verificationStatus, setVerificationStatus] = useState("");
  const [bookingData, setBookingData] = useState(null); // State for booking details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetchedData = useRef(false); // Keep track of whether the API has been called

  useEffect(() => {
    const verifyBooking = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/booking/verify/${id}`);
        setVerificationStatus(response.data.message); // Set the verification message

        // Assuming your API returns booking data along with the message
        if (response.data.booking) {
          setBookingData(response.data.booking); // Set booking data
        }
        console.log(response.data);
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        setLoading(false); // Stop loading once the API call is finished
      }
    };

    // Call the API only if it hasn't been called yet
    if (!hasFetchedData.current) {
      verifyBooking();

      hasFetchedData.current = true; // Set to true after the first call
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Show loading while waiting for API response
  }

  if (error) {
    return (
      <div className="center-content">
        <img
          src="/caution.png" // Ensure this is the correct path to your image
          alt="Verified"
          className="tickmark-image" // Add custom styles if needed
        />
        <h2>Booking Verification Status</h2>
        {error}
      </div>
    ); // Show error if API call fails
  }

  return (
    <div className="center-content">
      {verificationStatus === "Booking successfully verified" && bookingData ? (
        <div>
          {/* Tick mark image */}
          <img
            src="/checked.png" // Ensure this is the correct path to your image
            alt="Verified"
            className="tickmark-image" // Add custom styles if needed
          />
          {/* Verified message */}
          <h2>Booking Verified</h2>
          {/* Display booking details */}
          <div className="booking-details">
            <p>
              <b>Tour Name:</b> {bookingData.tourName}
            </p>
            <p>
              <b>Full Name:</b> {bookingData.fullName}
            </p>
            <p>
              <b>Phone Number:</b> {bookingData.phone}
            </p>
            <p>
              <b>Date:</b> {new Date(bookingData.date).toLocaleDateString()}
            </p>
            <p>
              <b>Number of Bookings:</b> {bookingData.guestSize}
            </p>
          </div>
        </div>
      ) : (
        <div>
          {/* Handle other statuses if needed */}
          <h2>{verificationStatus}</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyBooking;
