import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';
import paymentRoute from './routes/payment.js';
import Razorpay from 'razorpay';
import Booking from './models/Booking.js';
import Tour from './models/Tour.js';



dotenv.config();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET, 
})


const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: true,
  credentials: true
};

// Database connection
mongoose.set('strictQuery', false);
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB database connected');
  } catch (error) {
    console.log('Mongodb database connection failed');
  }
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/booking', bookingRoute);
app.use('/api/v1/payment', paymentRoute);

app.get('/api/v1/getkey', (req, res) => {
  res.status(200).json({ key:process.env.RAZORPAY_KEY_ID })
});

app.get('/api/v1/available-tickets', async (req, res) => {
  const { date, tourName } = req.query;

  try {
    const bookingsForDate = await Booking.find({ bookAt: date, tourName: tourName });
    const tour = await Tour.findOne({title: tourName});
    const maxGroupSize = tour.maxGroupSize
    let totalAvailableTickets = maxGroupSize;
    bookingsForDate.forEach((currentBooking) => {
      totalAvailableTickets = totalAvailableTickets - currentBooking.guestSize;
    });
    res.json({ totalAvailableTickets: totalAvailableTickets });
  } catch (error) {
    console.error("Error fetching available tickets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  connectToDatabase();
  console.log('Server listening on port', port);
});
