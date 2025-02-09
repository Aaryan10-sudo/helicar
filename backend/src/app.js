import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler } from './middlewares/apiError.js';

const app = express();
app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );


app.use(express.json({ limit: "20kb" }));
app.use(morgan('dev'));

import vehicleRouter from './routes/vehicle.route.js';
import ratingRouter from './routes/rating.route.js';
app.use('/api/v1/vehicles', vehicleRouter);
app.use('/api/v1/ratings', ratingRouter);





app.use(errorHandler)
app.get('/', (req, res) => {
    res.send('Ok');
    });



export {app};