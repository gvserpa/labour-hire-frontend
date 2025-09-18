import React from "react";
import TaskCard from "./TaskCard";
import AvailableUsers from "./AvailableUsers";
import "../../pages/dashboard/index.css";

function DashboardGrid({
  jobs,
  allTasks,
  rankings,
  availableUsers,
  userId,
  jobsPage,
  allTasksPage,
  driversPage,
  offsidersPage,
  itemsPerPage,
  handleDeleteTask,
  handleAddOffer,
  handleUpdateOfferStatus,
  handleRemoveAvailableUser,
  onOpenOfferModal, 
}) {
  const paginate = (items, currentPage, perPage) =>
    items.slice(
      (currentPage - 1) * perPage,
      (currentPage - 1) * perPage + perPage
    );

  return (
    <div className="dashboard-grid">
      {/* Left Column */}
      <div className="left-column card-column">
        <div className="section-card">
          <h3>Your Tasks</h3>
          <div className="tasks-wrapper">
            {jobs.length === 0 ? (
              <p>No tasks created yet.</p>
            ) : (
              paginate(jobs, jobsPage, itemsPerPage.jobs).map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  userId={userId}
                  onDelete={handleDeleteTask}
                  onOpenOfferModal={onOpenOfferModal} // abre modal
                />
              ))
            )}
          </div>
        </div>

        <div className="section-card">
          <h3>All Tasks</h3>
          <div className="tasks-wrapper">
            {allTasks.length === 0 ? (
              <p>No tasks available.</p>
            ) : (
              paginate(allTasks, allTasksPage, itemsPerPage.allTasks).map(
                (task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    userId={userId}
                    onDelete={handleDeleteTask}
                    onOpenOfferModal={onOpenOfferModal} // abre modal
                  />
                )
              )
            )}
          </div>
        </div>
      </div>

      {/* Middle Column */}
      <div className="middle-column card-column">
        <div className="section-card">
          <h3>Drivers Ranking</h3>
          <div className="tasks-wrapper">
            {rankings.drivers.length === 0 ? (
              <p>No drivers ranking yet.</p>
            ) : (
              rankings.drivers.map((driver, index) => (
                <div key={index} className="ranking-card">
                  {driver.name}
                  <div className="stars">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={`star ${i < driver.stars ? "filled" : ""}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="section-card">
          <h3>Offsiders Ranking</h3>
          <div className="tasks-wrapper">
            {rankings.offsiders.length === 0 ? (
              <p>No offsiders ranking yet.</p>
            ) : (
              rankings.offsiders.map((offsider, index) => (
                <div key={index} className="ranking-card">
                  {offsider.name}
                  <div className="stars">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={`star ${i < offsider.stars ? "filled" : ""}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="right-column card-column">
        <AvailableUsers
          users={availableUsers}
          itemsPerPage={itemsPerPage.users}
          driversPage={driversPage}
          setDriversPage={() => {}}
          offsidersPage={offsidersPage}
          setOffsidersPage={() => {}}
          removeUser={handleRemoveAvailableUser}
        />
      </div>
    </div>
  );
}

export default DashboardGrid;
