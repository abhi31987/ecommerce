import React, { useState } from "react";
import "./Forgotverification.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import axios from 'axios';

function Forgotverify() {
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to the backend to verify the OTP and update the password
      const response = await axios.post('http://localhost:5555/api/verify-otp-and-update-password', {
        verificationCode,
        newPassword,
        confirmNewPassword,
      });
      
      if (response.status === 200) {
        setMessage('Password reset successful');
        // Redirect to a new page or perform any action upon successful password reset
      } else {
        setMessage('Password reset failed');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('An error occurred during password reset');
    }
  };

  return (
    <div className="fgv-bgcontainer">
      <div className="fgv-cardcontainer">
        <div className="fgvarrow">
          <AiOutlineArrowLeft></AiOutlineArrowLeft>
        </div>
        <h1 className="fgvheadername">Forgot Password</h1>
        <p className="fgvpara">
          We have sent an email to your email account with a verification code!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="fgv-field fgv-input-field">
            <label>Verification code</label>
            <input
              type="number"
              placeholder="Enter verification code"
              className="input"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>
          <div className="fgv-field fgv-input-field">
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="fgv-field fgv-input-field">
            <label>Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="input"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>
          <div className="fgv-field fgv-button-field">
            <button className="button" type="submit">Submit</button>
          </div>
        </form>
        {message && <p className="fgv-message">{message}</p>}
      </div>
    </div>
  );
}

export default Forgotverify;
