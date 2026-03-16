// components/ApprovalAdmin.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getApprovedAlumni, markPaymentLinkSent } from "../utils/localStorage";
import "./ApprovalAdmin.css";

const ApprovalAdmin = () => {
  const [approvedAlumni, setApprovedAlumni] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    loadApprovedAlumni();
  }, []);

  const loadApprovedAlumni = () => {
    let records = getApprovedAlumni();

    // Sort by approval date
    records.sort((a, b) => {
      const dateA = new Date(a.approvalDate || a.updatedAt || 0);
      const dateB = new Date(b.approvalDate || b.updatedAt || 0);
      return dateA - dateB;
    });

    // Generate Alumni ID starting from ADLINK-00001
    records = records.map((item, index) => {
      return {
        ...item,
        alumniId: `ADLINK-${String(index + 1).padStart(5, "0")}`,
      };
    });

    setApprovedAlumni(records);
  };

  const normalizePhoneNumber = (phone) => {
    if (!phone) return "";
    let cleaned = String(phone).replace(/\D/g, "");
    if (cleaned.length === 10) {
      cleaned = `91${cleaned}`;
    }
    return cleaned;
  };

  const getPaymentLinkMessage = (alumni) => {
    const paymentLink = `https://your-college-portal.com/alumni/payment/${alumni.id}`;

    return `Alumni Membership Payment

Dear ${alumni.name},

Your alumni registration has been approved.

Alumni ID: ${alumni.alumniId}
Course: ${alumni.course}
Batch: ${alumni.batchYear}

Payment Link:
${paymentLink}

Thank you
Alumni Relations Team`;
  };

  const sendPaymentLink = async (alumni) => {
    try {
      setLoadingId(alumni.id);
      setSuccessMessage("");

      const phone = normalizePhoneNumber(alumni.mobile);
      if (!phone) {
        throw new Error("WhatsApp number not available");
      }

      const message = getPaymentLinkMessage(alumni);
      const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
        message
      )}`;

      window.open(whatsappUrl, "_blank");

      const updated = markPaymentLinkSent(alumni.id);

      setApprovedAlumni((prev) =>
        prev.map((a) => (a.id === alumni.id ? updated : a))
      );

      setSuccessMessage(`Payment link sent to ${alumni.name}`);
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (error) {
      console.error(error);
      setSuccessMessage("Failed to send payment link");
      setTimeout(() => setSuccessMessage(""), 4000);
    } finally {
      setLoadingId(null);
    }
  };

  const getPaymentStatusBadge = (alumni) => {
    if (alumni.paymentLinkSent) {
      return <span className="payment-status-badge sent">Payment Sent</span>;
    }

    return <span className="payment-status-badge pending">Pending</span>;
  };

  return (
    <div className="approval-admin">
      <div className="dashboard-header">
        <div>
          <h1>Approved Alumni</h1>
          <p>Approved alumni list and payment link management</p>
        </div>

        <div className="header-actions">
          <Link to="/admin" className="btn btn-secondary">
            Back
          </Link>

          <button onClick={loadApprovedAlumni} className="btn btn-outline">
            Refresh
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="success-banner">{successMessage}</div>
      )}

      <div className="table-container">
        <table className="alumni-table">
          <thead>
            <tr>
              <th>Alumni ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Course</th>
              <th>Batch</th>
              <th>College</th>
              <th>Approval Date</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {approvedAlumni.length === 0 ? (
              <tr>
                <td colSpan="10" className="no-data">
                  No approved alumni found
                </td>
              </tr>
            ) : (
              approvedAlumni.map((person) => (
                <tr key={person.id}>
                  <td>
                    <strong>{person.alumniId}</strong>
                  </td>

                  {/* NAME ONLY (NO AVATAR) */}
                  <td>{person.name}</td>

                  <td>{person.email}</td>
                  <td>{person.mobile}</td>
                  <td>{person.course}</td>
                  <td>{person.batchYear}</td>
                  <td>{person.college}</td>

                  <td>
                    {new Date(
                      person.approvalDate || person.updatedAt
                    ).toLocaleDateString("en-GB")}
                  </td>

                  <td>{getPaymentStatusBadge(person)}</td>

                  <td>
                    {person.paymentLinkSent ? (
                      <button className="btn btn-success btn-sm" disabled>
                        Sent
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => sendPaymentLink(person)}
                        disabled={loadingId === person.id}
                      >
                        {loadingId === person.id
                          ? "Sending..."
                          : "Send Payment"}
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovalAdmin;