import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/config';
import { useParams, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

const DownloadPDF = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const formattedDate = booking ? new Date(booking.data.bookAt).toLocaleDateString() : '';

  useEffect(() => {

    axios.get(`${BASE_URL}/booking/${id}`)
      .then((response) => {
        setBooking(response.data);
      })
      .catch((error) => {
        console.error('Error fetching booking data:', error);
      });
  }, [id]);

  useEffect(() => {
    if (booking && !pdfGenerated) {
      generatePDF(booking.data);
      setPdfGenerated(true);
    }
  }, [booking, pdfGenerated]);

  const generatePDF = (bookingData) => {
    const doc = new jsPDF();

    const content = `
      Tour Name: ${bookingData.tourName}
      Fullname: ${bookingData.fullName}
      Phone number: ${bookingData.phone}
      Date: ${formattedDate}
      Number of bookings: ${bookingData.guestSize}
    `;

    doc.text(content, 10, 10);

    const pdfFileName = `Booking_Details_${bookingData._id}.pdf`;
    doc.save(pdfFileName);

    
    navigate('/bookings');
  };

  return (
    <h1>{pdfGenerated ? 'PDF Generated, Redirecting...' : 'DOWNLOADING PDF.......'}</h1>
  );
};

export default DownloadPDF;
