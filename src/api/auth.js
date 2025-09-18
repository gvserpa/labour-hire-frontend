import axios from "axios";

// Base URL do backend via variável de ambiente (Vite)
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // exemplo: "https://labour-hire-backend.onrender.com/api"
});

// Função para pegar token do localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  return { Authorization: `Bearer ${token}` };
};

// --- AUTHENTICATION ---
export const loginUser = async (email, password) => {
  try {
    const response = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    return null;
  }
};

export const registerUser = async (email, password) => {
  try {
    const response = await API.post("/auth/signup", { email, password });
    return response.data;
  } catch (error) {
    console.error("Signup failed:", error.response?.data || error.message);
    return null;
  }
};

export const getLoggedUser = async () => {
  const headers = getAuthHeader();
  if (!headers) return null;

  try {
    const response = await API.get("/auth/me", { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching logged user:", error.response?.data || error.message);
    return null;
  }
};

// --- TASKS ---
export const createTask = async (task) => {
  const headers = getAuthHeader();
  if (!headers) return null;

  try {
    const response = await API.post("/tasks", task, { headers });
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error.response?.data || error.message);
    return null;
  }
};

export const getAllTasks = async () => {
  const headers = getAuthHeader();
  if (!headers) return [];

  try {
    const response = await API.get("/tasks", { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error.response?.data || error.message);
    return [];
  }
};

export const deleteTask = async (taskId) => {
  const headers = getAuthHeader();
  if (!headers) return null;

  try {
    const response = await API.delete(`/tasks/${taskId}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error.response?.data || error.message);
    return null;
  }
};

// --- AVAILABLE USERS ---
export const createAvailableUser = async (user) => {
  const headers = getAuthHeader();
  if (!headers) return null;

  try {
    const response = await API.post("/available-users", user, { headers });
    return response.data;
  } catch (error) {
    console.error("Error creating available user:", error.response?.data || error.message);
    return null;
  }
};

export const getAvailableUsers = async () => {
  const headers = getAuthHeader();
  if (!headers) return { drivers: [], offsiders: [] };

  try {
    const response = await API.get("/available-users", { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching available users:", error.response?.data || error.message);
    return { drivers: [], offsiders: [] };
  }
};

export const deleteAvailableUser = async (userId) => {
  const headers = getAuthHeader();
  if (!headers) throw new Error("Token not found");

  try {
    const response = await API.delete(`/available-users/${userId}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error deleting available user:", error.response?.data || error.message);
    throw error;
  }
};

// --- GENERIC PROTECTED DATA ---
export const getProtectedData = async (route) => {
  const headers = getAuthHeader();
  if (!headers) return null;

  try {
    const response = await API.get(`/${route}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching protected data:", error.response?.data || error.message);
    return null;
  }
};

// --- OFFERS ---
export const postOffer = async (taskId, offerData) => {
  const headers = getAuthHeader();
  if (!headers) return null;

  try {
    const response = await API.post(`/tasks/${taskId}/offers`, offerData, { headers });
    return response.data;
  } catch (error) {
    console.error("Error posting offer:", error.response?.data || error.message);
    return null;
  }
};

export const acceptOffer = async (taskId, offerId) => {
  const headers = getAuthHeader();
  if (!headers) return null;

  try {
    const response = await API.post(`/tasks/${taskId}/offers/${offerId}/accept`, {}, { headers });
    return response.data;
  } catch (error) {
    console.error("Error accepting offer:", error.response?.data || error.message);
    return null;
  }
};

export const createOffer = async (taskId, offerData) => {
  const headers = getAuthHeader();
  if (!headers) throw new Error("Token not found");

  try {
    const response = await API.post(`/tasks/${taskId}/offer`, offerData, { headers });
    return response.data;
  } catch (err) {
    console.error("Error creating offer:", err.response?.data || err.message);
    throw err;
  }
};

export const updateOfferStatus = async (taskId, offerId, status) => {
  const headers = getAuthHeader();
  if (!headers) throw new Error("Token not found");

  const endpoint =
    status === "accepted"
      ? `/tasks/${taskId}/offer/accept`
      : `/tasks/${taskId}/offer/reject`;

  try {
    const response = await API.post(endpoint, { offerId }, { headers });
    return response.data;
  } catch (err) {
    console.error("Error updating offer status:", err.response?.data || err.message);
    throw err;
  }
};

export const deleteOffer = async (taskId, offerId) => {
  const headers = getAuthHeader();
  if (!headers) throw new Error("Token not found");

  try {
    const response = await API.delete(`/tasks/${taskId}/offers/${offerId}`, { headers });
    return response.data;
  } catch (err) {
    console.error("Error deleting offer:", err.response?.data || err.message);
    throw err;
  }
};
