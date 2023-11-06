import express from "express";
import { checkout, paymentVerification } from "../controllers/paymentController.js";

const router = express.Router();

router.post('/checkout', checkout);
router.post('/verification', paymentVerification);

export default router;