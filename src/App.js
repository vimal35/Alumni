// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import News from "./pages/News";
import Members from "./pages/Members";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import AlumniRegistration from "./pages/AlumniRegistration";
import AlumniLogin from "./pages/AlumniLogin";
import Dashboard from './pages/Dashboard';
import ApprovalAdmin from './pages/ApprovalAdmin';
import ApprovedAlumni from './pages/ApprovedAlumni';
import PaymentSuccessPage from "./components/PaymentSuccessPage";
import DonatePage from "./components/DonatePage";
import CITAlumni from './pages/CITAlumni';

import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<CITAlumni />} />
        <Route path="/about" element={<About />} />
        <Route path="/news" element={<News />} />
        <Route path="/members" element={<Members />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/alumni-register" element={<AlumniRegistration />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/donation-success" element={<PaymentSuccessPage />} />
        <Route path="/admin/approval" element={<ApprovalAdmin />} />
        <Route path="/admin/approved" element={<ApprovedAlumni />} />
        <Route path="/login" element={<AlumniLogin setUser={setUser} />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;