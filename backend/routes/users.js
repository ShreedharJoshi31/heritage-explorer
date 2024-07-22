import express from 'express';
import jwt from 'jsonwebtoken';
import { deleteUser, getAllUser, getSingleUser, updateUser } from '../controllers/userController.js';
import Booking from '../models/Booking.js';
const router =  express.Router()

import { verifyAdmin, verifyUser, verifyToken } from '../utils/verifyToken.js';

// router.get("/myBookings", verifyUser, getUserBookings);

// update  user
router.put('/:id',verifyUser, updateUser);

// delete  user
router.delete('/:id',verifyUser, deleteUser);

// get single user
router.get('/:id',verifyUser, getSingleUser);

// get all user
router.get('/', verifyAdmin, getAllUser);



export default router;