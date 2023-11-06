import pdf from 'pdfkit';
import fs from 'fs';


const generatePDF = (bookingData) => {

    const doc = new pdf();
    doc.pipe(fs.createWriteStream(`C:/Users/Shreedhar Joshi/Desktop/Coding/Heritage Explorer/tour-management-main/booking_pdfs/booking_${bookingData._id}.pdf`));
    // const stream = doc.pipe(blobStream());
    doc.text(`Booking ID: ${bookingData._id}`);
    doc.text(`Fullname: ${bookingData.fullName}`);
    doc.text(`Email ID: ${bookingData.userEmail}`);
    doc.text(`Phone number: ${bookingData.phone}`);
    doc.text(`Date: ${bookingData.bookAt.toDateString()}`);
    doc.text(`Number of bookings: ${bookingData.guestSize}`);
    // Add more data as needed
    doc.end();
};

export default generatePDF;