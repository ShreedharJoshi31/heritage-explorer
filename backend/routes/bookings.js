import express from "express";

import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";
import {
  createBooking,
  getAllBooking,
  getBooking,
  getUserBookings,
  deleteBooking,
  generateQrCode,
  generateQrCodeForVerification,
  verifyBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.get("/", verifyUser, getUserBookings);
router.post("/", createBooking);
router.get("/:id", getBooking);
router.delete("/:id", deleteBooking);
router.get("/", verifyAdmin, getAllBooking);

router.get("/user/:userId", getUserBookings);

router.get("/qrcode/:bookingId", generateQrCode);
router.get("/qrcode/verify/:bookingId", generateQrCodeForVerification);
router.get("/verify/:bookingId", verifyBooking);

export default router;
