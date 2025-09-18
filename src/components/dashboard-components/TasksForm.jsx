import React, { useState } from "react";
import "../../pages/dashboard/index.css";

const TasksForm = ({ addTask, loadingUser }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [rate, setRate] = useState("");
  const [hours, setHours] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");
    if (loadingUser) return alert("User not loaded yet.");

    const parsedRate = rate.trim() === "" ? null : Number(rate);
    const parsedHours = hours.trim() === "" ? null : Number(hours);

    const newTask = {
      title: title.trim(),
      description: description.trim() || undefined,
      date: date || undefined,
      time: time || undefined,
      rate_per_hour: Number.isFinite(parsedRate) ? parsedRate : undefined,
      hours: Number.isFinite(parsedHours) ? parsedHours : undefined,
    };

    try {
      await addTask(newTask);
      setTitle("");
      setDescription("");
      setDate("");
      setTime("");
      setRate("");
      setHours("");
      window.location.reload();
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Erro ao criar task. Verifique os campos e tente novamente.");
    }
  };

  if (loadingUser) return <p>Loading user...</p>;

  return (
    <form className="tasks-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="form-row">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <div className="form-row">
        <input
          type="number"
          placeholder="Rate (per hour)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          min="0"
          step="0.01"
          inputMode="decimal"
        />
        <input
          type="number"
          placeholder="Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          min="0"
          step="1"
          inputMode="numeric"
        />
      </div>

      <button type="submit">Add Task</button>
    </form>
  );
};

export default TasksForm;
