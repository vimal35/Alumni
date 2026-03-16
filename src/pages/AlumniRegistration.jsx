import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveAlumniRecord, findAlumniByEmail } from "../utils/localStorage";
import "./AlumniRegistration.css";

const AlumniRegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    profilePhoto: "",
    gender: "",
    dob: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    country: "",
    bio: "",
    course: "",
    degree: "",
    batchYear: "",
    studentId: "",
    college: "",
    isWorking: false,
    companyName: "",
    jobTitle: "",
    industry: "",
    workExperience: "",
    workLocation: "",
    linkedin: "",
    workMobile: "",
    password: "",
    confirmPassword: ""
  });

  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const colleges = [
    "Indian Institute of Science (IISc)",
    "National Institute of Architecture (NIOA)",
    "Visvesvaraya National Institute of Technology (VNIT)",
    "Christ University",
    "BMS College of Engineering",
    "RV College of Engineering",
    "Sri Ramakrishna Engineering College",
    "Mekelle University - Bengaluru Campus",
    "Bennett University",
    "PES University"
  ];

  const courses = [
    "Computer Science",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Business Administration (MBA)",
    "Design",
    "Law"
  ];

  const genders = ["Male", "Female", "Other"];

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePhoto" && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilePhoto: reader.result }));
      };
      reader.readAsDataURL(files[0]);
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleStatusChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      isWorking: e.target.value === "working"
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Valid 10-digit phone number is required";
    }
    if (!formData.course) newErrors.course = "Department / course is required";
    if (!formData.degree.trim()) newErrors.degree = "Degree is required";
    if (!formData.batchYear.trim()) newErrors.batchYear = "Batch / graduation year is required";
    if (!formData.college) newErrors.college = "College / university name is required";
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.isWorking) {
      if (!formData.companyName.trim()) {
        newErrors.companyName = "Current company is required";
      }
      if (!formData.jobTitle.trim()) {
        newErrors.jobTitle = "Job title is required";
      }
      if (!formData.workLocation.trim()) {
        newErrors.workLocation = "Work location is required";
      }
      if (formData.workMobile && !/^\d{10}$/.test(formData.workMobile)) {
        newErrors.workMobile = "Valid 10-digit work phone is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const existingUser = findAlumniByEmail(formData.email);

      if (existingUser) {
        setErrors({ email: "This email is already registered" });
        setIsLoading(false);
        return;
      }

      const newRecord = {
        id: Date.now(),
        ...formData,
        status: "Under Verification",
        createdAt: new Date().toISOString()
      };

      saveAlumniRecord(newRecord);

      setShowPopup(true);
      setIsLoading(false);

      setTimeout(() => {
        setShowPopup(false);
        navigate("/login");
      }, 2200);
    } catch (error) {
      console.error("Registration error:", error);
      setIsLoading(false);
      setErrors({ form: "Registration failed. Please try again." });
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-shell">
        <div className="registration-hero">
          <div className="registration-badge">Alumni Network Registration</div>
          <h1>Build Your Professional Alumni Profile</h1>
          <p>
            Create a complete alumni account with personal, academic, professional,
            and account details in one modern experience.
          </p>

          <div className="registration-highlights">
            <div className="highlight-card">
              <h4>Verified Alumni Identity</h4>
              <p>Keep your academic and career details organized and trusted.</p>
            </div>
            <div className="highlight-card">
              <h4>Professional Visibility</h4>
              <p>Showcase your education, company, role, and achievements.</p>
            </div>
            <div className="highlight-card">
              <h4>Mobile Friendly</h4>
              <p>Complete and manage your registration smoothly on any device.</p>
            </div>
          </div>
        </div>

        <div className="registration-card">
          <div className="registration-header">
            <h2>Alumni Registration Form</h2>
            <p>Please complete all important details to create your alumni account.</p>
          </div>

          <form onSubmit={handleSubmit} className="registration-form">
            <fieldset className="form-section">
              <legend>1️⃣ Profile Information</legend>

              <div className="grid-two">
                <div className="input-wrapper">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <span className="error-msg">{errors.name}</span>}
                </div>

                <div className="input-wrapper">
                  <label htmlFor="profilePhoto">Profile Photo</label>
                  <input
                    type="file"
                    id="profilePhoto"
                    name="profilePhoto"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid-two">
                <div className="input-wrapper">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select gender</option>
                    {genders.map((gender) => (
                      <option key={gender} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-wrapper">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid-two">
                <div className="input-wrapper">
                  <label htmlFor="email">Email ID</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                  />
                  {errors.email && <span className="error-msg">{errors.email}</span>}
                </div>

                <div className="input-wrapper">
                  <label htmlFor="mobile">Phone Number</label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    maxLength="10"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter 10-digit mobile number"
                  />
                  {errors.mobile && <span className="error-msg">{errors.mobile}</span>}
                </div>
              </div>

              <div className="grid-two">
                <div className="input-wrapper">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Enter your country"
                  />
                </div>
              </div>

              <div className="input-wrapper">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your full address"
                ></textarea>
              </div>

              <div className="input-wrapper">
                <label htmlFor="bio">Bio / Short Introduction</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Write a short professional introduction"
                ></textarea>
              </div>
            </fieldset>

            <fieldset className="form-section">
              <legend>2️⃣ Education Details</legend>

              <div className="grid-two">
                <div className="input-wrapper">
                  <label htmlFor="course">Department / Course</label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                  >
                    <option value="">Select course</option>
                    {courses.map((course, index) => (
                      <option key={index} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                  {errors.course && <span className="error-msg">{errors.course}</span>}
                </div>

                <div className="input-wrapper">
                  <label htmlFor="degree">Degree</label>
                  <input
                    type="text"
                    id="degree"
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    placeholder="B.E, B.Tech, MBA, etc."
                  />
                  {errors.degree && <span className="error-msg">{errors.degree}</span>}
                </div>
              </div>

              <div className="grid-two">
                <div className="input-wrapper">
                  <label htmlFor="batchYear">Batch / Graduation Year</label>
                  <input
                    type="text"
                    id="batchYear"
                    name="batchYear"
                    value={formData.batchYear}
                    onChange={handleChange}
                    placeholder="e.g. 2020"
                  />
                  {errors.batchYear && <span className="error-msg">{errors.batchYear}</span>}
                </div>

                <div className="input-wrapper">
                  <label htmlFor="studentId">Student ID / Register Number</label>
                  <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder="Enter student ID"
                  />
                </div>
              </div>

              <div className="input-wrapper">
                <label htmlFor="college">College / University Name</label>
                <select
                  id="college"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                >
                  <option value="">Select your college</option>
                  {colleges.map((college, index) => (
                    <option key={index} value={college}>
                      {college}
                    </option>
                  ))}
                </select>
                {errors.college && <span className="error-msg">{errors.college}</span>}
              </div>
            </fieldset>

            <fieldset className="form-section">
              <legend>3️⃣ Professional Details</legend>

              <div className="status-switcher">
                <label className={`status-pill ${!formData.isWorking ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="status"
                    value="not-working"
                    checked={!formData.isWorking}
                    onChange={handleStatusChange}
                  />
                  <span>Currently Not Working</span>
                </label>

                <label className={`status-pill ${formData.isWorking ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="status"
                    value="working"
                    checked={formData.isWorking}
                    onChange={handleStatusChange}
                  />
                  <span>Currently Working</span>
                </label>
              </div>

              <div className="grid-two">
                <div className="input-wrapper">
                  <label htmlFor="companyName">Current Company</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter current company"
                  />
                  {errors.companyName && <span className="error-msg">{errors.companyName}</span>}
                </div>

                <div className="input-wrapper">
                  <label htmlFor="jobTitle">Job Title / Position</label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="Enter your job title"
                  />
                  {errors.jobTitle && <span className="error-msg">{errors.jobTitle}</span>}
                </div>
              </div>

              <div className="grid-two">
                <div className="input-wrapper">
                  <label htmlFor="industry">Industry / Field</label>
                  <input
                    type="text"
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    placeholder="Technology, Finance, Education..."
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="workExperience">Work Experience</label>
                  <input
                    type="text"
                    id="workExperience"
                    name="workExperience"
                    value={formData.workExperience}
                    onChange={handleChange}
                    placeholder="e.g. 3 Years"
                  />
                </div>
              </div>

              <div className="grid-two">
                <div className="input-wrapper">
                  <label htmlFor="workLocation">Work Location</label>
                  <input
                    type="text"
                    id="workLocation"
                    name="workLocation"
                    value={formData.workLocation}
                    onChange={handleChange}
                    placeholder="City / Country"
                  />
                  {errors.workLocation && <span className="error-msg">{errors.workLocation}</span>}
                </div>

                <div className="input-wrapper">
                  <label htmlFor="linkedin">LinkedIn Profile</label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/your-profile"
                  />
                </div>
              </div>

              <div className="input-wrapper">
                <label htmlFor="workMobile">Official Contact Number</label>
                <input
                  type="tel"
                  id="workMobile"
                  name="workMobile"
                  maxLength="10"
                  value={formData.workMobile}
                  onChange={handleChange}
                  placeholder="Enter official contact number"
                />
                {errors.workMobile && <span className="error-msg">{errors.workMobile}</span>}
              </div>
            </fieldset>

            <fieldset className="form-section">
              <legend>4️⃣ Account Settings</legend>

              <div className="grid-two">
                <div className="input-wrapper">
                  <label htmlFor="password">Change Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 6 characters"
                  />
                  {errors.password && <span className="error-msg">{errors.password}</span>}
                </div>

                <div className="input-wrapper">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter password"
                  />
                  {errors.confirmPassword && (
                    <span className="error-msg">{errors.confirmPassword}</span>
                  )}
                </div>
              </div>
            </fieldset>

            {errors.form && <div className="error-banner">{errors.form}</div>}

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Complete Registration"}
            </button>
          </form>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="success-popup">
            <div className="success-icon">✓</div>
            <h3>Registration Successful</h3>
            <p>Your alumni account has been created successfully. Redirecting to login.</p>
            <button
              onClick={() => {
                setShowPopup(false);
                navigate("/login");
              }}
              className="popup-close-btn"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniRegistration;