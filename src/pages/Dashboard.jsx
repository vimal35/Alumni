import React, { useState } from "react";
import "./Dashboard.css";

const Dashboard = ({ user }) => {

  const [activeTab, setActiveTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);

  const [profile, setProfile] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const saveProfile = () => {

    localStorage.setItem("loggedInUser", JSON.stringify(profile));

    const alumni = JSON.parse(localStorage.getItem("alumniRecords")) || [];

    const updated = alumni.map((item) =>
      item.id === profile.id ? profile : item
    );

    localStorage.setItem("alumniRecords", JSON.stringify(updated));

    setEditMode(false);

    alert("Profile Updated Successfully");
  };

  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="sidebar-profile">
          <div className="avatar">
            {profile.name?.charAt(0)}
          </div>

          <h3>{profile.name}</h3>
          <p>{profile.email}</p>
        </div>

        <nav className="sidebar-menu">

          <button onClick={() => setActiveTab("overview")}>
            Dashboard
          </button>

          <button onClick={() => setActiveTab("profile")}>
            Personal Info
          </button>

          <button onClick={() => setActiveTab("education")}>
            Education
          </button>

          <button onClick={() => setActiveTab("professional")}>
            Professional
          </button>

          <button onClick={() => setActiveTab("settings")}>
            Settings
          </button>

        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-content">

        {/* DASHBOARD */}
        {activeTab === "overview" && (

          <div className="dashboard-cards">

            <div className="card">
              <h3>👤 Profile</h3>
              <p>{profile.name}</p>
              <p>{profile.mobile}</p>
            </div>

            <div className="card">
              <h3>🎓 Education</h3>
              <p>{profile.course}</p>
              <p>{profile.college}</p>
            </div>

            <div className="card">
              <h3>💼 Career</h3>

              {profile.isWorking ? (
                <>
                  <p>{profile.companyName}</p>
                  <p>{profile.jobTitle}</p>
                </>
              ) : (
                <p>Currently Not Working</p>
              )}
            </div>

          </div>
        )}

        {/* PERSONAL */}
        {activeTab === "profile" && (

          <div className="form-section">

            <div className="section-header">
              <h2>Personal Information</h2>

              <button
                onClick={() => setEditMode(!editMode)}
                className="edit-btn"
              >
                {editMode ? "Cancel" : "Edit"}
              </button>
            </div>

            <div className="form-grid">

              <input
                name="name"
                value={profile.name}
                disabled={!editMode}
                onChange={handleChange}
              />

              <input
                name="mobile"
                value={profile.mobile}
                disabled={!editMode}
                onChange={handleChange}
              />

              <input
                name="city"
                value={profile.city}
                disabled={!editMode}
                onChange={handleChange}
              />

              <input
                name="country"
                value={profile.country}
                disabled={!editMode}
                onChange={handleChange}
              />

              <textarea
                name="address"
                value={profile.address}
                disabled={!editMode}
                onChange={handleChange}
              />

            </div>

            {editMode && (
              <button className="save-btn" onClick={saveProfile}>
                Save Changes
              </button>
            )}

          </div>
        )}

        {/* EDUCATION */}
        {activeTab === "education" && (

          <div className="form-section">

            <div className="section-header">
              <h2>Education Details</h2>

              <button
                onClick={() => setEditMode(!editMode)}
                className="edit-btn"
              >
                {editMode ? "Cancel" : "Edit"}
              </button>
            </div>

            <div className="form-grid">

              <input
                name="course"
                value={profile.course}
                disabled={!editMode}
                onChange={handleChange}
              />

              <input
                name="degree"
                value={profile.degree}
                disabled={!editMode}
                onChange={handleChange}
              />

              <input
                name="batchYear"
                value={profile.batchYear}
                disabled={!editMode}
                onChange={handleChange}
              />

              <input
                name="college"
                value={profile.college}
                disabled={!editMode}
                onChange={handleChange}
              />

            </div>

            {editMode && (
              <button className="save-btn" onClick={saveProfile}>
                Save Changes
              </button>
            )}

          </div>
        )}

        {/* PROFESSIONAL */}
        {activeTab === "professional" && (

          <div className="form-section">

            <div className="section-header">
              <h2>Professional Details</h2>

              <button
                onClick={() => setEditMode(!editMode)}
                className="edit-btn"
              >
                {editMode ? "Cancel" : "Edit"}
              </button>
            </div>

            <div className="form-grid">

              <input
                name="companyName"
                value={profile.companyName}
                disabled={!editMode}
                onChange={handleChange}
              />

              <input
                name="jobTitle"
                value={profile.jobTitle}
                disabled={!editMode}
                onChange={handleChange}
              />

              <input
                name="industry"
                value={profile.industry}
                disabled={!editMode}
                onChange={handleChange}
              />

              <input
                name="workLocation"
                value={profile.workLocation}
                disabled={!editMode}
                onChange={handleChange}
              />

            </div>

            {editMode && (
              <button className="save-btn" onClick={saveProfile}>
                Save Changes
              </button>
            )}

          </div>
        )}

        {/* SETTINGS */}
        {activeTab === "settings" && (

          <div className="settings-box">

            <h2>Account Settings</h2>

            <button className="danger-btn">
              Change Password
            </button>

            <button
              className="danger-btn"
              onClick={() => {
                localStorage.removeItem("loggedInUser");
                window.location.href = "/login";
              }}
            >
              Logout
            </button>

          </div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;