import React from "react";
import TasksForm from "./TasksForm";
import '../../pages/dashboard/index.css'

function MyTasksSection({ handleAddTask, loadingUser, loadingAction }) {
  return (
    <div className="form-section">
      <h2>Create New Task</h2>
      <TasksForm
        addTask={handleAddTask}
        loadingUser={loadingUser || loadingAction}
      />
    </div>
  );
}

export default MyTasksSection;
