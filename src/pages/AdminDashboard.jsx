// components/AdminDashboard.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAllAlumniRecords,
  getPendingAlumni,
  updateAlumniStatus,
  generateAlumniId
} from "../utils/localStorage";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [alumni, setAlumni] = useState([]);
  const [pendingAlumni, setPendingAlumni] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [loadingId, setLoadingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(null);

  useEffect(() => {
    loadAlumniData();
  }, []);

  const loadAlumniData = () => {
    const allRecords = getAllAlumniRecords();
    const pending = getPendingAlumni();
    setAlumni(allRecords);
    setPendingAlumni(pending);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const getFilteredAlumni = () => {
    let filtered = statusFilter === 'pending' ? pendingAlumni : alumni;

    if (searchTerm) {
      filtered = filtered.filter(person =>
        person.name.toLowerCase().includes(searchTerm) ||
        person.email.toLowerCase().includes(searchTerm) ||
        person.mobile.includes(searchTerm) ||
        (person.college && person.college.toLowerCase().includes(searchTerm))
      );
    }

    return filtered;
  };

  const normalizePhoneNumber = (phone) => {
    if (!phone) return "";
    let cleaned = String(phone).replace(/\D/g, "");
    if (cleaned.length === 10) {
      cleaned = `91${cleaned}`;
    }
    return cleaned;
  };

  const getSuccessMessage = (alumni) => {
    return `🎓 *Alumni Registration Approved!*

Dear ${alumni.name},

Congratulations! Your alumni registration has been successfully approved by the administration.

📋 *Your Registration Details:*
• Name: ${alumni.name}
• Alumni ID: ${alumni.alumniId || 'ADLINK-XXXXX'}
• Course: ${alumni.course}
• Batch: ${alumni.batchYear}
• College: ${alumni.college}

Your profile is now active in our alumni network. You can access all alumni benefits and stay connected with your institution.

Welcome to the alumni community!

Best regards,
Alumni Relations Team`;
  };

  const getUnderVerificationMessage = (alumni) => {
    return `🔍 *Alumni Registration Under Verification*

Dear ${alumni.name},

Your alumni registration is currently under verification. We will review your details and update you shortly.

📋 *Your Submission Details:*
• Name: ${alumni.name}
• Course: ${alumni.course}
• Batch: ${alumni.batchYear}
• College: ${alumni.college}

We appreciate your patience. You will receive another notification once the verification is complete.

Best regards,
Alumni Relations Team`;
  };

  const getRejectionMessage = (alumni) => {
    return `❌ *Alumni Registration Update*

Dear ${alumni.name},

After reviewing your application, we regret to inform you that your alumni registration cannot be approved at this time.

📋 *Reason for Rejection:*
[Standard rejection reason - please contact alumni office for details]

If you believe this is an error or would like to appeal this decision, please contact our alumni office at alumni@yourcollege.edu or +91-XXXXXXXXXX.

We appreciate your interest in staying connected with your alma mater.

Best regards,
Alumni Relations Team`;
  };

  const getPaymentLinkMessage = (alumni) => {
    const paymentLink = `https://your-college-portal.com/alumni/payment/${alumni.id}`;
    return `💰 *Alumni Membership Payment*

Dear ${alumni.name},

To activate your full alumni membership benefits, please complete the one-time membership fee payment.

📋 *Payment Details:*
• Alumni ID: ${alumni.alumniId}
• Name: ${alumni.name}
• Course: ${alumni.course}
• Batch: ${alumni.batchYear}

💳 *Payment Link:* ${paymentLink}

After successful payment, your alumni account will be fully activated with all premium features.

For any payment issues, contact: finance@yourcollege.edu

Thank you for supporting your alma mater!

Alumni Relations Team`;
  };

  const sendWhatsAppMessage = (phone, message) => {
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleAction = async (person, actionType) => {
    try {
      setLoadingId(person.id);
      setSuccessMessage("");

      let updatedPerson;
      let message = "";

      switch(actionType) {
        case 'underVerification':
          updatedPerson = updateAlumniStatus(person.id, "Under Verification");
          message = getUnderVerificationMessage(updatedPerson);
          break;
        case 'approve':
          const newAlumniId = generateAlumniId();
          updatedPerson = updateAlumniStatus(person.id, "Approved", {
            alumniId: newAlumniId,
            approvalDate: new Date().toISOString(),
            paymentLinkSent: false
          });
          message = getSuccessMessage(updatedPerson);
          setShowSuccessModal(updatedPerson.name);
          break;
        case 'reject':
          updatedPerson = updateAlumniStatus(person.id, "Rejected");
          message = getRejectionMessage(updatedPerson);
          break;
        case 'sendPaymentLink':
          updatedPerson = updateAlumniStatus(person.id, "Approved", {
            paymentLinkSent: true
          });
          message = getPaymentLinkMessage(updatedPerson);
          break;
        default:
          return;
      }

      // Send WhatsApp message
      const phone = normalizePhoneNumber(updatedPerson.mobile);
      if (phone) {
        sendWhatsAppMessage(phone, message);
      }

      // Refresh data
      setTimeout(() => {
        loadAlumniData();
        if (actionType === 'approve') {
          setShowSuccessModal(null);
        }
      }, 2000);

    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage(`Failed to ${actionType} alumni. Please try again.`);
    } finally {
      setLoadingId(null);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Approved': return 'status-approved';
      case 'Under Verification': return 'status-pending';
      case 'Rejected': return 'status-rejected';
      default: return 'status-default';
    }
  };

  const getStatusBadgeText = (status) => {
    switch(status) {
      case 'Approved': return '✅ Approved';
      case 'Under Verification': return '⏳ Under Verification';
      case 'Rejected': return '❌ Rejected';
      default: return '📝 ' + status;
    }
  };

  const filteredAlumni = getFilteredAlumni();

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>🎓 Alumni Registration Management</h1>
          <p>Manage registrations with verification, approval, and payment processes</p>
        </div>
        <div className="header-actions">
          <Link to="/admin/approved" className="btn btn-secondary">
            ✅ View Approved Alumni →
          </Link>
          <button onClick={loadAlumniData} className="btn btn-outline">
            🔄 Refresh
          </button>
        </div>
      </div>

      <div className="dashboard-controls">
        <div className="search-filter-container">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by name, email, mobile, or college..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
          <div className="filter-box">
            <select
              value={statusFilter}
              onChange={handleStatusFilter}
              className="filter-select"
            >
              <option value="pending">Pending Approval</option>
              <option value="all">All Records</option>
            </select>
          </div>
        </div>
        <div className="stats-container">
          <div className="stat-card">
            <span className="stat-number">{alumni.length}</span>
            <span className="stat-label">Total Registrations</span>
          </div>
          <div className="stat-card pending">
            <span className="stat-number">{pendingAlumni.length}</span>
            <span className="stat-label">Pending Approval</span>
          </div>
          <div className="stat-card approved">
            <span className="stat-number">{alumni.filter(a => a.status === 'Approved').length}</span>
            <span className="stat-label">Approved & Transferred</span>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="success-banner">
          {successMessage}
        </div>
      )}

      {showSuccessModal && (
        <div className="success-toast">
          ✅ Success! {showSuccessModal} has been approved and transferred to Approved Alumni page.
        </div>
      )}

      <div className="table-container">
        <div className="table-wrapper">
          <table className="alumni-table">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Course</th>
                <th>Batch</th>
                <th>College</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlumni.length === 0 ? (
                <tr>
                  <td colSpan="9" className="no-data">
                    {statusFilter === 'pending'
                      ? "No pending approvals. All registrations have been processed."
                      : "No alumni records found."}
                  </td>
                </tr>
              ) : (
                filteredAlumni.map((person) => (
                  <tr key={person.id} className={person.status === 'Approved' ? 'approved-row' : ''}>
                    <td>
                      <div className="avatar">{person.name?.charAt(0)?.toUpperCase()}</div>
                    </td>
                    <td>{person.name}</td>
                    <td>{person.email}</td>
                    <td>{person.mobile}</td>
                    <td>{person.course}</td>
                    <td>{person.batchYear}</td>
                    <td>{person.college}</td>
                    <td>
                      <span className={`status-badge ${getStatusBadgeClass(person.status)}`}>
                        {getStatusBadgeText(person.status)}
                      </span>
                    </td>
                    <td>
  <div className="action-buttons">
    {person.status === 'Approved' ? (
      <>
        {person.paymentLinkSent ? (
          <button className="btn btn-success btn-sm" disabled>
            ✓ Payment Sent
          </button>
        ) : (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleAction(person, 'sendPaymentLink')}
            disabled={loadingId === person.id}
          >
            {loadingId === person.id ? (
              <>
                <span className="spinner"></span>
                Sending...
              </>
            ) : (
              <>💳 Send Payment</>
            )}
          </button>
        )}
        <Link to={`/admin/approved`} className="btn btn-outline btn-sm">
          View
        </Link>
      </>
    ) : (
      <>
        <button
          className="btn btn-verify btn-sm"
          onClick={() => handleAction(person, 'underVerification')}
          disabled={loadingId === person.id}
        >
          {loadingId === person.id ? (
            <>
              <span className="spinner"></span>
              Processing...
            </>
          ) : (
            <>🔍 Verify</>
          )}
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleAction(person, 'approve')}
          disabled={loadingId === person.id}
        >
          {loadingId === person.id ? (
            <>
              <span className="spinner"></span>
              Processing...
            </>
          ) : (
            <>✅ Approve</>
          )}
        </button>
        <button
          className="btn btn-reject btn-sm"
          onClick={() => handleAction(person, 'reject')}
          disabled={loadingId === person.id}
        >
          {loadingId === person.id ? (
            <>
              <span className="spinner"></span>
              Processing...
            </>
          ) : (
            <>❌ Reject</>
          )}
        </button>
      </>
    )}
  </div>
</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;