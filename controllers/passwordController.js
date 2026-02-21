const crypto = require('crypto');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found with this email' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Set token and expiry (1 hour)
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1 hour

    await user.save();

    // Create reset URL (pointing to frontend)
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;

    // Email message
    const message = `
      <h1>Password Reset Request</h1>
      <p>Hello ${user.name},</p>
      <p>You requested a password reset for your account.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
      <p>Or copy and paste this link in your browser:</p>
      <p>${resetUrl}</p>
      <p><strong>Note:</strong> This link will expire in 1 hour.</p>
      <p>If you didn't request this password reset, please ignore this email.</p>
      <br>
      <p>Thank you,<br>E-commerce Team</p>
    `;

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Request - E-commerce',
      html: message
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      message: 'Password reset email sent successfully',
      success: true
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ 
      message: 'Error sending password reset email', 
      error: error.message 
    });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Hash token to compare with database
    const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ 
        message: 'Invalid or expired reset token' 
      });
    }

    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    // Send confirmation email
    const message = `
      <h1>Password Reset Successful</h1>
      <p>Hello ${user.name},</p>
      <p>Your password has been successfully reset.</p>
      <p>You can now login with your new password.</p>
      <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/login" style="background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Login Now</a>
      <br><br>
      <p>If you didn't reset your password, please contact us immediately.</p>
      <p>Thank you,<br>E-commerce Team</p>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Successful - E-commerce',
      html: message
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      message: 'Password reset successful',
      success: true
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ 
      message: 'Error resetting password', 
      error: error.message 
    });
  }
};
