import React from "react";
import "./Members.css";

function Members() {
  const members = [
    {
      name: "Arun Kumar",
      role: "CEO - TechNova Solutions",
      img: ""
    },
    {
      name: "Priya Sharma",
      role: "Senior Data Scientist - Infosys",
      img: ""
    },
    {
      name: "Rahul Mehta",
      role: "Founder - StartEdge",
      img: ""
    },
    {
      name: "Sneha Iyer",
      role: "HR Director - TCS",
      img: ""
    }
  ];

  return (
    <div className="members-page">
      <h1>Distinguished Alumni Members</h1>

      <div className="members-grid">
        {members.map((m, index) => (
          <div className="member-card" key={index}>
            <img src={m.img} alt={m.name} />
            <h3>{m.name}</h3>
            <p>{m.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Members;