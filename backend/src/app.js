import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );


app.use(express.json({ limit: "20kb" }));
app.use(morgan('dev'));
app.get('/', (req, res) => {
    res.send('Ok');
    });


export {app};