import React, { useState } from "react";
import "../../pages/dashboard/index.css";

const JobsForm = ({
  addUser,
  isUserBusyFromBackend,
  removeUser,
  availableUserId,
  userRole,
}) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("driver");
  const [rate, setRate] = useState("");
  const [days, setDays] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  const handleChangeDay = (e) =>
    setDays({ ...days, [e.target.name]: e.target.checked });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUserBusyFromBackend)
      return alert("You must mark yourself as Busy before adding another.");

    const availableDays = Object.keys(days).filter((day) => days[day]);

    if (!name.trim()) return alert("Preencha o nome do usuário");
    if (!rate || isNaN(rate) || Number(rate) <= 0)
      return alert("Informe um rate válido maior que 0");

    const newUser = {
      name: name.trim(),
      role,
      rate: Number(rate),
      availableDays,
    };

    try {
      await addUser(newUser);

      // Reset form visual
      setName("");
      setRole("driver");
      setRate("");
      setDays({
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,
      });
    } catch (err) {
      console.error("Error adding available user:", err);
      alert(
        "Erro ao adicionar usuário disponível. Verifique os campos e tente novamente."
      );
    }
  };

  const handleRemove = async () => {
    if (window.confirm("Are you sure you want to mark yourself as Busy?")) {
      try {
        if (!availableUserId) return alert("Register deleted successfuly");
        await removeUser(availableUserId, userRole); // Remove do backend
      } catch (err) {
        console.error("Error marking as Busy:", err);
        alert("Erro ao marcar como Busy.");
      }
    }
  };

  return (
    <div>
      <form className="jobs-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isUserBusyFromBackend}
          style={{
            backgroundColor: isUserBusyFromBackend ? "#ddd" : "white",
            cursor: isUserBusyFromBackend ? "not-allowed" : "text",
          }}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          disabled={isUserBusyFromBackend}
          style={{
            backgroundColor: isUserBusyFromBackend ? "#ddd" : "white",
            cursor: isUserBusyFromBackend ? "not-allowed" : "pointer",
          }}
        >
          <option value="driver">Driver</option>
          <option value="offsider">Offsider</option>
        </select>

        <input
          type="number"
          placeholder="Minimum Rate ($/h)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          min="0"
          step="0.01"
          required
          disabled={isUserBusyFromBackend}
          style={{
            backgroundColor: isUserBusyFromBackend ? "#ddd" : "white",
            cursor: isUserBusyFromBackend ? "not-allowed" : "text",
          }}
        />

        <div className="days-checkbox">
          {Object.keys(days).map((day) => (
            <label key={day}>
              <input
                type="checkbox"
                name={day}
                checked={days[day]}
                onChange={handleChangeDay}
                disabled={isUserBusyFromBackend}
              />
              {day}
            </label>
          ))}
        </div>

        <button
          type="submit"
          disabled={isUserBusyFromBackend}
          style={{
            backgroundColor: isUserBusyFromBackend ? "#888" : "#4CAF50",
            color: "white",
            cursor: isUserBusyFromBackend ? "not-allowed" : "pointer",
          }}
        >
          Add User
        </button>

        {isUserBusyFromBackend && (
          <button
            type="button"
            className="delete-btn"
            style={{
              backgroundColor: "red",
              color: "white",
              marginLeft: "10px",
            }}
            onClick={handleRemove}
          >
            Busy
          </button>
        )}
      </form>
    </div>
  );
};

export default JobsForm;
