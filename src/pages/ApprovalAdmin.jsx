// components/ApprovalAdmin.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  getPendingAlumni, 
  updateAlumniStatus, 
  generateAlumniId,
  rejectAlumniApplication
} from "../utils/localStorage";
import "./ApprovalAdmin.css";

const ApprovalAdmin = () => {
  const [applications, setApplications] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = () => {
    let records = getPendingAlumni();

    // Sort newest application first always
    records.sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt || 0);
      const dateB = new Date(b.updatedAt || b.createdAt || 0);
      return dateB - dateA;
    });

    setApplications(records);
  };

  const normalizePhoneNumber = (phone) => {
    if (!phone) return "";
    let cleaned = String(phone).replace(/\D/g, "");
    if (cleaned.length === 10) cleaned = `91${cleaned}`;
    return cleaned;
  };

  // ==============================
  // Professional Message Templates
  // Edit all content here easily
  // ==============================
  const messageTemplates = {
    verification: (applicant) => `
Alumni Application Update

Dear ${applicant.name},

Thank you for registering for our official alumni association.
This is to confirm that we have received your application, and it is now under official verification by our team.

Application Reference: ${applicant.id}
Course: ${applicant.course}
Batch: ${applicant.batchYear}

We will notify you immediately once our review is completed.

Regards
Alumni Relations Team
College Name
`.trim(),

    approved: (applicant) => `
✅ Application Approved

Dear ${applicant.name},

Great news! Your alumni membership application has been successfully verified and approved.

We are delighted to welcome you to the alumni community.

Your Permanent Alumni ID: ${applicant.alumniId}
Course: ${applicant.course}
Batch: ${applicant.batchYear}

You will receive a separate message shortly with the membership fee payment link.

Please let us know if you have any questions.

Warm regards
Alumni Relations Team
`.trim(),

    rejected: (applicant) => `
Application Status Update

Dear ${applicant.name},

Thank you very much for applying for alumni membership.

After completing our full verification process, we regret to inform you that we are unable to approve your application at this time.

If you believe this decision was made in error, you may reply directly to this message and we will re-review your case.

Thank you for your understanding.

Regards
Alumni Relations Team
`.trim()
  };

  const handleStatusAction = async (applicant, action) => {
    try {
      setLoadingId(applicant.id);
      setSuccessMessage("");

      const phone = normalizePhoneNumber(applicant.mobile);
      if (!phone) throw new Error("No valid mobile number on record");

      let updatedRecord;
      if(action === "approved") {
        // Auto generate permanent unique Alumni ID automatically on approval
        const alumniId = generateAlumniId();
        updatedRecord = updateAlumniStatus(applicant.id, "Approved", {
          alumniId,
          approvalDate: new Date().toISOString()
        });
      } else if(action === "rejected") {
        updatedRecord = rejectAlumniApplication(applicant.id);
      } else {
        updatedRecord = updateAlumniStatus(applicant.id, "Under Verification");
      }

      // Generate and open WhatsApp pre-populated message
      const message = messageTemplates[action](updatedRecord);
      const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");

      // Refresh list to remove processed application
      loadApplications();

      setSuccessMessage(`✅ ${action} message successfully sent to ${applicant.name}`);
      setTimeout(() => setSuccessMessage("", 5000));

    } catch (error) {
      console.error(error);
      setSuccessMessage(`❌ Error: ${error.message}`);
      setTimeout(() => setSuccessMessage("", 5000));
    } finally {
      setLoadingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const badgeClass = {
      "Pending": "grey",
      "Under Verification": "yellow",
      "Approved": "green",
      "Rejected": "red"
    }[status] || "grey";

    return <span className={`status-badge ${badgeClass}`}>{status}</span>
  };

  return (
    <div className="approval-admin">
      <div className="dashboard-header">
        <div>
          <h1>Pending Applications</h1>
          <p>Review and process new alumni registration requests</p>
        </div>

        <div className="header-actions">
          <Link to="/admin/approved" className="btn btn-outline">
            View Approved Alumni
          </Link>
          <button onClick={loadApplications} className="btn btn-outline">
            🔄 Refresh List
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
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Course</th>
              <th>Batch</th>
              <th>Applied Date</th>
              <th>Current Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan={8} className="no-data">
                  ✅ No pending applications waiting for review
                </td>
              </tr>
            ) : (
              applications.map(person => (
                <tr key={person.id} className={`row-status-${person.status.toLowerCase().replaceAll(" ", "-")}`}>
                  <td><strong>{person.name}</strong></td>
                  <td>{person.email}</td>
                  <td>{person.mobile}</td>
                  <td>{person.course}</td>
                  <td>{person.batchYear}</td>
                  <td>{new Date(person.createdAt).toLocaleDateString("en-GB")}</td>
                  <td>{getStatusBadge(person.status)}</td>
                  <td>
                    <div className="action-button-group">
                      <button
                        className="btn btn-warning btn-xs"
                        onClick={() => handleStatusAction(person, "verification")}
                        disabled={loadingId === person.id}
                      >
                        Under Verification
                      </button>
                      <button
                        className="btn btn-success btn-xs"
                        onClick={() => handleStatusAction(person, "approved")}
                        disabled={loadingId === person.id}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-xs"
                        onClick={() => handleStatusAction(person, "rejected")}
                        disabled={loadingId === person.id}
                      >
                        Reject
                      </button>
                    </div>
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