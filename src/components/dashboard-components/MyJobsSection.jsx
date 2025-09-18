import React from "react";
import JobsForm from "./JobsForm";
import '../../pages/dashboard/index.css'

function MyJobsSection({ 
  availableUsers, 
  userId, 
  handleAddAvailableUser, 
  handleRemoveAvailableUser, 
  isUserBusyFromBackend 
}) {
  const availableUserId =
    availableUsers.drivers.find((u) => u.client_id?._id === userId)?._id ||
    availableUsers.offsiders.find((u) => u.client_id?._id === userId)?._id;

  const userRole = availableUsers.drivers.some((u) => u.client_id?._id === userId)
    ? "driver"
    : availableUsers.offsiders.some((u) => u.client_id?._id === userId)
    ? "offsider"
    : null;

  return (
    <div className="form-section">
      <h2>Register Available Users</h2>
      <JobsForm
        addUser={handleAddAvailableUser}
        isUserBusyFromBackend={isUserBusyFromBackend}
        removeUser={handleRemoveAvailableUser}
        availableUserId={availableUserId}
        userRole={userRole}
      />
    </div>
  );
}

export default MyJobsSection;
