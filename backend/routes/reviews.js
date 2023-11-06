 import express from  'express';
import { creatReview } from '../controllers/reviewController.js';
import { verifyUser } from '../utils/verifyToken.js';

 const router = express.Router()

router.post('/:tourId', creatReview)
 export default router