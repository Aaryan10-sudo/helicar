import express from 'express';
import { changeBookingStatus, create, getAll, remove, verify } from '../controllers/booking.controller.js';

const router = express.Router();

router.post('/',create);
router.get('/verify',verify);
router.get("/",getAll)
router.delete('/:bookingId',remove);
router.patch('/',changeBookingStatus);
export default router;