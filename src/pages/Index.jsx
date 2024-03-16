import React from "react";
import FolderList from "../components/FolderList";

const handleCollaborate = (taskId) => {
  console.log(`Collaborating on task with ID: ${taskId}`);
};

const handleTaskCompletion = (taskId) => {
  console.log(`Completing task with ID: ${taskId}`);
};

const handleEditTask = (task) => {
  console.log(`Editing task with ID: ${task.id}`);
};

const Index = () => {
  const folders = ["Work", "Personal", "Shopping"];
  const tasks = [{ id: 1, folder: "Work", title: "Task 1", completed: false }];

  return <FolderList folders={folders} tasks={tasks} setSelectedFolder={() => {}} handleDeleteTask={() => {}} handleTaskCompletion={handleTaskCompletion} handleCollaborate={handleCollaborate} handleEditTask={handleEditTask} />;
};

export default Index;
