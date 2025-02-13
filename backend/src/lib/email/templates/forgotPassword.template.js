import { FRONTEND_BASE_URL } from '../../../config/env.js';

export const forgotPasswordEmailTemplate = (name, token) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Creation Successful</title>
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
                background-color: #4CAF50;
                color: #fff;
                text-align: center;
                padding: 20px 0;
            }
            .content {
                padding: 20px;
            }
            .content-p1 {
                font-size: 14px;
            }
            .reset-link-container {
                width: 100%;
                display: flex;
                justify-content: center;
                padding: 30px 0;
            }
            .reset-link-btn {
                padding: 10px 20px;
                background-color: #3399FF;
                color: white;
                font-weight: bold;
                font-size: 15px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            .message {
                font-size: 12px;
                color: #807F7F;
            }
            .footer {
                background-color: #333;
                color: #fff;
                text-align: center;
                padding: 10px 0;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>Reset Password</h1>
            </div>
            <div class="content">
                <p><b>Hello ${name},</b></p>
                <div class="content-p1">
                    <p>If you've forgotten your password or wish to reset it,</p>
                    <p>Click on the button below to get started.</p>
                </div>
                <div class="reset-link-container">
                    <a href="${FRONTEND_BASE_URL}/reset-password?token=${token}">
                        <button class="reset-link-btn">Reset Your Password</button>
                    </a>
                </div>
                <p class="message">If you did not request a password reset, you can safely ignore this email. Only a person with access to your email can reset your account password.</p>
            </div>
            <div class="footer">
                <p>&copy; 2025 Helicar. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};
