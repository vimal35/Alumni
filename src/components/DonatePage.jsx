// components/DonatePage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import { saveDonation } from "../utils/localStorage";
import "./DonatePage.css";

const DonatePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    amount: "",
  });
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);

  const upiId = "yourcollege@upi"; // Replace with actual UPI ID
  const collegeName = "Your College Alumni Association";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Generate QR only when amount is entered
    if (name === "amount" && value && formData.name && formData.mobile) {
      generateQRCode(formData.name, formData.mobile, value);
    }
  };

  const generateQRCode = async (name, mobile, amount) => {
    setLoading(true);
    try {
      const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
        collegeName
      )}&am=${amount}&cu=INR&tn=Donation%20from%20${encodeURIComponent(name)}`;

      const qr = await QRCode.toDataURL(upiLink, {
        width: 300,
        margin: 2,
        color: {
          dark: "#1e293b",
          light: "#ffffff",
        },
      });
      setQrCode(qr);
    } catch (err) {
      console.error("QR generation failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.amount) {
      alert("Please fill all fields");
      return;
    }

    const donation = {
      id: Date.now().toString(),
      name: formData.name,
      mobile: formData.mobile,
      amount: parseFloat(formData.amount),
      date: new Date().toISOString(),
      status: "Pending",
      transactionId: "TXN" + Date.now(),
    };

    saveDonation(donation);
    navigate("/donation-success", { state: donation });
  };

  return (
    <div className="donate-page">
      <div className="donate-container">
        <div className="donate-header">
          <h1>Support Your Alma Mater</h1>
          <p>Your contribution helps build a stronger alumni community</p>
        </div>

        <div className="donate-grid">
          {/* Form Section */}
          <div className="donate-form-card">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="input-group">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="9876543210"
                  pattern="[0-9]{10}"
                  required
                />
              </div>

              <div className="input-group">
                <label>Donation Amount (₹)</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="500"
                  min="100"
                  required
                />
              </div>

              <button type="submit" className="donate-btn">
                Generate QR & Donate Now
              </button>
            </form>

            <div className="quick-amounts">
              <span>Quick Amount:</span>
              {[500, 1000, 2500, 5000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  className="amount-chip"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, amount: amt.toString() })) &&
                    formData.name && formData.mobile && generateQRCode(formData.name, formData.mobile, amt)
                  }
                >
                  ₹{amt}
                </button>
              ))}
            </div>
          </div>

          {/* QR Code Section */}
          <div className="qr-section">
            {loading ? (
              <div className="qr-placeholder loading">
                <div className="spinner"></div>
                <p>Generating Secure QR...</p>
              </div>
            ) : qrCode ? (
              <div className="qr-card">
                <h3>Scan to Pay</h3>
                <img src={qrCode} alt="UPI QR Code" className="qr-image" />
                <div className="qr-info">
                  <p><strong>Amount:</strong> ₹{formData.amount}</p>
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>UPI ID:</strong> {upiId}</p>
                </div>
                <p className="scan-tip">
                  Open any UPI app (Google Pay, PhonePe, Paytm) → Scan → Pay
                </p>
              </div>
            ) : (
              <div className="qr-placeholder">
                <div className="qr-icon">QR Code</div>
                <p>Enter amount to generate QR code</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;