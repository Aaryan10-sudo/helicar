import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler } from './middlewares/apiError.js';

const app = express();
app.use(
  cors({
    // eslint-disable-next-line no-undef
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: '20kb' }));
app.use(morgan('dev'));

import vehicleRouter from './routes/vehicle.route.js';
import ratingRouter from './routes/rating.route.js';
import bookingRouter from './routes/booking.route.js';
import authRouter from './routes/adminAuth.route.js';
import blogRouter from './routes/blog.route.js';
import categoryRouter from './routes/category.route.js';
import roleRouter from "./routes/role.route.js"
app.use('/api/v1/vehicles', vehicleRouter);
app.use('/api/v1/ratings', ratingRouter);
app.use('/api/v1/role', roleRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/blogs', blogRouter);
app.use('/api/v1/categories',categoryRouter);
app.use(errorHandler);
app.get('/', (req, res) => {
  res.send('Ok');
});

export { app };
