import React from "react";
import "../../pages/dashboard/index.css";

const AvailableUsers = ({
  users,
  itemsPerPage = 3,
  driversPage,
  setDriversPage,
  offsidersPage,
  setOffsidersPage,
  removeUser, // função do Dashboard
}) => {
  const paginate = (items, currentPage) => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  };

  const totalPages = (items) => Math.ceil(items.length / itemsPerPage);

  const renderUserCard = (user, index) => (
    <div key={user._id || `${user.name}-${user.role}-${index}`} className="available-user-card">
      <div className="task-info">
        <h4>{user.name}</h4>
        <p>Role: {user.role}</p>
        <p>Rate: ${user.rate.toFixed(2)}/h</p>
        <p>Available Days: {user.availableDays.join(", ")}</p>
      </div>
    </div>
  );

  return (
    <section className="available-users">
      <h2>Users Looking for Work Tomorrow</h2>

      {/* Drivers */}
      <div className="section-card">
        <h3>Drivers</h3>
        <div className="tasks-wrapper">
          {users.drivers.length === 0
            ? <p>No drivers available.</p>
            : paginate(users.drivers, driversPage).map(renderUserCard)}
        </div>
        {users.drivers.length > itemsPerPage && (
          <div className="pagination">
            {Array.from({ length: totalPages(users.drivers) }, (_, i) => (
              <button
                key={i}
                className={driversPage === i + 1 ? "active" : ""}
                onClick={() => setDriversPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Offsiders */}
      <div className="section-card">
        <h3>Offsiders</h3>
        <div className="tasks-wrapper">
          {users.offsiders.length === 0
            ? <p>No offsiders available.</p>
            : paginate(users.offsiders, offsidersPage).map(renderUserCard)}
        </div>
        {users.offsiders.length > itemsPerPage && (
          <div className="pagination">
            {Array.from({ length: totalPages(users.offsiders) }, (_, i) => (
              <button
                key={i}
                className={offsidersPage === i + 1 ? "active" : ""}
                onClick={() => setOffsidersPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AvailableUsers;
