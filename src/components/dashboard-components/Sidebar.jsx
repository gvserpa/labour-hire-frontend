import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ userEmail, activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const tabs = ["Dashboard", "My Jobs", "My Tasks", "Rankings"];

  return (
    <aside className="sidebar">
      <div className="logo">LabourHIRE</div>

      <ul className="menu">
        {tabs.map((tab) => (
          <li
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <span className="user-email">{userEmail}</span>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
