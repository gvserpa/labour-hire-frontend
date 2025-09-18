import React, { useState, useEffect } from "react";
import OfferCard from "./OfferCard";
import "../../pages/dashboard/index.css";

function OfferModal({ task, userId, onClose, onSubmit, onUpdateOfferStatus }) {
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [offers, setOffers] = useState(task.offers || []);

  // Mantém a lista de ofertas atualizada sempre que a task muda
  useEffect(() => {
    setOffers(task.offers || []);
  }, [task]);

  const handleSubmit = async () => {
    if (!amount) return alert("Please enter an amount");

    try {
      // onSubmit deve retornar a task atualizada
      const updatedTask = await onSubmit(task._id, { amount: Number(amount), comment });

      if (updatedTask?.offers) {
        setOffers(updatedTask.offers); // atualiza lista de ofertas dinamicamente
      }

      setAmount("");
      setComment("");
    } catch (err) {
      console.error("Erro ao enviar oferta:", err);
      alert("Erro ao enviar oferta");
    }
  };

  return (
    <div className="offer-modal-overlay">
      <div className="offer-modal">
        {/* Botão X no canto superior direito */}
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>

        {/* Informações do Task */}
        <div className="task-info-modal">
          <h2>{task.title}</h2>
          {task.description && <p className="task-description">{task.description}</p>}

          <div className="task-meta-group">
            {task.date && <span className="task-meta">📅 {task.date}</span>}
            {task.time && <span className="task-meta">⏰ {task.time}</span>}
            {task.rate_per_hour != null && (
              <span className="task-meta">💲{task.rate_per_hour.toFixed(2)}/h</span>
            )}
            {task.hours != null && <span className="task-meta">⏳ {task.hours}h</span>}
          </div>
        </div>

        {/* Ofertas já enviadas */}
        <div className="offers-wrapper">
          {offers.length > 0 ? (
            offers.map((offer) => (
              <OfferCard
                key={offer._id}
                offer={{
                  ...offer,
                  taskOwnerId: task.client_id?._id,
                  userEmail: offer.userId?.email || "Anonymous",
                }}
                taskId={task._id}
                userId={userId}
                onUpdateOfferStatus={onUpdateOfferStatus}
              />
            ))
          ) : (
            <p className="no-offers">No offers yet.</p>
          )}
        </div>

        {/* Inputs para nova oferta */}
        <div className="offer-inputs">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <textarea
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="submit-offer-btn" onClick={handleSubmit}>
            Send Offer
          </button>
        </div>
      </div>
    </div>
  );
}

export default OfferModal;
