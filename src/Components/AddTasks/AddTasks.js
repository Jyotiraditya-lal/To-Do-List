import React from "react";
import AddTaskForm from "./AddTaskForm";
import "./AddTasks.css"; // Import your custom CSS file

const AddTasks = () => {
  return (
    <React.Fragment>
       <h2 className="NewTask">Add New Task</h2>
      <AddTaskForm />
    </React.Fragment>
  );
};

export default AddTasks;
