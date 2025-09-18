import React from "react";
import "../../pages/dashboard/index.css";

const Rankings = ({ drivers = [], offsiders = [] }) => {
  const renderRanking = (users) => {
    if (!users || users.length === 0) {
      return <p>No users in this ranking.</p>;
    }

    return users.map((user) => (
      <div key={user.id} className="ranking-card">
        <h3>{user.name}</h3>
        <div className="stars">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < (user.score || 0) ? "star filled" : "star"}>
              ★
            </span>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <section className="rankings-section">
      <h2>Drivers Ranking</h2>
      {renderRanking(drivers)}

      <h2>Offsiders Ranking</h2>
      {renderRanking(offsiders)}
    </section>
  );
};

export default Rankings;
