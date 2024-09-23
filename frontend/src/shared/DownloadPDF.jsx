import React from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";

const DownloadPDF = ({ booking, qrCodeUrl }) => {
  const formattedDate = new Date(booking.bookAt).toLocaleDateString();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {/* QR Code Image */}
          <Image src={qrCodeUrl} style={styles.qrCode} />
          <Text style={styles.title}>Booking Details</Text>
          <Text>Tour Name: {booking.tourName}</Text>
          <Text>Full Name: {booking.fullName}</Text>
          <Text>Phone Number: {booking.phone}</Text>
          <Text>Date: {formattedDate}</Text>
          <Text>Number of Bookings: {booking.guestSize}</Text>
        </View>
      </Page>
    </Document>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  page: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    margin: 10,
    padding: 10,
    flexGrow: 1,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  qrCode: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
};

export default DownloadPDF;
