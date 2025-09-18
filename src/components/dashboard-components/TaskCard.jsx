import React from "react";
import "../../pages/dashboard/index.css";

function TaskCard({ task, userId, onDelete, onOpenOfferModal }) {
  return (
    <div className="task-card">
      <div className="task-info">
        <h4>{task.title}</h4>
        {task.description && <p>{task.description}</p>}

        {task.status && (
          <span className={`task-status ${task.status}`}>
            {task.status.toUpperCase()}
          </span>
        )}

        <div className="task-meta-group">
          {task.date && <span className="task-meta">📅 {task.date}</span>}
          {task.time && <span className="task-meta">⏰ {task.time}</span>}
          {task.rate_per_hour != null && (
            <span className="task-meta">💲{task.rate_per_hour.toFixed(2)}/h</span>
          )}
          {task.hours != null && <span className="task-meta">⏳ {task.hours}h</span>}
        </div>

        <div className="offers-wrapper">
          {/* Botão Send Offer */}
          {task.client_id?._id !== userId && (
            <button onClick={() => onOpenOfferModal(task)}>Send Offer</button>
          )}
        </div>
      </div>

      <button
        className="delete-btn"
        onClick={() => onDelete(task._id)}
        title="Delete task"
      >
        Delete
      </button>
    </div>
  );
}

export default TaskCard;
