import dotenv from 'dotenv';

// Load environment variables from .env file

dotenv.config();

const {
  PORT = 8000,
  MONGO_URI = 'mongodb://localhost:27017/helicarbooking',
  CLOUDINARY_CLOUD_NAME = 'your_cloud_name',
  CLOUDINARY_API_KEY = 'your_api_key',
  CLOUDINARY_API_SECRET = 'your_api_secret',
  CORS_ORIGIN = '*',
  SMTP_PASSWORD,
  SMTP_EMAIL,
  BASE_URL,
  FRONTEND_BASE_URL,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
} = process.env;

export {
  PORT,
  MONGO_URI,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CORS_ORIGIN,
  SMTP_PASSWORD,
  BASE_URL,
  FRONTEND_BASE_URL,
  SMTP_EMAIL,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
};
