// components/PaymentSuccessPage.js
import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./PaymentSuccessPage.css";

const PaymentSuccessPage = () => {
  const location = useLocation();
  const donation = location.state;

  if (!donation) {
    return <div className="error">No donation data found!</div>;
  }

  return (
    <div className="success-page">
      <div className="success-container">
        <div className="success-card">
          <div className="success-animation">
            <div className="checkmark">✓</div>
          </div>
          <h1>Thank You for Your Generous Donation!</h1>
          <p>We truly appreciate your support to the alumni community.</p>

          <div className="details-table">
            <h2>Donation Details</h2>
            <table>
              <tbody>
                <tr>
                  <td>Donor Name</td>
                  <td><strong>{donation.name}</strong></td>
                </tr>
                <tr>
                  <td>Mobile</td>
                  <td><strong>{donation.mobile}</strong></td>
                </tr>
                <tr>
                  <td>Amount Donated</td>
                  <td><strong className="amount">₹{donation.amount.toLocaleString("en-IN")}</strong></td>
                </tr>
                <tr>
                  <td>Transaction ID</td>
                  <td><code>{donation.transactionId}</code></td>
                </tr>
                <tr>
                  <td>Date & Time</td>
                  <td>{new Date(donation.date).toLocaleString("en-IN")}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td><span className="status success">Completed Successfully</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="success-actions">
            <Link to="/" className="btn-home">Back to Home</Link>
            <Link to="/donate" className="btn-donate-again">Donate Again</Link>
          </div>

          <p className="footer-note">
            A confirmation has been sent to your mobile number.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;