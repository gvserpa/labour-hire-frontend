import React, { useState, useEffect } from "react";
import Sidebar from "../../components/dashboard-components/Sidebar";
import DashboardGrid from "../../components/dashboard-components/DashboardGrid";
import MyJobsSection from "../../components/dashboard-components/MyJobsSection";
import MyTasksSection from "../../components/dashboard-components/MyTaskSection";
import OfferModal from "../../components/dashboard-components/OfferModal.jsx"; 
import {
  getLoggedUser,
  createTask,
  getAllTasks,
  deleteTask,
  createAvailableUser,
  getAvailableUsers,
  deleteAvailableUser,
  createOffer,
  updateOfferStatus,
  deleteOffer, // nova função para deletar oferta
} from "../../api/auth";
import "./index.css";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [availableUsers, setAvailableUsers] = useState({ drivers: [], offsiders: [] });
  const [rankings, setRankings] = useState({ drivers: [], offsiders: [] });
  const [isUserBusyFromBackend, setIsUserBusyFromBackend] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  // Pagination
  const [jobsPage, setJobsPage] = useState(1);
  const [allTasksPage, setAllTasksPage] = useState(1);
  const [driversPage, setDriversPage] = useState(1);
  const [offsidersPage, setOffsidersPage] = useState(1);
  const itemsPerPage = { jobs: 900, allTasks: 900, users: 900 };

  // --- Modal Offer ---
  const [offerModalTask, setOfferModalTask] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getLoggedUser();
        if (!user) throw new Error("User not logged in");

        const actualUser = user._id ? user : user.user;
        setUserEmail(actualUser.email);
        setUserId(actualUser._id);

        const tasks = await getAllTasks();
        setAllTasks(tasks);
        setJobs(tasks.filter((task) => task.client_id?._id === actualUser._id));

        const users = await getAvailableUsers();
        setAvailableUsers(users);

        const userAlreadyAdded =
          users.drivers.some((u) => u.client_id?._id === actualUser._id) ||
          users.offsiders.some((u) => u.client_id?._id === actualUser._id);
        setIsUserBusyFromBackend(userAlreadyAdded);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchData();
  }, []);

  const formatRate = (rate) =>
    typeof rate === "number" ? `$${rate.toFixed(2)}/h` : null;

  const paginate = (items, currentPage, perPage) =>
    items.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage);

  // --- Tasks ---
  const handleAddTask = async (taskData) => {
    if (!userId) return alert("User not loaded yet.");
    setLoadingAction(true);

    const payload = { title: taskData.title, client_id: userId };
    if (taskData.description) payload.description = taskData.description;
    if (taskData.date) payload.date = taskData.date;
    if (taskData.time) payload.time = taskData.time;
    if (taskData.rate_per_hour != null) payload.rate_per_hour = Number(taskData.rate_per_hour);
    if (taskData.hours != null) payload.hours = Number(taskData.hours);

    try {
      const newTask = await createTask(payload);
      if (!newTask) throw new Error("Failed to create task");

      setAllTasks((prev) => [...prev, newTask]);
      if (newTask.client_id?._id === userId) setJobs((prev) => [...prev, newTask]);
    } catch (err) {
      console.log("Error creating task:", err);
      alert("Error creating task");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    setLoadingAction(true);
    try {
      await deleteTask(taskId);
      setJobs((prev) => prev.filter((task) => task._id !== taskId));
      setAllTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (err) {
      console.log(err);
      alert("Error deleting task");
    } finally {
      setLoadingAction(false);
    }
  };

  // --- Offers ---
  const handleAddOffer = async (taskId, offerData) => {
    setLoadingAction(true);
    try {
      const newOffer = await createOffer(taskId, offerData);
      if (!newOffer) throw new Error("Failed to create offer");

      setOfferModalTask((prev) =>
        prev && prev._id === taskId
          ? { ...prev, offers: [...(prev.offers || []), newOffer] }
          : prev
      );

      setAllTasks((prev) =>
        prev.map((task) =>
          task._id === taskId
            ? { ...task, offers: [...(task.offers || []), newOffer] }
            : task
        )
      );
    } catch (err) {
      console.error(err);
      alert("Error adding offer");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleUpdateOfferStatus = async (taskId, offerId, status) => {
    setLoadingAction(true);
    try {
      const updatedOffer = await updateOfferStatus(taskId, offerId, status);
      setAllTasks((prev) =>
        prev.map((task) =>
          task._id === taskId
            ? { ...task, offers: task.offers.map((o) => (o._id === offerId ? updatedOffer : o)) }
            : task
        )
      );
    } catch (err) {
      console.error(err);
      alert("Error updating offer status");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDeleteOffer = async (taskId, offerId) => {
    setLoadingAction(true);
    try {
      await deleteOffer(taskId, offerId);

      setAllTasks((prev) =>
        prev.map((task) =>
          task._id === taskId
            ? { ...task, offers: task.offers.filter((o) => o._id !== offerId) }
            : task
        )
      );

      setOfferModalTask((prev) =>
        prev && prev._id === taskId
          ? { ...prev, offers: prev.offers.filter((o) => o._id !== offerId) }
          : prev
      );
    } catch (err) {
      console.error(err);
      alert("Error deleting offer");
    } finally {
      setLoadingAction(false);
    }
  };

  // --- Available Users ---
  const handleAddAvailableUser = async (userData) => {
    if (!userData.role || !userData.rate || !userData.availableDays?.length) {
      alert("All fields (role, rate, available days) are mandatory!");
      return;
    }
    setLoadingAction(true);
    try {
      const newUser = await createAvailableUser({ ...userData, client_id: userId });
      if (!newUser) throw new Error("Failed to create available user");

      if (newUser.role === "driver") {
        setAvailableUsers((prev) => ({ ...prev, drivers: [...prev.drivers, newUser] }));
      } else {
        setAvailableUsers((prev) => ({ ...prev, offsiders: [...prev.offsiders, newUser] }));
      }

      setIsUserBusyFromBackend(true);
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error creating available user");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleRemoveAvailableUser = async (availableUserId, role) => {
    setLoadingAction(true);
    try {
      await deleteAvailableUser(availableUserId);
      if (role === "driver") {
        setAvailableUsers((prev) => ({
          ...prev,
          drivers: prev.drivers.filter((u) => u._id !== availableUserId),
        }));
      } else {
        setAvailableUsers((prev) => ({
          ...prev,
          offsiders: prev.offsiders.filter((u) => u._id !== availableUserId),
        }));
      }

      setIsUserBusyFromBackend(false);
    } catch (err) {
      console.error("Error removing available user:", err);
      alert("Error removing available user");
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar userEmail={userEmail} activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "Dashboard" && (
        <DashboardGrid
          jobs={jobs}
          allTasks={allTasks}
          userId={userId}
          onOpenOfferModal={setOfferModalTask}
          rankings={rankings}
          availableUsers={availableUsers}
          jobsPage={jobsPage}
          allTasksPage={allTasksPage}
          driversPage={driversPage}
          offsidersPage={offsidersPage}
          itemsPerPage={itemsPerPage}
          handleDeleteTask={handleDeleteTask}
          handleAddOffer={handleAddOffer}
          handleUpdateOfferStatus={handleUpdateOfferStatus}
          handleDeleteOffer={handleDeleteOffer} // ✅ NOVO
          handleRemoveAvailableUser={handleRemoveAvailableUser}
        />
      )}

      {activeTab === "My Jobs" && (
        <MyJobsSection
          availableUsers={availableUsers}
          userId={userId}
          handleAddAvailableUser={handleAddAvailableUser}
          handleRemoveAvailableUser={handleRemoveAvailableUser}
          isUserBusyFromBackend={isUserBusyFromBackend}
        />
      )}

      {activeTab === "My Tasks" && (
        <MyTasksSection
          handleAddTask={handleAddTask}
          loadingUser={loadingUser}
          loadingAction={loadingAction}
        />
      )}

      {/* === Modal Offer === */}
      {offerModalTask && (
        <OfferModal
          task={offerModalTask}
          userId={userId}
          onClose={() => setOfferModalTask(null)}
          onSubmit={handleAddOffer}
          onDeleteOffer={handleDeleteOffer} // ✅ para o modal deletar ofertas
        />
      )}
    </div>
  );
}

export default Dashboard;
