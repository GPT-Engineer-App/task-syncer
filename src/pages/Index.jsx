import React, { useState } from "react";
import { Box, Button, Flex, Heading, Input, Text, VStack, IconButton, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaFolder, FaTasks } from "react-icons/fa";
import FolderList from "../components/FolderList";
import TaskList from "../components/TaskList";

const Index = () => {
  const [view, setView] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [folders, setFolders] = useState([]);
  const toast = useToast();

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const task = {
        id: Date.now(),
        title: newTask,
        folder: selectedFolder,
        dueDate: dueDate,
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask("");
      setSelectedFolder("");
      setDueDate("");
      toast({
        title: "Task added",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    toast({
      title: "Task deleted",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: true };
      }
      return task;
    });
    setTasks(updatedTasks);
    toast({
      title: "Task completed",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Task Automation</Heading>
      <Flex mb={4} align="center">
        <Button leftIcon={<FaFolder />} onClick={() => setView("folder")} mr={2}>
          Folder View
        </Button>
        <Button leftIcon={<FaTasks />} onClick={() => setView("all")}>
          All Tasks View
        </Button>
      </Flex>
      {view === "folder" ? (
        <FolderList
          folders={folders}
          tasks={tasks}
          setSelectedFolder={setSelectedFolder}
          handleDeleteTask={handleDeleteTask}
          handleTaskCompletion={handleTaskCompletion}
        />
      ) : (
        <>
          <Flex mb={4}>
            <Input placeholder="Enter task" value={newTask} onChange={(e) => setNewTask(e.target.value)} mr={2} />
            <Input placeholder="Select folder" value={selectedFolder} onChange={(e) => setSelectedFolder(e.target.value)} mr={2} />
            <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} mr={2} />
            <Button leftIcon={<FaPlus />} onClick={handleAddTask}>
              Add Task
            </Button>
          </Flex>
          <TaskList tasks={tasks} handleDeleteTask={handleDeleteTask} handleTaskCompletion={handleTaskCompletion} />
        </>
      )}
    </Box>
  );
};

export default Index;
