import React from "react";
import "../../pages/dashboard/index.css";

function OfferCard({ offer, taskId, userId, onUpdateOfferStatus, onDeleteOffer }) {
  return (
    <div className="offer-card" style={{ minHeight: "80px", marginBottom: "10px" }}>
      <div className="offer-info">
        <span>
          {offer.amount} - {offer.comment}
        </span>

        {offer.userId?._id !== userId && (
          <span className="offer-user">By: {offer.userEmail || "Anonymous"}</span>
        )}
      </div>

      <div className="offer-actions">
        {/* Botão apenas para o dono da task */}
        {offer.taskOwnerId === userId && (
          <>
            <button onClick={() => onUpdateOfferStatus(taskId, offer._id, "accepted")}>
              Accept
            </button>
            <button onClick={() => onUpdateOfferStatus(taskId, offer._id, "rejected")}>
              Reject
            </button>
          </>
        )}

        {/* Botão para quem fez a oferta */}
        {offer.userId?._id === userId && (
          <button onClick={() => onDeleteOffer(taskId, offer._id)}>Delete</button>
        )}
      </div>
    </div>
  );
}

export default OfferCard;
