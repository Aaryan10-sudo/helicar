import { BASE_URL } from "../../../config/env.js";
export const verifyBooking = (name, token, pickup, dropoff) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Booking</title>
          <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
              color: #333;
          }
          .email-container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              overflow: hidden;
          }
          .header {
              background-color: #007bff;
              color: #fff;
              text-align: center;
              padding: 20px 0;
          }
          .content {
              padding: 20px;
          }
          .footer {
              background-color: #333;
              color: #fff;
              text-align: center;
              padding: 10px 0;
          }
          .button {
              display: inline-block;
              padding: 10px 20px;
              margin-top: 15px;
              background-color: #28a745;
              color: white;
              text-decoration: none;
              border-radius: 5px;
          }
          </style>
      </head>
      <body>
          <div class="email-container">
              <div class="header">
                  <h1>Verify Your Booking</h1>
              </div>
              <div class="content">
                  <p><b>Hello ${name},</b></p>
                  <p>Thank you for booking a ride with us! Please verify your booking details below:</p>
                  
                  <h3>Booking Details:</h3>
                  <p><strong>Pickup Location:</strong> ${pickup.address}</p>
                  <p><strong>Pickup Date & Time:</strong> ${pickup.date} at ${pickup.time}</p>
                  <p><strong>Dropoff Location:</strong> ${dropoff.address}</p>
                  <p><strong>Dropoff Date & Time:</strong> ${dropoff.date} at ${dropoff.time}</p>
                  
                  <p>To confirm your booking, please click the button below:</p>
                  <a href="${BASE_URL}/api/v1/bookings/verify?token=${token}" class="button">Verify Booking</a>
  
                  <p>If you did not request this booking, please ignore this email.</p>
                  <p>Best regards,<br>The Helicar Team</p>
              </div>
              <div class="footer">
                  <p>&copy; 2025 Helicar. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
    `;
  };
  