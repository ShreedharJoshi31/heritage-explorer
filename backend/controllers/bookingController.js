import Booking from "../models/Booking.js";
import qrcode from "qrcode";

// create new booking
export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);

  try {
    const savedBooking = await newBooking.save();
    console.log(savedBooking);
    res.status(200).json({
      success: true,
      message: "Your tour is booked",
      data: savedBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//get single booking

export const getBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Booking.findById(id);

    res.status(200).json({
      success: true,
      message: "successful",
      data: book,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

export const deleteBooking = async (req, res) => {
  const id = req.params.id;
  try {
    await Booking.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
};

//get all booking
export const getAllBooking = async (req, res) => {
  try {
    const books = await Booking.find();

    res.status(200).json({
      success: true,
      message: "successful",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const getUserBookings = async (req, res) => {
  const id = req.params.userId;
  try {
    const bookings = await Booking.find({ userId: id });
    console.log(bookings);

    res.status(200).json({
      success: true,
      message: "Successfull ",
      data: bookings,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

export const generateQrCode = async (req, res) => {
  const bookingId = req.params.bookingId;

  try {
    qrcode.toDataURL(
      `${process.env.FRONTEND_URL}/bookings/${bookingId}`,
      function (err, url) {
        if (err) return console.log(err);
        // console.log(url);
        res.status(200).send(url);
      }
    );
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "galat",
    });
  }
};

export const generateQrCodeForVerification = async (req, res) => {
  const bookingId = req.params.bookingId;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    qrcode.toDataURL(
      `${process.env.FRONTEND_URL}/bookings/verify/${bookingId}`,
      async (err, url) => {
        if (err)
          return res
            .status(500)
            .json({ success: false, message: "QR Code generation failed" });

        res.status(200).json({
          success: true,
          message: "QR Code generated",
          qrCode: url,
        });
      }
    );
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const verifyBooking = async (req, res) => {
  const bookingId = req.params.bookingId;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    if (booking.verified) {
      return res
        .status(400)
        .json({ success: false, message: "Booking already verified" });
    }

    // Mark the booking as verified
    booking.verified = true;
    await booking.save();

    // Prepare the response with booking details
    const bookingDetails = {
      tourName: booking.tourName,
      fullName: booking.fullName,
      phone: booking.phone,
      date: booking.bookAt, // Assuming date is stored as a Date object
      guestSize: booking.guestSize,
    };

    res.status(200).json({
      success: true,
      message: "Booking successfully verified",
      booking: bookingDetails, // Include the booking details in the response
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
